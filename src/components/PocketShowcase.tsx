import React from 'react';
import { Sparkles, Compass, Pocket, Plane, Check, Zap, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, PerfumeSize } from '../types';
import { SmellGoodBottle } from './SmellGoodBottle';

interface PocketShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onFilterPocket: () => void;
  onBuyNow?: (product: Product, size: PerfumeSize) => void;
}

export const PocketShowcase: React.FC<PocketShowcaseProps> = ({
  products,
  onSelectProduct,
  onFilterPocket,
  onBuyNow,
}) => {
  const { addItem, buyNow } = useCart();

  const handleDirectBuy = (product: Product) => {
    if (onBuyNow) {
      onBuyNow(product, '15ml');
    } else {
      buyNow(product, '15ml', 1);
    }
  };

  // Find 4 top best-selling products for pocket showcase
  const topPockets = [
    {
      product: products.find((p) => p.name === 'Silver Scent') || products[0],
      tag: 'Masculino Marcante',
    },
    {
      product: products.find((p) => p.name.includes('Good Girl')) || products[1],
      tag: 'Feminino Poderoso',
    },
    {
      product: products.find((p) => p.name.includes('Sauvage')) || products[2],
      tag: 'Fresco e Sedutor',
    },
    {
      product: products.find((p) => p.name.includes('212 VIP Rose')) || products[3],
      tag: 'Floral Sofisticado',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] via-[#100f0c] to-[#0a0a0a] border-b border-[#c9a84c]/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[3px] text-[#c9a84c] uppercase font-medium">
              <Pocket className="w-3.5 h-3.5" />
              <span>Coleção Compacta · 15ml</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f4efe6]">
              A Liberdade do <em className="italic text-[#c9a84c] font-normal">Formato Pocket</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#9e8f85] max-w-xl font-light leading-relaxed">
              O mesmo Eau de Parfum nobre e de alta fixação (6h a 10h*) em frascos compactos de 15ml.
              Perfeitos para o bolso, nécessaire, trabalho e viagens por apenas <strong className="text-[#f4efe6] font-medium">R$ 29,90 cada</strong>.
            </p>
          </div>

          <button
            onClick={onFilterPocket}
            className="self-start md:self-auto px-6 py-3 border border-[#c9a84c]/40 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 text-[#c9a84c] text-[11px] tracking-[2px] uppercase font-medium transition-all rounded-xs cursor-pointer"
          >
            Ver Todas as Versões 15ml
          </button>
        </div>

        {/* 4 Cards Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPockets.map((item, idx) => {
            const p = item.product;
            if (!p) return null;
            return (
              <div
                key={idx}
                className="bg-[#141414] border border-[#c9a84c]/25 hover:border-[#c9a84c]/70 transition-all rounded-sm p-4 sm:p-5 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] tracking-[1.5px] uppercase text-[#9e8f85] mb-3">
                    <span className="text-[#c9a84c] font-medium">{item.tag}</span>
                    <span>15ml Pocket</span>
                  </div>

                  {/* SmellGood Pocket Cylinder (15ml Standard with user photos) */}
                  <div
                    onClick={() => onSelectProduct(p)}
                    className="relative aspect-square bg-[#070707] rounded-sm border border-[#D4AF37]/20 flex items-center justify-center mb-4 cursor-pointer overflow-hidden group-hover:border-[#D4AF37]/50 transition-colors"
                  >
                    {p.image_15ml ? (
                      <img
                        src={p.image_15ml}
                        alt={p.name}
                        className="w-full h-full object-cover p-1 transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = 'https://i.postimg.cc/gnBLQTmF/download.png';
                        }}
                      />
                    ) : (
                      <SmellGoodBottle
                        name={p.name}
                        numberCode={p.numberCode}
                        size="15ml"
                        family={p.family || p.notes?.family}
                        category={p.category}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <h3
                    onClick={() => onSelectProduct(p)}
                    className="font-display text-lg sm:text-xl text-[#F5F1EB] font-normal tracking-[0.05em] group-hover:text-[#D4AF37] transition-colors cursor-pointer mb-1 line-clamp-1"
                  >
                    {p.refFormatted || (p.numberCode ? `REF ${p.numberCode} - ${p.name}` : p.name)}
                  </h3>
                  <p className="font-body text-[11px] text-[#B8AF9E] font-light line-clamp-2">
                    {p.description}
                  </p>
                  <span className="text-[10px] text-[#D4AF37] block mt-1 font-light tracking-wide">
                    Alta fixação de 6h a 10h*
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-[#D4AF37]/20 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-body text-[8px] tracking-[1.5px] uppercase text-[#B8AF9E] block font-light">Preço Pocket</span>
                      <span className="font-display text-2xl text-[#D4AF37] font-semibold">R$ 29,90</span>
                    </div>
                    <span className="font-body text-[9px] uppercase tracking-wider text-[#B8AF9E] font-light">15ml Oficial</span>
                  </div>

                  {/* Action buttons: Comprar & Sacola */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleDirectBuy(p)}
                      className="py-2.5 bg-[#c9a84c] hover:bg-[#dec17b] text-[#0a0a0a] text-[10px] tracking-[1.5px] uppercase font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Comprar Agora</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addItem(p, '15ml', 1)}
                      className="py-2.5 bg-[#1a1a1a] hover:bg-[#252525] text-[#f4efe6] hover:text-[#c9a84c] border border-[#c9a84c]/30 text-[10px] tracking-[1px] uppercase font-semibold rounded-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#c9a84c]" />
                      <span>Sacola</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits bar */}
        <div className="mt-12 p-6 bg-[#12110e] border border-[#c9a84c]/20 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center shrink-0">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[1.5px] text-[#f4efe6] font-medium">Aprovado em Voos</h4>
              <p className="text-[11px] text-[#9e8f85] font-light">Leve na bagagem de mão sem preocupações.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[1.5px] text-[#f4efe6] font-medium">Mesma Concentração</h4>
              <p className="text-[11px] text-[#9e8f85] font-light">Mesma qualidade e projeção do frasco de 60ml.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[1.5px] text-[#f4efe6] font-medium">Colecione Fragrâncias</h4>
              <p className="text-[11px] text-[#9e8f85] font-light">Tenha vários aromas para cada momento do seu dia.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
