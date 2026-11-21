import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  MessageCircle,
  Settings,
  Check,
  CreditCard,
  AlertCircle,
  Copy,
  ShieldCheck,
} from 'lucide-react';
import { Order, Product, SiteSettings } from '../types';
import { sanitizeHttpsUrl } from '../config/payment';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onAddProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'payments' | 'settings' | 'orders' | 'newProduct'>('payments');
  const [whatsapp, setWhatsapp] = useState(settings.adminWhatsapp);
  const [banner, setBanner] = useState(settings.bannerText);
  const [freeShipping, setFreeShipping] = useState(settings.freeShippingThreshold);
  const [mercadoPagoLink, setMercadoPagoLink] = useState(settings.mercadoPagoLink || '');
  const [pixKey, setPixKey] = useState(settings.pixKey || '+5516990603561');
  const [pixReceiverName, setPixReceiverName] = useState(
    settings.pixReceiverName || 'SMELL GOOD PERFUMARIA'
  );
  const [pixCity, setPixCity] = useState(settings.pixCity || 'SERTAOZINHO');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New product fields
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'masculina' | 'feminina'>('masculina');
  const [newFamily, setNewFamily] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newBadge, setNewBadge] = useState('');
  const [productCreatedSuccess, setProductCreatedSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setWhatsapp(settings.adminWhatsapp);
      setBanner(settings.bannerText);
      setFreeShipping(settings.freeShippingThreshold);
      setMercadoPagoLink(settings.mercadoPagoLink || '');
      setPixKey(settings.pixKey || '+5516990603561');
      setPixReceiverName(settings.pixReceiverName || 'SMELL GOOD PERFUMARIA');
      setPixCity(settings.pixCity || 'SERTAOZINHO');
      setPaymentError(null);

      try {
        const stored = JSON.parse(localStorage.getItem('smellgood_orders') || '[]');
        setOrders(Array.isArray(stored) ? stored : []);
      } catch {
        setOrders([]);
      }
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleSave = () => {
    setPaymentError(null);
    const trimmedMp = mercadoPagoLink.trim();
    if (trimmedMp) {
      const safeUrl = sanitizeHttpsUrl(trimmedMp);
      if (!safeUrl) {
        setPaymentError('O Link do Mercado Pago deve começar com https:// (ex: https://mpago.la/...).');
        return;
      }
    }

    onSaveSettings({
      ...settings,
      adminWhatsapp: whatsapp.replace(/\D/g, '') || '5516990603561',
      bannerText: banner,
      freeShippingThreshold: Number(freeShipping) || 120,
      mercadoPagoLink: trimmedMp ? sanitizeHttpsUrl(trimmedMp) : '',
      pixKey: pixKey.trim() || '+5516990603561',
      pixReceiverName: pixReceiverName.trim() || 'SMELL GOOD PERFUMARIA',
      pixCity: pixCity.trim() || 'SERTAOZINHO',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2200);
  };

  const handleCopyConfigSnippet = () => {
    const safeUrl = sanitizeHttpsUrl(mercadoPagoLink);
    const snippet = `export const DEFAULT_MERCADO_PAGO_CONFIG = {\n  checkoutLink: '${safeUrl}',\n  pixKey: '${pixKey.trim() || '+5516990603561'}',\n  pixReceiverName: '${pixReceiverName.trim() || 'SMELL GOOD PERFUMARIA'}',\n  pixCity: '${pixCity.trim() || 'SERTAOZINHO'}',\n};`;
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const prod: Product = {
      id: `custom-${Date.now()}`,
      name: newName,
      category: newCategory,
      price_60ml: settings.price60ml || 79.9,
      price_15ml: settings.price15ml || 29.9,
      badge: newBadge || undefined,
      description: newDesc || `Fragrância autoral ${newName} desenvolvida artesanalmente.`,
      notes: {
        family: newFamily || (newCategory === 'masculina' ? 'Amadeirado' : 'Floral'),
      },
    };

    onAddProduct(prod);
    setProductCreatedSuccess(`Perfume "${prod.name}" adicionado com sucesso ao catálogo!`);
    setNewName('');
    setNewFamily('');
    setNewDesc('');
    setNewBadge('');
    setTimeout(() => setProductCreatedSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-3xl bg-[#141414] border border-[#c9a84c]/30 rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#181818]">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-display text-2xl text-[#F5F1EB]">Painel do Lojista · SMELL GOOD</h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin.html"
              className="text-[11px] uppercase tracking-[1.5px] px-3 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all rounded-xs font-semibold"
            >
              Abrir /admin.html &rarr;
            </a>
            <button onClick={onClose} className="p-1 text-[#B8AF9E] hover:text-[#F5F1EB] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-[#c9a84c]/20 bg-[#111]">
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-3 text-xs tracking-[1.5px] uppercase font-medium border-b-2 -mb-px transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'payments'
                ? 'border-[#009EE3] text-[#009EE3]'
                : 'border-transparent text-[#9e8f85] hover:text-[#f4efe6]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Mercado Pago &amp; PIX</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 text-xs tracking-[1.5px] uppercase font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#c9a84c] text-[#c9a84c]'
                : 'border-transparent text-[#9e8f85] hover:text-[#f4efe6]'
            }`}
          >
            Loja &amp; WhatsApp
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-xs tracking-[1.5px] uppercase font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#c9a84c] text-[#c9a84c]'
                : 'border-transparent text-[#9e8f85] hover:text-[#f4efe6]'
            }`}
          >
            Pedidos ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('newProduct')}
            className={`px-4 py-3 text-xs tracking-[1.5px] uppercase font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
              activeTab === 'newProduct'
                ? 'border-[#c9a84c] text-[#c9a84c]'
                : 'border-transparent text-[#9e8f85] hover:text-[#f4efe6]'
            }`}
          >
            + Perfume
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#009EE3]/10 border border-[#009EE3]/35 rounded-xs text-xs text-[#E5E0D5] space-y-2 leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-[#009EE3]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Como receber pelo Mercado Pago na Hostinger</span>
                </div>
                <p className="text-[11px] text-[#B8AF9E]">
                  1. No aplicativo ou painel do <strong>Mercado Pago</strong>, vá em{' '}
                  <em>Cobrar &rarr; Link de pagamento</em> (ou copie sua <strong>Chave PIX</strong> do Mercado Pago).
                  <br />
                  2. Cole abaixo seu Link do Mercado Pago e sua Chave PIX. O QR Code PIX do checkout é gerado
                  automaticamente com o valor exato do carrinho!
                  <br />
                  3. Para que a configuração valha para todos os clientes na Hostinger, clique em{' '}
                  <strong>Copiar para src/config/payment.ts</strong> e faça o build antes de subir para a Hostinger.
                </p>
              </div>

              {paymentError && (
                <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-xs flex items-center gap-2 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{paymentError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                  Link de Pagamento / Checkout Mercado Pago (opcional, mas recomendado para Cartão)
                </label>
                <input
                  type="url"
                  value={mercadoPagoLink}
                  onChange={(e) => setMercadoPagoLink(e.target.value)}
                  placeholder="https://link.mercadopago.com.br/smellgood ou https://mpago.la/..."
                  className="w-full bg-[#0a0a0a] border border-[#009EE3]/40 text-xs text-[#f4efe6] px-3 py-2.5 rounded-xs focus:outline-none focus:border-[#009EE3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                    Chave PIX do Mercado Pago *
                  </label>
                  <input
                    type="text"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    placeholder="E-mail, CPF, Chave Aleatória ou +5516990603561"
                    className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2.5 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                  />
                  <p className="text-[10px] text-[#888] mt-1">
                    Para celular, use formato +55DDDNUMERO (ex: +5516990603561).
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                    Nome do Recebedor no PIX
                  </label>
                  <input
                    type="text"
                    value={pixReceiverName}
                    onChange={(e) => setPixReceiverName(e.target.value)}
                    placeholder="SMELL GOOD PERFUMARIA"
                    maxLength={25}
                    className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2.5 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#c9a84c] hover:bg-[#dec17b] text-[#0a0a0a] text-xs uppercase tracking-[2px] font-bold rounded-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{savedSuccess ? 'Salvo!' : 'Salvar Pagamentos'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyConfigSnippet}
                  className="px-4 py-3 bg-[#181818] hover:bg-[#222] border border-[#c9a84c]/40 text-[#D4AF37] text-xs uppercase tracking-[1px] font-semibold rounded-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  {copiedSnippet ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSnippet ? 'Código Copiado!' : 'Copiar p/ src/config/payment.ts'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                  WhatsApp do Vendedor (com DDI e DDD, apenas números)
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="5516990603561"
                  className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2.5 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                />
                <p className="text-[11px] text-[#9e8f85] mt-1">
                  Número oficial para onde os pedidos e contatos são encaminhados com 1 clique.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                  Texto da Faixa Rolante (Marquee no topo)
                </label>
                <input
                  type="text"
                  value={banner}
                  onChange={(e) => setBanner(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2.5 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                  Valor Mínimo para Frete Grátis (R$)
                </label>
                <input
                  type="number"
                  value={freeShipping}
                  onChange={(e) => setFreeShipping(Number(e.target.value))}
                  className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2.5 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#c9a84c] hover:bg-[#dec17b] text-[#0a0a0a] text-xs uppercase tracking-[2px] font-bold rounded-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{savedSuccess ? 'Salvo!' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#9e8f85]">
                  Nenhum pedido registrado no navegador ainda.
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="p-4 bg-[#181818] border border-white/10 rounded-xs space-y-2 text-xs">
                    <div className="flex justify-between font-semibold text-[#f4efe6]">
                      <span>Pedido #{ord.id}</span>
                      <span className="text-[#c9a84c]">R$ {ord.total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="text-[#9e8f85]">
                      <strong>Cliente:</strong> {ord.customer.name} · {ord.customer.phone}
                    </div>
                    <div className="text-[#9e8f85]">
                      <strong>Itens:</strong>{' '}
                      {ord.items.map((i) => `${i.quantity}x ${i.product.name} (${i.size})`).join(', ')}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-[10px] uppercase text-[#c9a84c]">
                        Pagamento: {ord.paymentMethod}
                      </span>
                      <a
                        href={`https://wa.me/${ord.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Olá ${ord.customer.name}! Estamos processando seu pedido #${ord.id} na Smell Good.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Chamar Cliente
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'newProduct' && (
            <form onSubmit={handleCreateProduct} className="space-y-4">
              {productCreatedSuccess && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xs text-xs text-emerald-300">
                  {productCreatedSuccess}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                    Nome da Fragrância *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Royal Black"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                    Categoria
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as 'masculina' | 'feminina')}
                    className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                  >
                    <option value="masculina">Masculino (Pour Lui)</option>
                    <option value="feminina">Feminino (Pour Elle)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                    Família Olfativa
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Amadeirado Especiado"
                    value={newFamily}
                    onChange={(e) => setNewFamily(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                    Selo / Destaque (opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Lançamento, Exclusivo"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-[#9e8f85] mb-1">
                    Descrição Curta
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descreva a personalidade sensorial deste perfume..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#c9a84c]/30 text-xs text-[#f4efe6] px-3 py-2 rounded-xs focus:outline-none focus:border-[#c9a84c]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#c9a84c] text-[#0a0a0a] text-xs uppercase tracking-[2px] font-bold rounded-xs hover:bg-[#dec17b] cursor-pointer"
              >
                Cadastrar no Catálogo
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
