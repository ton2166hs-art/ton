import React, { useState } from 'react';
import { Sparkles, Check, Truck, Zap, ShoppingBag, ArrowRight, X, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { LotusLogo } from './LotusLogo';
import { SmellGoodBottle } from './SmellGoodBottle';
import { useCart } from '../context/CartContext';

interface BestSellerCombosProps {
  products: Product[];
  whatsappNumber?: string;
  onOpenDetail?: (product: Product) => void;
}

export const BestSellerCombos: React.FC<BestSellerCombosProps> = ({
  products,
  whatsappNumber = '5516990603561',
  onOpenDetail,
}) => {
  const { addItem, setIsCartOpen, showNotification } = useCart();
  const [selectedCombo, setSelectedCombo] = useState<'combo-15ml' | 'combo-60ml' | null>(null);
  const [chosenPerfumes, setChosenPerfumes] = useState<Product[]>([]);

  const handleStartCombo = (type: 'combo-15ml' | 'combo-60ml') => {
    setSelectedCombo(type);
    setChosenPerfumes([]);
  };

  const handleTogglePerfume = (product: Product) => {
    const max = selectedCombo === 'combo-15ml' ? 3 : 2;
    if (chosenPerfumes.some((p) => p.id === product.id)) {
      setChosenPerfumes((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (chosenPerfumes.length < max) {
        setChosenPerfumes((prev) => [...prev, product]);
      }
    }
  };

  const handleConfirmComboToCart = () => {
    if (!selectedCombo) return;
    const max = selectedCombo === 'combo-15ml' ? 3 : 2;
    const size = selectedCombo === 'combo-15ml' ? '15ml' : '60ml';
    const comboPrice = selectedCombo === 'combo-15ml' ? 69.9 : 139.9;
    const comboTitle =
      selectedCombo === 'combo-15ml'
        ? 'Combo 3x 15ml Pocket (R$ 69,90)'
        : 'Combo 2x 60ml Oficial (R$ 139,90) + Frete Grátis';

    const chosenNames =
      chosenPerfumes.length > 0
        ? chosenPerfumes.map((p) => p.refFormatted || p.name).join(', ')
        : 'Fragrâncias a combinar no WhatsApp';

    // Create a special combo product item for the cart
    const comboProduct: Product = {
      id: `${selectedCombo}-${Date.now()}`,
      name: comboTitle,
      ref: selectedCombo === 'combo-15ml' ? 'C-3X15' : 'C-2X60',
      refFormatted: comboTitle,
      category: 'unissex',
      price: comboPrice,
      price_60ml: comboPrice,
      price_15ml: comboPrice,
      description: `Fragrâncias selecionadas: ${chosenNames}`,
      badge: 'Combo Promocional',
      imagem:
        selectedCombo === 'combo-15ml'
          ? 'https://i.postimg.cc/N50rNchx/download-1.png'
          : 'https://i.postimg.cc/0bHKFBxf/download-10.webp',
      image:
        selectedCombo === 'combo-15ml'
          ? 'https://i.postimg.cc/N50rNchx/download-1.png'
          : 'https://i.postimg.cc/0bHKFBxf/download-10.webp',
      image_60ml: 'https://i.postimg.cc/0bHKFBxf/download-10.webp',
      image_15ml: 'https://i.postimg.cc/N50rNchx/download-1.png',
      image15ml: 'https://i.postimg.cc/N50rNchx/download-1.png',
    };

    addItem(comboProduct, size, 1);
    setSelectedCombo(null);
    setChosenPerfumes([]);
    setIsCartOpen(true);
    showNotification(`✓ ${comboTitle} adicionado à sua sacola!`);
  };

  const handleDirectWhatsAppCombo = (type: 'combo-15ml' | 'combo-60ml') => {
    let msg = '';
    if (type === 'combo-15ml') {
      msg = `Olá, vim pelo site Smell Good e quero saber mais sobre as REFs!\n\n*QUERO O COMBO 3x 15ml Pocket por R$ 69,90* (cada frasco sai por R$ 23,30).\n\nPoderia me indicar as opções disponíveis para eu escolher os 3?`;
    } else {
      msg = `Olá, vim pelo site Smell Good e quero saber mais sobre as REFs!\n\n*QUERO O COMBO 2x 60ml Oficial por R$ 139,90 + FRETE GRÁTIS*.\n\nGostaria de escolher minhas 2 fragrâncias de 60ml!`;
    }

    const cleanNum = whatsappNumber.replace(/\D/g, '') || '5516990603561';
    const waUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="combos" className="relative py-16 sm:py-24 bg-[#080808] border-t border-[#D4AF37]/20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] sm:text-xs tracking-[3px] uppercase font-semibold">
            <LotusLogo size={13} />
            <span>COMBO MAIS VENDIDO</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F5F1EB] tracking-wide">
            Leve Mais, <em className="italic text-[#D4AF37] font-normal">Pague Menos</em>
          </h2>

          <p className="font-body text-xs sm:text-sm text-[#B8AF9E] font-light max-w-xl mx-auto leading-relaxed">
            Economia exclusiva para você colecionar suas fragrâncias autorais favoritas ou presentear alguém inesquecível.
          </p>
        </div>

        {/* 2 Exclusive Combo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* CARD 1: Combo 3x 15ml Pocket */}
          <div className="relative bg-gradient-to-b from-[#141414] to-[#0D0D0D] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <div className="absolute -top-3.5 left-6 bg-[#D4AF37] text-[#0A0A0A] text-[9px] tracking-[2px] uppercase font-extrabold px-3 py-1 rounded-xs shadow-md">
              Mais Vendido · Pocket
            </div>

            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between text-[11px] text-[#B8AF9E] mb-2 pt-2">
                <span className="uppercase tracking-[2px] text-[#D4AF37] font-semibold">Linha Compacta</span>
                <span>3 Frascos de 15ml</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-[#F5F1EB] font-normal tracking-wide mb-2 group-hover:text-[#D4AF37] transition-colors">
                Combo 3x 15ml Pocket
              </h3>

              <p className="text-xs text-[#B8AF9E] font-light leading-relaxed mb-6">
                Leve 3 perfumes compactos com a mesma alta fixação Eau de Parfum (6h a 10h*). Perfeito para intercalar dia, trabalho e noites especiais.
              </p>

              {/* Price Highlight */}
              <div className="p-4 bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-xs mb-6 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#888] line-through">R$ 89,70</span>
                  <span className="font-display text-3xl sm:text-4xl text-[#D4AF37] font-semibold">
                    R$ 69,90
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  ★ Cada frasco sai por apenas <strong>R$ 23,30</strong>
                </div>
              </div>

              {/* Perks List */}
              <ul className="space-y-2.5 text-xs text-[#F5F1EB] mb-8 font-light">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Escolha quaisquer 3 fragrâncias do catálogo oficial</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Frascos cilíndricos com spray de alta vazão</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Economia imediata de R$ 19,80</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleStartCombo('combo-15ml')}
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-xs tracking-[2.5px] uppercase font-bold rounded-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>QUERO ESSE COMBO</span>
              </button>

              <button
                type="button"
                onClick={() => handleDirectWhatsAppCombo('combo-15ml')}
                className="w-full py-2.5 text-center text-[11px] text-[#B8AF9E] hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Ou pedir direto no WhatsApp
              </button>
            </div>
          </div>

          {/* CARD 2: Combo 2x 60ml Oficial + FRETE GRÁTIS */}
          <div className="relative bg-gradient-to-b from-[#16140E] to-[#0D0D0D] border-2 border-[#D4AF37] rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl group hover:shadow-[0_0_50px_rgba(212,175,55,0.25)]">
            <div className="absolute -top-3.5 left-6 bg-[#D4AF37] text-[#0A0A0A] text-[9px] tracking-[2px] uppercase font-extrabold px-3 py-1 rounded-xs shadow-md flex items-center gap-1.5">
              <Truck className="w-3 h-3 text-[#0A0A0A]" />
              <span>FRETE GRÁTIS BRASIL · MELHOR OFERTA</span>
            </div>

            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between text-[11px] text-[#B8AF9E] mb-2 pt-2">
                <span className="uppercase tracking-[2px] text-[#D4AF37] font-semibold">Tamanho Oficial</span>
                <span>2 Frascos de 60ml</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-[#F5F1EB] font-normal tracking-wide mb-2 group-hover:text-[#D4AF37] transition-colors">
                Combo 2x 60ml Oficial
              </h3>

              <p className="text-xs text-[#B8AF9E] font-light leading-relaxed mb-6">
                Dois frascos grandes de 60ml na caixa preta fosca com monograma dourado. A experiência completa da alta perfumaria com envio 100% gratuito.
              </p>

              {/* Price Highlight */}
              <div className="p-4 bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xs mb-6 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#888] line-through">R$ 159,80</span>
                  <span className="font-display text-3xl sm:text-4xl text-[#D4AF37] font-semibold">
                    R$ 139,90
                  </span>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">FRETE GRÁTIS INCLUSO PARA TODO O BRASIL</span>
                </div>
              </div>

              {/* Perks List */}
              <ul className="space-y-2.5 text-xs text-[#F5F1EB] mb-8 font-light">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>2 Frascos grandes de 60ml com líquido nobre âmbar</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Caixas pretas com monograma SG e tampa premium</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span><strong>Frete Grátis</strong> (economia de até R$ 30 no frete)</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleStartCombo('combo-60ml')}
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-xs tracking-[2.5px] uppercase font-bold rounded-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>QUERO ESSE COMBO</span>
              </button>

              <button
                type="button"
                onClick={() => handleDirectWhatsAppCombo('combo-60ml')}
                className="w-full py-2.5 text-center text-[11px] text-[#B8AF9E] hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Ou pedir direto no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fragrance Selector Modal for Combos */}
      {selectedCombo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-2xl bg-[#121212] border border-[#D4AF37]/40 rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
                <div>
                  <span className="text-[10px] tracking-[2px] uppercase text-[#D4AF37] font-semibold">
                    {selectedCombo === 'combo-15ml' ? 'Combo 3x 15ml Pocket · R$ 69,90' : 'Combo 2x 60ml Oficial · R$ 139,90'}
                  </span>
                  <h3 className="font-display text-2xl text-[#F5F1EB] font-normal">
                    Escolha suas fragrâncias ({chosenPerfumes.length}/{selectedCombo === 'combo-15ml' ? 3 : 2})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCombo(null)}
                  className="p-1.5 text-[#B8AF9E] hover:text-[#F5F1EB] rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-[#B8AF9E] font-light mt-2">
                Clique nos perfumes que deseja incluir no seu combo ou confirme para combinar as notas diretamente via WhatsApp.
              </p>
            </div>

            {/* List of 48 perfumes to select */}
            <div className="flex-1 overflow-y-auto space-y-2 py-2 pr-1 max-h-[48vh]">
              {products.map((p) => {
                const isSelected = chosenPerfumes.some((cp) => cp.id === p.id);
                const max = selectedCombo === 'combo-15ml' ? 3 : 2;
                const canSelect = isSelected || chosenPerfumes.length < max;

                return (
                  <div
                    key={p.id}
                    onClick={() => canSelect && handleTogglePerfume(p)}
                    className={`flex items-center justify-between p-3 rounded-xs border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F1EB]'
                        : canSelect
                        ? 'border-white/5 bg-[#171717] hover:border-[#D4AF37]/40 text-[#B8AF9E]'
                        : 'border-white/5 bg-[#171717]/50 text-[#666] opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-xs border flex items-center justify-center ${
                          isSelected ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0A0A0A]' : 'border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-display text-sm text-[#F5F1EB]">
                          {p.refFormatted || (p.ref ? `REF ${p.ref} - ${p.name}` : p.name)}
                        </div>
                        <div className="text-[10px] text-[#B8AF9E] uppercase tracking-wider">
                          {p.category === 'feminina' || p.category === 'feminino' ? 'Feminino' : 'Masculino'} · {p.family || p.notes?.family}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37]">
                      {isSelected ? 'Selecionado' : 'Adicionar'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer action */}
            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#B8AF9E]">
                {chosenPerfumes.length === (selectedCombo === 'combo-15ml' ? 3 : 2) ? (
                  <span className="text-emerald-400 font-medium">✓ Fragrâncias selecionadas com sucesso!</span>
                ) : (
                  <span>
                    Selecione mais {(selectedCombo === 'combo-15ml' ? 3 : 2) - chosenPerfumes.length} fragrância(s)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleConfirmComboToCart}
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-xs uppercase tracking-[2px] font-bold rounded-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#0A0A0A]" />
                  <span>Adicionar Combo à Sacola</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
