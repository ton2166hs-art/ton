import React, { useState } from 'react';
import { ShoppingBag, Eye, Zap, Sparkles } from 'lucide-react';
import { Product, PerfumeSize, getSensualPerfumeTag } from '../types';
import { useCart } from '../context/CartContext';
import { SmellGoodBottle } from './SmellGoodBottle';
import { LotusLogo } from './LotusLogo';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onBuyNow: (product: Product, size: PerfumeSize) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onBuyNow,
}) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>('60ml');

  const priceValue = selectedSize === '60ml' ? (product.price_60ml || product.price || 100) : (product.price_15ml || 35);
  const formattedPrice = `R$ ${priceValue.toFixed(2).replace('.', ',')}`;

  // Formatted REF name: ex: "SMELL GOOD No. 04 - OURO DO REI"
  const refCode = product.ref || product.numberCode || '01';
  const refTitle = product.titleFormatted || `SMELL GOOD No. ${refCode} - ${(product.fictionalName || product.name).toUpperCase()}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedSize, 1);
  };

  const handleDirectBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyNow(product, selectedSize);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative flex flex-col bg-[#121212] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 rounded-sm overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)]"
    >
      {/* Top Bar Badges */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
        {/* REF Badge */}
        <div className="flex items-center gap-1.5">
          <span className="bg-[#0A0A0A]/95 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] tracking-[1.5px] uppercase font-bold px-2 py-0.5 rounded-xs shadow-md">
            REF {refCode}
          </span>
          {product.badge && (
            <span className="bg-[#D4AF37] text-[#0A0A0A] text-[9px] tracking-[1.5px] uppercase font-bold px-2 py-0.5 rounded-xs shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Family Pill */}
        {product.family && (
          <span className="text-[9px] tracking-[1px] uppercase text-[#F5F1EB] bg-[#1A1A1A]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-xs border border-[#D4AF37]/35 font-medium">
            {product.family}
          </span>
        )}
      </div>

      {/* Visual Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#070707] flex items-center justify-center">
        {(() => {
          const imgUrl =
            selectedSize === '15ml'
              ? product.image_15ml || product.image15ml || 'https://i.postimg.cc/N50rNchx/download-1.png'
              : product.image_60ml || product.imagem || product.image || 'https://i.postimg.cc/0bHKFBxf/download-10.webp';

          const famLower = (product.family || product.notes?.family || '').toLowerCase();
          const isSweet = famLower.includes('doce') || famLower.includes('gourmand') || famLower.includes('baunilha');
          const isFresh = famLower.includes('aquát') || famLower.includes('fresc') || famLower.includes('marinho') || famLower.includes('aromát');
          const isWoody = !isSweet && !isFresh && (famLower.includes('amadeir') || famLower.includes('madeira') || famLower.includes('vetiver') || famLower.includes('couro'));
          const isFloral = !isSweet && (famLower.includes('floral') || famLower.includes('cítric') || famLower.includes('chipre') || famLower.includes('frutal') || famLower.includes('ros'));

          // Styling filters specified by user:
          let filterClass = '';
          if (product.filtro === 'mais_escuro' || isWoody) {
            filterClass = 'brightness-[0.88] contrast-[1.15]';
          } else if (product.filtro === 'rosado' || isFloral) {
            filterClass = '[filter:hue-rotate(325deg)_saturate(1.15)]';
          }

          const isScreenshotUrl = imgUrl && imgUrl.includes('Screenshot');
          const positionClass = isScreenshotUrl
            ? (isFresh || isFloral ? 'object-[center_28%]' : 'object-[center_58%]')
            : 'object-contain p-2';

          const localFallback = selectedSize === '15ml' ? 'https://i.postimg.cc/N50rNchx/download-1.png' : 'https://i.postimg.cc/0bHKFBxf/download-10.webp';

          if (imgUrl) {
            return (
              <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#070707]">
                <img
                  src={imgUrl}
                  alt={refTitle}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${positionClass} ${filterClass}`}
                  onError={(e) => {
                    if (e.currentTarget.src !== localFallback && !e.currentTarget.src.endsWith(localFallback)) {
                      e.currentTarget.src = localFallback;
                    }
                  }}
                />
                <div className="absolute bottom-2.5 right-2.5 bg-[#0A0A0A]/95 border border-[#D4AF37]/45 px-2.5 py-1 rounded-xs text-[9px] tracking-[1.5px] uppercase font-light text-[#D4AF37] shadow-lg backdrop-blur-xs">
                  {getSensualPerfumeTag(product)}
                </div>
              </div>
            );
          }

          return (
            <SmellGoodBottle
              name={product.name}
              numberCode={refCode}
              size={selectedSize}
              family={product.family || product.notes?.family}
              category={product.category}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          );
        })()}

        {/* Hover Quick View */}
        <div className="absolute inset-x-0 bottom-2.5 px-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-[#0A0A0A]/95 border border-[#D4AF37]/40 text-[#F5F1EB] text-[10px] tracking-[2px] uppercase font-light px-3 py-1 rounded-xs flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Ver Detalhes Olfativos</span>
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#121212] border-t border-[#D4AF37]/15">
        <div>
          {/* Subtle Category & Notes */}
          <div className="flex items-center justify-between text-[10px] tracking-[2px] uppercase text-[#D4AF37] font-medium mb-1 truncate">
            <span>{product.notes?.family || product.family || 'Eau de Parfum'}</span>
            <span className="text-[9px] text-[#B8AF9E] font-light">
              {selectedSize === '60ml' ? '60ml Oficial' : '15ml Pocket'}
            </span>
          </div>

          {/* Nome da REF (ex: REF 02 - 1 Million) - Título Cormorant / Playfair peso 400 letras espaçadas */}
          <h3 className="font-display text-lg sm:text-xl text-[#F5F1EB] font-normal tracking-[0.05em] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {refTitle}
          </h3>

          {/* Description - Montserrat/Inter peso 300 */}
          <p className="font-body text-[11px] text-[#B8AF9E] font-light line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
          <span className="text-[10px] text-[#D4AF37] block mt-1 font-light tracking-wide">
            Alta fixação de 6h a 10h*
          </span>
        </div>

        {/* Size Selection Toggle: 60ml (padrão) e 15ml */}
        <div className="mt-4 pt-3 border-t border-[#D4AF37]/15">
          <div className="flex items-center justify-between gap-1 mb-3">
            <span className="text-[9px] tracking-[1.5px] uppercase text-[#B8AF9E]">Frasco:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize('60ml');
                }}
                className={`px-2.5 py-1 text-[10px] tracking-[1px] uppercase font-medium transition-colors rounded-xs border cursor-pointer ${
                  selectedSize === '60ml'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37] font-bold shadow-sm'
                    : 'bg-transparent text-[#B8AF9E] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                }`}
              >
                60ml
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize('15ml');
                }}
                className={`px-2.5 py-1 text-[10px] tracking-[1px] uppercase font-medium transition-colors rounded-xs border cursor-pointer ${
                  selectedSize === '15ml'
                    ? 'bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37] font-bold shadow-sm'
                    : 'bg-transparent text-[#B8AF9E] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                }`}
              >
                15ml
              </button>
            </div>
          </div>

          {/* Preço R$ 100,00 and Botão COMPRAR */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="text-left">
              <span className="block text-[8px] tracking-[1.5px] uppercase text-[#B8AF9E]">
                {selectedSize === '60ml' ? '60ml Padrão' : '15ml Pocket'}
              </span>
              <span className="font-display text-xl sm:text-2xl text-[#D4AF37] font-semibold leading-none">
                {formattedPrice}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Botão Secundário: Sacola */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="p-2.5 bg-[#1A1A1A] hover:bg-[#252525] text-[#F5F1EB] hover:text-[#D4AF37] border border-[#D4AF37]/35 rounded-xs transition-colors cursor-pointer"
                title="Adicionar à Sacola"
                aria-label="Adicionar à Sacola"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>

              {/* Botão Dourado: COMPRAR AGORA */}
              <button
                type="button"
                onClick={handleDirectBuy}
                className="px-3 sm:px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-[11px] sm:text-xs tracking-[1.5px] uppercase font-bold transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] rounded-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>COMPRAR AGORA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
