import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Truck,
  MapPin,
  Check,
  Sparkles,
  AlertCircle,
  CreditCard,
  QrCode,
  Copy,
  ExternalLink,
  ShieldCheck,
  User,
  Phone,
  Loader2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SmellGoodBottle } from './SmellGoodBottle';
import { Order, SiteSettings } from '../types';
import { getEffectivePaymentConfig, sanitizeHttpsUrl } from '../config/payment';
import { generatePixPayload } from '../utils/pix';

interface CartDrawerProps {
  whatsappNumber?: string;
  settings?: Partial<SiteSettings>;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  whatsappNumber = '5516990603561',
  settings,
}) => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping,
    isCartOpen,
    setIsCartOpen,
    selectedShipping,
    setSelectedShipping,
  } = useCart();

  // Customer Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsapp, setCustomerWhatsapp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Shipping & CEP State
  const [cepLoading, setCepLoading] = useState(false);

  // Payment Option: 'mercadopago' | 'whatsapp'
  const [paymentOption, setPaymentOption] = useState<'mercadopago' | 'whatsapp'>('mercadopago');

  // Validation & Checkout Payment Modal State
  const [validationError, setValidationError] = useState<string | null>(null);
  const [processingMp, setProcessingMp] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [dynamicMpUrl, setDynamicMpUrl] = useState<string>('');
  const [activeOrderId, setActiveOrderId] = useState<string>('');
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isCartOpen) return null;

  const paymentConfig = getEffectivePaymentConfig(settings);
  const cleanTargetNumber = whatsappNumber.replace(/\D/g, '') || '5516990603561';

  // Mask Phone: (XX) XXXXX-XXXX
  const handlePhoneChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 2) {
      setCustomerWhatsapp(raw ? `(${raw}` : '');
    } else if (raw.length <= 7) {
      setCustomerWhatsapp(`(${raw.slice(0, 2)}) ${raw.slice(2)}`);
    } else {
      setCustomerWhatsapp(`(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`);
    }
  };

  // Mask CEP: XXXXX-XXX and auto fetch address
  const handleCepChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 8);
    const formatted = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw;
    setCep(formatted);
    if (raw.length === 8) {
      fetchAddressByCep(raw);
    }
  };

  const fetchAddressByCep = async (cleanCep: string) => {
    setCepLoading(true);
    try {
      const isSertaozinhoCep =
        cleanCep.startsWith('1416') || cleanCep.startsWith('1417') || cleanCep === '14160000';
      let fetchedCity = isSertaozinhoCep ? 'Sertãozinho' : '';
      let fetchedState = isSertaozinhoCep ? 'SP' : '';

      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (data && !data.erro) {
          if (data.logradouro) setStreet(data.logradouro);
          if (data.bairro) setNeighborhood(data.bairro);
          if (data.localidade) fetchedCity = data.localidade;
          if (data.uf) fetchedState = data.uf;
        }
      } catch {
        // Fallback smooth
      }

      const finalCity = fetchedCity || (isSertaozinhoCep ? 'Sertãozinho' : 'Brasil');
      const finalState = fetchedState || 'SP';
      setCity(finalCity);
      setState(finalState);

      const isSertaozinho =
        isSertaozinhoCep ||
        finalCity.toLowerCase().includes('sertãozinho') ||
        finalCity.toLowerCase().includes('sertaozinho');

      if (isSertaozinho) {
        setSelectedShipping({
          type: 'pickup',
          name: 'Retirada em Sertãozinho/SP',
          price: 0,
          estimatedDays: 0,
          description: 'Retirada gratuita com horário agendado via WhatsApp',
        });
      } else {
        const pacPrice = isFreeShipping ? 0 : 19.9;
        setSelectedShipping({
          type: 'correios_pac',
          name: isFreeShipping ? 'Correios PAC (Frete Grátis)' : 'Correios PAC',
          price: pacPrice,
          estimatedDays: 5,
          description: `Entrega econômica para ${finalCity}/${finalState}`,
        });
      }
    } finally {
      setCepLoading(false);
    }
  };

  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const grandTotal = subtotal + shippingCost;

  // Validate required customer fields
  const validateForm = (): boolean => {
    setValidationError(null);
    if (!customerName.trim()) {
      setValidationError('Por favor, informe seu Nome Completo.');
      return false;
    }
    const cleanPhone = customerWhatsapp.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Por favor, informe seu WhatsApp com DDD (mínimo 10 dígitos).');
      return false;
    }
    if (!street.trim()) {
      setValidationError('Por favor, informe a Rua / Logradouro para entrega.');
      return false;
    }
    if (!number.trim()) {
      setValidationError('Por favor, informe o Número do endereço.');
      return false;
    }
    return true;
  };

  const persistLocalOrder = (orderId: string, method: Order['paymentMethod']) => {
    try {
      const order: Order = {
        id: orderId,
        date: new Date().toISOString(),
        customer: {
          name: customerName.trim(),
          phone: customerWhatsapp.trim(),
          email: customerEmail.trim(),
          cep: cep.trim(),
          street: street.trim(),
          number: number.trim(),
          complement: complement.trim(),
          neighborhood: neighborhood.trim(),
          city: city.trim() || 'Sertãozinho',
          state: state.trim() || 'SP',
        },
        items: [...items],
        shipping: selectedShipping || {
          type: 'pickup',
          name: 'Retirada em Sertãozinho/SP',
          price: 0,
          estimatedDays: 0,
          description: 'Retirada agendada',
        },
        paymentMethod: method,
        subtotal,
        discount: 0,
        shippingCost,
        total: grandTotal,
        status: 'pending',
      };
      const history = JSON.parse(localStorage.getItem('smellgood_orders') || '[]');
      if (Array.isArray(history)) {
        history.unshift(order);
        localStorage.setItem('smellgood_orders', JSON.stringify(history.slice(0, 100)));
      }
    } catch {
      // storage fallback
    }
  };

  // Build structured WhatsApp message
  const generateWhatsappMessage = (orderRef?: string) => {
    let msg = `✨ *NOVO PEDIDO${orderRef ? ` #${orderRef}` : ''} — SMELL GOOD PERFUMARIA*\n\n`;
    msg += `👤 *DADOS DO CLIENTE*\n`;
    msg += `• *Nome:* ${customerName.trim()}\n`;
    msg += `• *WhatsApp:* ${customerWhatsapp.trim()}\n`;
    if (customerEmail.trim()) msg += `• *E-mail:* ${customerEmail.trim()}\n`;
    msg += `• *Endereço:* ${street.trim()}, Nº ${number.trim()}${complement.trim() ? ` (${complement.trim()})` : ''}\n`;
    if (neighborhood.trim()) msg += `• *Bairro:* ${neighborhood.trim()}\n`;
    msg += `• *Cidade/UF:* ${city || 'Sertãozinho'}/${state || 'SP'}${cep ? ` (CEP: ${cep})` : ''}\n\n`;

    msg += `🛍️ *ITENS DO PEDIDO*\n`;
    items.forEach((item, idx) => {
      const itemTitle =
        item.product.titleFormatted ||
        `SMELL GOOD No. ${item.product.numberCode || '01'} - ${(item.product.fictionalName || item.product.name).toUpperCase()}`;
      msg += `*${idx + 1}. ${itemTitle}*\n`;
      msg += `   • Frasco: ${item.size}\n`;
      msg += `   • Quantidade: ${item.quantity}x\n`;
      msg += `   • Valor: R$ ${(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    msg += `---------------------------\n`;
    msg += `*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (selectedShipping) {
      msg += `*Forma de Envio:* ${selectedShipping.name} (${shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`})\n`;
    }
    msg += `*TOTAL A PAGAR:* R$ ${grandTotal.toFixed(2).replace('.', ',')}\n`;
    msg += `*Pagamento:* ${paymentOption === 'mercadopago' ? 'PIX / Cartão (Mercado Pago)' : 'Pagar no WhatsApp'}\n\n`;
    msg += `Segue meu pedido para confirmação e envio. Muito obrigado!`;
    return msg;
  };

  const buildWhatsappHref = (orderRef?: string) => {
    const msg = generateWhatsappMessage(orderRef);
    return `https://wa.me/${cleanTargetNumber}?text=${encodeURIComponent(msg)}`;
  };

  const openSafeExternalLink = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCheckoutWhatsapp = () => {
    if (!validateForm()) return;
    const orderId = `SG-${Date.now().toString().slice(-6)}`;
    persistLocalOrder(orderId, 'whatsapp');
    openSafeExternalLink(buildWhatsappHref(orderId));
  };

  const handleCheckoutMercadoPago = async () => {
    if (!validateForm() || processingMp) return;

    const orderId = `SG-${Date.now().toString().slice(-6)}`;
    setActiveOrderId(orderId);
    persistLocalOrder(orderId, 'mercadopago');
    setProcessingMp(true);
    setDynamicMpUrl('');

    // 1) Tenta criar preferência Checkout Pro no backend (caso rodando com Node.js + MERCADO_PAGO_ACCESS_TOKEN)
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4500);
      const res = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          externalReference: orderId,
          shippingType: selectedShipping?.type || 'pickup',
          customer: {
            name: customerName.trim(),
            phone: customerWhatsapp.trim(),
            email: customerEmail.trim(),
          },
          items: items.map((item) => ({
            id: item.product.id,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      });
      clearTimeout(timer);

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = (await res.json()) as { configured?: boolean; init_point?: string };
        const validInit = sanitizeHttpsUrl(data?.init_point);
        if (data?.configured && validInit) {
          setDynamicMpUrl(validInit);
          setShowPaymentModal(true);
          setProcessingMp(false);
          return;
        }
      }
    } catch {
      // Hospedagem estática (ex: Hostinger) ou backend sem token: segue para Link Configurado + PIX Oficial
    }

    setProcessingMp(false);
    setShowPaymentModal(true);
  };

  // URL final do Mercado Pago (Checkout Pro dinâmico OU Link de Pagamento configurado no Admin/payment.ts)
  const resolvedMercadoPagoUrl = dynamicMpUrl || paymentConfig.checkoutLink;

  // Payload PIX oficial BACEN EMVCo com CRC16-CCITT para o valor exato do pedido
  const pixCopyPasteCode = generatePixPayload({
    pixKey: paymentConfig.pixKey,
    merchantName: paymentConfig.pixReceiverName,
    merchantCity: paymentConfig.pixCity,
    amount: grandTotal,
    txId: activeOrderId || 'SMELLGOOD',
  });

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCopyPasteCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-xs animate-fade-in">
        <div
          className="w-full max-w-lg bg-[#121212] border-l border-[#D4AF37]/30 h-full flex flex-col justify-between shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#141414]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-display text-xl sm:text-2xl text-[#F5F1EB] font-normal tracking-wide">
                Carrinho de Compras
              </h2>
              <span className="text-[11px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
                {totalItems} {totalItems === 1 ? 'item' : 'itens'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#B8AF9E] hover:text-[#F5F1EB] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Bar */}
          <div className="px-4 sm:px-5 py-2.5 bg-[#181611] border-b border-[#D4AF37]/20 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-[#D4AF37] font-medium">
                <Sparkles className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                <span>
                  Parabéns! Você conquistou <strong>Frete Grátis</strong> para todo o Brasil!
                </span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-[#B8AF9E] text-[11px]">
                  <span>
                    Faltam apenas{' '}
                    <strong className="text-[#D4AF37]">
                      R$ {freeShippingRemaining.toFixed(2).replace('.', ',')}
                    </strong>{' '}
                    para frete grátis
                  </span>
                  <span className="font-medium text-[#D4AF37]">
                    {Math.round((subtotal / freeShippingThreshold) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1 bg-[#252525] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F5D884] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#888]/40 mx-auto" />
                <div className="font-display text-xl text-[#F5F1EB]">Seu carrinho está vazio</div>
                <p className="text-xs text-[#B8AF9E] max-w-xs mx-auto font-light leading-relaxed">
                  Explore nosso catálogo e adicione suas fragrâncias autorais de luxo favoritas.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#D4AF37] text-[#0A0A0A] text-xs uppercase tracking-[2px] font-bold rounded-xs cursor-pointer hover:bg-[#E5C464] transition-all"
                >
                  Ver Perfumes
                </button>
              </div>
            ) : (
              <>
                {/* 1. Lista de Itens */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[1.5px] text-[#D4AF37] font-medium">
                    <span>Fragrâncias Selecionadas</span>
                    <button
                      onClick={clearCart}
                      className="text-[10px] text-[#888] hover:text-red-400 lowercase tracking-normal transition-colors cursor-pointer"
                    >
                      limpar sacola
                    </button>
                  </div>

                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-3 p-3 bg-[#171717] border border-[#D4AF37]/20 rounded-xs items-center justify-between"
                    >
                      <div className="w-14 h-16 bg-[#0A0A0A] border border-[#D4AF37]/25 rounded-xs overflow-hidden flex items-center justify-center shrink-0">
                        <SmellGoodBottle
                          name={item.product.name}
                          numberCode={item.product.numberCode}
                          size={item.size}
                          family={item.product.family || item.product.notes?.family}
                          className="w-full h-full scale-105"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] tracking-[1.5px] uppercase font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.2 rounded-xs">
                            {item.size}
                          </span>
                          {item.product.numberCode && (
                            <span className="text-[9px] text-[#B8AF9E] font-medium">
                              REF {item.product.numberCode}
                            </span>
                          )}
                        </div>

                        <h4 className="font-display text-sm sm:text-base text-[#F5F1EB] truncate font-normal">
                          {item.product.titleFormatted ||
                            `SMELL GOOD No. ${item.product.numberCode || '01'} - ${(item.product.fictionalName || item.product.name).toUpperCase()}`}
                        </h4>

                        <div className="font-display text-sm text-[#D4AF37] mt-0.5 font-semibold">
                          R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-[#888] font-normal ml-1 font-sans">
                              (R$ {item.unitPrice.toFixed(2).replace('.', ',')} cada)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center border border-white/10 bg-[#0A0A0A] rounded-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#B8AF9E] hover:text-[#D4AF37] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs text-[#F5F1EB] font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#B8AF9E] hover:text-[#D4AF37] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-[#777] hover:text-red-400 p-0.5 transition-colors cursor-pointer"
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2. Formulário do Cliente */}
                <div className="p-4 bg-[#161616] border border-[#D4AF37]/25 rounded-xs space-y-3.5">
                  <div className="flex items-center gap-2 text-xs text-[#F5F1EB] font-medium uppercase tracking-[1.5px] border-b border-white/10 pb-2">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    <span>Dados para Entrega &amp; Contato</span>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                        Nome Completo <span className="text-[#D4AF37]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
                        <input
                          type="text"
                          placeholder="Seu nome completo"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] pl-9 pr-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                          WhatsApp (com DDD) <span className="text-[#D4AF37]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
                          <input
                            type="tel"
                            placeholder="(16) 99999-9999"
                            value={customerWhatsapp}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] pl-9 pr-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                          E-mail (comprovante)
                        </label>
                        <input
                          type="email"
                          placeholder="seu@email.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                        CEP (para cálculo e entrega)
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
                          <input
                            type="text"
                            placeholder="00000-000"
                            value={cep}
                            onChange={(e) => handleCepChange(e.target.value)}
                            maxLength={9}
                            className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] pl-9 pr-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const clean = cep.replace(/\D/g, '');
                            if (clean.length === 8) fetchAddressByCep(clean);
                          }}
                          disabled={cepLoading}
                          className="px-3.5 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-xs font-semibold rounded-xs transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {cepLoading ? '...' : 'Buscar'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                          Rua / Logradouro <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Nome da sua rua ou avenida"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                          Número <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Nº"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                          Bairro
                        </label>
                        <input
                          type="text"
                          placeholder="Seu bairro"
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                          Complemento
                        </label>
                        <input
                          type="text"
                          placeholder="Apto, Bloco..."
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                          Cidade
                        </label>
                        <input
                          type="text"
                          placeholder="Cidade"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[1px] text-[#B8AF9E] mb-1 font-medium">
                          Estado
                        </label>
                        <input
                          type="text"
                          placeholder="UF"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          maxLength={2}
                          className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-xs text-[#F5F1EB] placeholder-[#666] px-3 py-2 rounded-xs uppercase focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Opções de Frete */}
                <div className="p-4 bg-[#161616] border border-[#D4AF37]/25 rounded-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#F5F1EB] font-medium uppercase tracking-[1px]">
                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Opções de Entrega</span>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      onClick={() =>
                        setSelectedShipping({
                          type: 'pickup',
                          name: 'Retirada em Sertãozinho/SP',
                          price: 0,
                          estimatedDays: 0,
                          description: 'Retirada presencial gratuita em Sertãozinho/SP com horário agendado',
                        })
                      }
                      className={`flex items-center justify-between p-2.5 rounded-xs border text-xs cursor-pointer transition-all ${
                        selectedShipping?.type === 'pickup'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F1EB]'
                          : 'border-white/10 text-[#B8AF9E] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Retirada em Sertãozinho/SP</span>
                      </div>
                      <span className="font-bold text-[#D4AF37]">GRÁTIS</span>
                    </label>

                    <label
                      onClick={() =>
                        setSelectedShipping({
                          type: 'correios_pac',
                          name: isFreeShipping ? 'Correios PAC (Frete Grátis)' : 'Correios PAC',
                          price: isFreeShipping ? 0 : 19.9,
                          estimatedDays: 5,
                          description: 'Envio nacional com código de rastreamento pelos Correios',
                        })
                      }
                      className={`flex items-center justify-between p-2.5 rounded-xs border text-xs cursor-pointer transition-all ${
                        selectedShipping?.type === 'correios_pac'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F1EB]'
                          : 'border-white/10 text-[#B8AF9E] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Correios PAC (Todo o Brasil)</span>
                      </div>
                      <span className="font-bold text-[#D4AF37]">
                        {isFreeShipping ? 'GRÁTIS' : 'R$ 19,90'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* 4. Opções de Pagamento */}
                <div className="p-4 bg-[#161616] border border-[#D4AF37]/25 rounded-xs space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#F5F1EB] font-medium uppercase tracking-[1px] border-b border-white/10 pb-2">
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                      <span>Forma de Pagamento</span>
                    </span>
                    <span className="text-[10px] text-[#D4AF37] font-normal lowercase">escolha uma opção</span>
                  </div>

                  <div className="space-y-2">
                    <label
                      onClick={() => setPaymentOption('mercadopago')}
                      className={`flex items-start gap-3 p-3 rounded-xs border cursor-pointer transition-all ${
                        paymentOption === 'mercadopago'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F1EB] shadow-md'
                          : 'border-white/10 bg-[#0A0A0A] text-[#B8AF9E] hover:border-white/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentOption"
                        checked={paymentOption === 'mercadopago'}
                        onChange={() => setPaymentOption('mercadopago')}
                        className="mt-1 accent-[#D4AF37]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs text-[#F5F1EB] font-medium">
                            Pagar com PIX / Cartão (Mercado Pago)
                          </strong>
                          <span className="text-[9px] bg-[#009EE3]/20 text-[#009EE3] border border-[#009EE3]/40 px-1.5 py-0.5 rounded-xs font-bold uppercase tracking-wider">
                            Mercado Pago
                          </span>
                        </div>
                        <p className="text-[11px] text-[#B8AF9E] mt-0.5 font-light leading-relaxed">
                          Aprovação imediata · Pague via PIX com QR Code oficial ou Cartão de Crédito no Mercado Pago.
                        </p>
                      </div>
                    </label>

                    <label
                      onClick={() => setPaymentOption('whatsapp')}
                      className={`flex items-start gap-3 p-3 rounded-xs border cursor-pointer transition-all ${
                        paymentOption === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-950/30 text-[#F5F1EB] shadow-md'
                          : 'border-white/10 bg-[#0A0A0A] text-[#B8AF9E] hover:border-white/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentOption"
                        checked={paymentOption === 'whatsapp'}
                        onChange={() => setPaymentOption('whatsapp')}
                        className="mt-1 accent-emerald-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs text-[#F5F1EB] font-medium">Pagar no WhatsApp</strong>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded-xs font-bold uppercase tracking-wider">
                            Direto
                          </span>
                        </div>
                        <p className="text-[11px] text-[#B8AF9E] mt-0.5 font-light leading-relaxed">
                          Envie seu pedido formatado diretamente para nosso atendimento no WhatsApp para acertar o pagamento.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {validationError && (
                  <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-xs flex items-center gap-2 text-xs text-red-200">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#D4AF37]/25 bg-[#141414] space-y-3.5 shadow-2xl">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#B8AF9E]">
                  <span>Subtotal ({totalItems} itens):</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[#B8AF9E]">
                  <span>Frete ({selectedShipping?.name || 'Retirada'}):</span>
                  <span>
                    {shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-medium text-[#F5F1EB] pt-2 border-t border-white/10">
                  <span className="font-display text-lg">Total do Pedido:</span>
                  <span className="font-display text-2xl text-[#D4AF37] font-semibold">
                    R$ {grandTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {paymentOption === 'mercadopago' ? (
                <button
                  type="button"
                  disabled={processingMp}
                  onClick={handleCheckoutMercadoPago}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-xs tracking-[2px] uppercase font-bold transition-all rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-98 disabled:opacity-70"
                >
                  {processingMp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Preparando Pagamento...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pagar com PIX / Cartão (Mercado Pago)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCheckoutWhatsapp}
                  className="w-full py-3.5 bg-[#1e3a1e] hover:bg-[#274c27] border border-emerald-500/60 text-emerald-300 text-xs tracking-[2px] uppercase font-bold transition-all rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Finalizar Pedido no WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center justify-center gap-3 text-[10px] text-[#888] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Compra 100% Segura
                </span>
                <span>•</span>
                <span>Envios Rápidos Correios</span>
                <span>•</span>
                <span>Sertãozinho/SP</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Oficial de Pagamento Mercado Pago + PIX Copia e Cola */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div
            className="w-full max-w-md bg-[#141414] border border-[#D4AF37]/50 rounded-sm shadow-2xl overflow-hidden my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-[#181818] border-b border-[#D4AF37]/25 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {resolvedMercadoPagoUrl ? (
                  <CreditCard className="w-5 h-5 text-[#009EE3]" />
                ) : (
                  <QrCode className="w-5 h-5 text-[#D4AF37]" />
                )}
                <div>
                  <h3 className="font-display text-lg text-[#F5F1EB] font-normal tracking-wide leading-none">
                    {resolvedMercadoPagoUrl ? 'Checkout Mercado Pago' : 'Pagamento PIX Instantâneo'}
                  </h3>
                  {activeOrderId && (
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest">
                      Pedido #{activeOrderId}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-[#888] hover:text-[#F5F1EB] p-1 rounded-full cursor-pointer"
                aria-label="Fechar pagamento"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 text-center space-y-4">
              <div>
                <span className="text-xs text-[#B8AF9E] uppercase tracking-wider block font-light">
                  Total a pagar
                </span>
                <span className="font-display text-3xl text-[#D4AF37] font-semibold">
                  R$ {grandTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Botão Principal Mercado Pago (quando Checkout Pro ou Link MP está ativo) */}
              {resolvedMercadoPagoUrl && (
                <div className="p-4 bg-[#009EE3]/10 border border-[#009EE3]/40 rounded-xs space-y-3">
                  <div className="text-xs text-[#F5F1EB] font-medium">
                    Pague com segurança pelo Mercado Pago (Cartão em até 12x, PIX ou Saldo)
                  </div>
                  <a
                    href={resolvedMercadoPagoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#009EE3] hover:bg-[#0089C7] text-white text-xs font-bold uppercase tracking-[1.5px] rounded-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <span>Pagar no Mercado Pago Agora</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-[10px] text-[#B8AF9E]">
                    Ou, se preferir pagar na hora sem sair desta tela, use o QR Code PIX abaixo:
                  </p>
                </div>
              )}

              {/* QR Code PIX Oficial (BR Code BACEN EMVCo) */}
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-sm shadow-xl inline-block">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                      pixCopyPasteCode
                    )}`}
                    alt="QR Code PIX Oficial"
                    className="w-40 h-40 object-contain"
                  />
                </div>
              </div>

              {/* PIX Copia e Cola Oficial */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#B8AF9E]">
                  <span>PIX Copia e Cola (Valor exato já preenchido):</span>
                  <span className="text-[#D4AF37] font-medium">{paymentConfig.pixReceiverName}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#D4AF37]/35 rounded-xs p-2.5 text-xs text-[#F5F1EB] font-mono">
                  <span className="flex-1 truncate select-all text-left">{pixCopyPasteCode}</span>
                  <button
                    type="button"
                    onClick={handleCopyPixCode}
                    className="px-3 py-1 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-[10px] font-bold uppercase tracking-wider rounded-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar PIX</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-[#888]">
                  Chave cadastrada: <span className="text-[#B8AF9E] select-all">{paymentConfig.pixKey}</span>
                </p>
              </div>

              {/* Enviar comprovante e pedido no WhatsApp */}
              <div className="pt-1 space-y-2">
                <a
                  href={buildWhatsappHref(activeOrderId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full py-3 bg-[#1e3a1e] hover:bg-[#274c27] border border-emerald-500/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Enviar Pedido e Comprovante no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
