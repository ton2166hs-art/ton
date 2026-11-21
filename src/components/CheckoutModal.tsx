import React, { useState } from 'react';
import { X, Check, Copy, CreditCard, QrCode, MessageCircle, ShieldCheck, MapPin, Truck, Sparkles, AlertCircle, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { CustomerData, Order } from '../types';
import { getEffectivePaymentConfig } from '../config/payment';
import { generatePixPayload } from '../utils/pix';

interface CheckoutModalProps {
  whatsappNumber?: string;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  whatsappNumber = '5516990603561',
  onOrderSuccess,
}) => {
  const {
    items,
    subtotal,
    selectedShipping,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'whatsapp'>('pix');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'correios_pac' | 'correios_sedex'>('pickup');
  const [loadingCep, setLoadingCep] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Checkout state
  const paymentConfig = getEffectivePaymentConfig();

  if (!isCheckoutOpen) return null;

  const isFreeShipping = subtotal >= 120;
  const shippingCost =
    deliveryType === 'pickup'
      ? 0
      : deliveryType === 'correios_pac'
      ? isFreeShipping
        ? 0
        : 19.9
      : isFreeShipping
      ? 14.9
      : 29.9;
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const grandTotal = Math.max(0, subtotal - pixDiscount + shippingCost);

  const pixKey = generatePixPayload({
    pixKey: paymentConfig.pixKey,
    merchantName: paymentConfig.pixReceiverName,
    merchantCity: paymentConfig.pixCity,
    amount: grandTotal,
    txId: 'SMELLGOOD',
  });

  const handleFetchCep = async (cepValue: string) => {
    const clean = cepValue.replace(/\D/g, '');
    if (clean.length === 8) {
      setLoadingCep(true);
      try {
        const isSertaozinho = clean.startsWith('1416') || clean.startsWith('1417') || clean === '14160000';
        try {
          const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
          const data = await res.json();
          if (data && !data.erro) {
            setStreet((prev) => data.logradouro || prev || '');
            setNeighborhood((prev) => data.bairro || prev || '');
            setCity(data.localidade || (isSertaozinho ? 'Sertãozinho' : ''));
            setState(data.uf || (isSertaozinho ? 'SP' : ''));
            if (data.localidade?.toLowerCase().includes('sertãozinho') || isSertaozinho) {
              setDeliveryType('pickup');
            } else {
              setDeliveryType('correios_pac');
            }
            return;
          }
        } catch {
          // ViaCEP fallback
        }

        // Always accept 8-digit CEP
        if (isSertaozinho) {
          setCity((prev) => prev || 'Sertãozinho');
          setState((prev) => prev || 'SP');
          setDeliveryType('pickup');
        } else {
          setDeliveryType('correios_pac');
        }
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Por favor, informe seu nome completo.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Por favor, informe seu número de WhatsApp.');
      return;
    }

    if (deliveryType !== 'pickup') {
      if (!cep || !street || !number || !city || !state) {
        setFormError('Por favor, preencha todos os campos do endereço de entrega.');
        return;
      }
    }

    setSubmitting(true);

    const customer: CustomerData = {
      name,
      phone,
      email,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city: city || 'Sertãozinho',
      state: state || 'SP',
    };

    const orderId = `SG-${Date.now().toString().slice(-6)}`;
    const shippingName =
      deliveryType === 'pickup'
        ? 'Retirada em Sertãozinho/SP'
        : deliveryType === 'correios_pac'
        ? (isFreeShipping ? 'Correios PAC (Frete Grátis)' : 'Correios PAC')
        : 'Correios SEDEX (Expresso)';

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      customer,
      items: [...items],
      shipping: {
        type: deliveryType === 'pickup' ? 'pickup' : deliveryType === 'correios_pac' ? 'correios_pac' : 'correios_sedex',
        name: shippingName,
        price: shippingCost,
        estimatedDays: deliveryType === 'pickup' ? 0 : deliveryType === 'correios_pac' ? 5 : 2,
        description: deliveryType === 'pickup' ? 'Horário agendado via WhatsApp' : 'Entrega com rastreamento Correios',
      },
      paymentMethod,
      subtotal,
      discount: pixDiscount,
      shippingCost,
      total: grandTotal,
      status: 'confirmed',
    };

    // Save order in localStorage history
    try {
      const history = JSON.parse(localStorage.getItem('smellgood_orders') || '[]');
      history.unshift(newOrder);
      localStorage.setItem('smellgood_orders', JSON.stringify(history));
    } catch {
      // storage fallback
    }

    // Launch celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c9a84c', '#dec17b', '#ffffff', '#8b6c27'],
      });
    } catch {
      // quiet
    }

    // If customer selected WhatsApp checkout, open WhatsApp directly
    if (paymentMethod === 'whatsapp') {
      let msg = `✨ *NOVO PEDIDO #${orderId} — SMELLGOOD*\n\n`;
      msg += `*Cliente:* ${customer.name}\n`;
      msg += `*WhatsApp:* ${customer.phone}\n`;
      if (customer.email) msg += `*E-mail:* ${customer.email}\n`;
      msg += `*Entrega:* ${deliveryType === 'pickup' ? 'Retirada em Sertãozinho/SP' : `Envio para ${customer.street}, ${customer.number} - ${customer.city}/${customer.state} (CEP: ${customer.cep})`}\n\n`;
      msg += `*ITENS DO PEDIDO:*\n`;
      items.forEach((it, i) => {
        msg += `${i + 1}. ${it.product.name} (${it.size}) - ${it.quantity}x = R$ ${(it.unitPrice * it.quantity).toFixed(2)}\n`;
      });
      msg += `\n*Subtotal:* R$ ${subtotal.toFixed(2)}\n`;
      msg += `*Frete:* ${shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`}\n`;
      msg += `*TOTAL A PAGAR:* R$ ${grandTotal.toFixed(2)}\n\n`;
      msg += `Olá! Acabei de fechar este pedido no site. Como posso realizar o pagamento?`;

      const cleanTargetNumber = whatsappNumber.replace(/\D/g, '') || '5516990603561';
      const waUrl = `https://wa.me/${cleanTargetNumber}?text=${encodeURIComponent(msg)}`;
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    clearCart();
    setIsCheckoutOpen(false);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#121212] border border-[#c9a84c]/30 rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#c9a84c]/20 flex items-center justify-between bg-[#141414]">
          <div className="space-y-1">
            <div className="text-[10px] tracking-[2.5px] uppercase text-[#c9a84c] font-medium">
              Checkout Seguro · SmellGood
            </div>
            <h2 className="font-display text-2xl text-[#f4efe6] font-light">Finalizar Compra</h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#9e8f85] hover:text-[#f4efe6] rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {formError && (
            <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/60 rounded-xs text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{formError}</span>
            </div>
          )}

          {/* Step 1: Customer Data */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[2px] text-[#c9a84c] font-semibold border-b border-[#c9a84c]/15 pb-1">
              1. Seus Dados de Contato
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-[#9e8f85] mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-[#9e8f85] mb-1">
                  WhatsApp com DDD *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(16) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] tracking-[1.5px] uppercase text-[#9e8f85] mb-1">
                  E-mail (opcional)
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Option */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[2px] text-[#c9a84c] font-semibold border-b border-[#c9a84c]/15 pb-1">
              2. Forma de Recebimento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                onClick={() => setDeliveryType('pickup')}
                className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryType === 'pickup'
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f4efe6]'
                    : 'border-white/10 text-[#9e8f85] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#f4efe6]">
                    Retirada na Loja
                  </span>
                </div>
                <p className="text-[10px] text-[#9e8f85] font-light">
                  Sertãozinho/SP · Horário agendado
                </p>
                <span className="font-bold text-[#c9a84c] text-xs mt-2">GRÁTIS</span>
              </label>

              <label
                onClick={() => setDeliveryType('correios_pac')}
                className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryType === 'correios_pac'
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f4efe6]'
                    : 'border-white/10 text-[#9e8f85] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#f4efe6]">
                    Correios PAC
                  </span>
                </div>
                <p className="text-[10px] text-[#9e8f85] font-light">
                  Econômico · 4 a 7 dias úteis
                </p>
                <span className="font-bold text-[#c9a84c] text-xs mt-2">
                  {isFreeShipping ? 'FRETE GRÁTIS' : 'R$ 19,90'}
                </span>
              </label>

              <label
                onClick={() => setDeliveryType('correios_sedex')}
                className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryType === 'correios_sedex'
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f4efe6]'
                    : 'border-white/10 text-[#9e8f85] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#c9a84c] fill-current" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#f4efe6]">
                    Correios SEDEX
                  </span>
                </div>
                <p className="text-[10px] text-[#9e8f85] font-light">
                  Expresso · 1 a 3 dias úteis
                </p>
                <span className="font-bold text-[#c9a84c] text-xs mt-2">
                  {isFreeShipping ? 'R$ 14,90' : 'R$ 29,90'}
                </span>
              </label>
            </div>

            {/* Address fields if delivery */}
            {deliveryType !== 'pickup' && (
              <div className="p-4 bg-[#161616] border border-[#c9a84c]/20 rounded-xs space-y-3 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#9e8f85] mb-1">
                      CEP * {loadingCep && <span className="text-[#c9a84c]">(Buscando...)</span>}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="14160-000"
                      value={cep}
                      onChange={(e) => {
                        setCep(e.target.value);
                        handleFetchCep(e.target.value);
                      }}
                      maxLength={9}
                      className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[9px] uppercase tracking-wider text-[#9e8f85] mb-1">
                      Endereço (Rua/Avenida) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome da rua"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#9e8f85] mb-1">
                      Número *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#9e8f85] mb-1">
                      Complemento
                    </label>
                    <input
                      type="text"
                      placeholder="Apto, bloco..."
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#9e8f85] mb-1">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Bairro"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#9e8f85] mb-1">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Cidade"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#9e8f85] mb-1">
                      Estado (UF) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="SP"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      maxLength={2}
                      className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[2px] text-[#c9a84c] font-semibold border-b border-[#c9a84c]/15 pb-1">
              3. Forma de Pagamento
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-3 border rounded-xs text-center transition-all ${
                  paymentMethod === 'pix'
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f4efe6]'
                    : 'border-white/10 text-[#9e8f85] hover:border-white/20'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-[#c9a84c]" />
                <span className="block text-xs font-semibold">PIX</span>
                <span className="block text-[9px] text-emerald-400 font-bold">5% OFF</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 border rounded-xs text-center transition-all ${
                  paymentMethod === 'credit_card'
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f4efe6]'
                    : 'border-white/10 text-[#9e8f85] hover:border-white/20'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#c9a84c]" />
                <span className="block text-xs font-semibold">Cartão</span>
                <span className="block text-[9px] text-[#9e8f85]">Até 12x</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-3 border rounded-xs text-center transition-all ${
                  paymentMethod === 'whatsapp'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-white/10 text-[#9e8f85] hover:border-white/20'
                }`}
              >
                <MessageCircle className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span className="block text-xs font-semibold">WhatsApp</span>
                <span className="block text-[9px] text-[#9e8f85]">Atendimento</span>
              </button>
            </div>

            {/* PIX Details */}
            {paymentMethod === 'pix' && (
              <div className="p-4 bg-[#161616] border border-[#c9a84c]/30 rounded-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#f4efe6] font-medium">Chave PIX (Copia e Cola):</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    Desconto de 5% Aplicado
                  </span>
                </div>

                <div className="p-2.5 bg-[#0a0a0a] border border-white/10 rounded-xs flex items-center justify-between text-[11px] text-[#9e8f85] font-mono break-all gap-2">
                  <span className="truncate">{pixKey}</span>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="p-1.5 bg-[#c9a84c] text-[#0a0a0a] rounded-xs shrink-0 font-sans font-bold text-[10px] flex items-center gap-1 hover:bg-[#dec17b]"
                  >
                    {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPix ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-[#9e8f85] font-light">
                  Após o pagamento, a aprovação é imediata e seu pedido entra em separação.
                </p>
              </div>
            )}

            {/* Mercado Pago Checkout Redirect */}
            {paymentMethod === 'credit_card' && (
              <div className="p-4 bg-[#161616] border border-[#009EE3]/30 rounded-xs space-y-2 text-xs text-[#f4efe6]">
                <p className="font-semibold text-[#009EE3]">Checkout Seguro via Mercado Pago:</p>
                <p className="text-[11px] text-[#9e8f85] leading-relaxed">
                  Seus dados de cartão são inseridos diretamente no ambiente criptografado do Mercado Pago após confirmar o pedido.
                </p>
              </div>
            )}

            {/* WhatsApp method note */}
            {paymentMethod === 'whatsapp' && (
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xs text-xs text-emerald-300 space-y-1">
                <p className="font-semibold">Atendimento personalizado via WhatsApp:</p>
                <p className="text-[11px] text-emerald-400/80">
                  Ao clicar em confirmar, o WhatsApp abrirá com seu pedido formatado diretamente para nosso atendente no número <strong>(16) 99060-3561</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Order Summary & Final Total */}
          <div className="p-4 bg-[#141414] border border-[#c9a84c]/20 rounded-xs space-y-2 text-xs">
            <div className="flex justify-between text-[#9e8f85]">
              <span>Subtotal ({items.length} itens):</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {pixDiscount > 0 && (
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Desconto PIX (5%):</span>
                <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            <div className="flex justify-between text-[#9e8f85]">
              <span>Entrega ({deliveryType === 'pickup' ? 'Retirada' : deliveryType === 'correios_pac' ? 'Correios PAC' : 'Correios SEDEX'}):</span>
              <span>{shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-[#f4efe6] pt-2 border-t border-white/10">
              <span className="font-display text-lg">Total Final:</span>
              <span className="font-display text-2xl text-[#c9a84c]">
                R$ {grandTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#c9a84c] hover:bg-[#dec17b] text-[#0a0a0a] text-xs tracking-[3px] uppercase font-bold transition-all rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{submitting ? 'Processando...' : 'Confirmar e Finalizar Pedido'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
