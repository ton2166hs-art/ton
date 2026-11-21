import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Sparkles, Shield, Droplets, Zap, Check } from 'lucide-react';
import { Product, PerfumeSize, getSensualPerfumeTag } from '../types';
import { useCart } from '../context/CartContext';
import { SmellGoodBottle } from './SmellGoodBottle';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product, size: PerfumeSize) => void;
  whatsappNumber?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBuyNow,
  whatsappNumber = '5516990603561',
}) => {
  const { addItem, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>('60ml');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isMasculina = product.category === 'masculina';
  const price = selectedSize === '60ml' ? product.price_60ml : product.price_15ml;

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    setIsCartOpen(true);
    onClose();
  };

  const handleDirectBuy = () => {
    onBuyNow(product, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#121212] border border-[#c9a84c]/30 rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#9e8f85] hover:text-[#f4efe6] bg-[#0a0a0a]/80 hover:bg-[#0a0a0a] rounded-full transition-colors border border-[#c9a84c]/30"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Display with New Standard Bottle */}
          <div className="lg:col-span-6 bg-[#070707] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#c9a84c]/20 relative">
            {/* Catalog Number Badge */}
            <div className="flex items-center gap-2 mb-4">
              {product.numberCode && (
                <span className="bg-[#c9a84c] text-[#0a0a0a] text-xs font-bold tracking-[2px] uppercase px-3 py-1 rounded-xs">
                  Nº {product.numberCode}
                </span>
              )}
              {product.badge && (
                <span className="bg-[#181818] border border-[#c9a84c]/40 text-[#c9a84c] text-[10px] tracking-[1.5px] uppercase font-semibold px-2.5 py-1 rounded-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Main Visual */}
            <div className="relative aspect-square w-full rounded-sm overflow-hidden border border-[#D4AF37]/25 shadow-2xl bg-[#070707] flex items-center justify-center">
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

                let filterClass = '';
                if (product.filtro === 'mais_escuro' || isWoody) {
                  filterClass = 'brightness-[0.88] contrast-[1.15]';
                } else if (product.filtro === 'rosado' || isFloral) {
                  filterClass = '[filter:hue-rotate(325deg)_saturate(1.15)]';
                }

                const isScreenshotUrl = imgUrl && imgUrl.includes('Screenshot');
                const positionClass = isScreenshotUrl
                  ? (isFresh || isFloral ? 'object-[center_28%]' : 'object-[center_58%]')
                  : 'object-contain p-3';

                const localFallback = selectedSize === '15ml' ? 'https://i.postimg.cc/N50rNchx/download-1.png' : 'https://i.postimg.cc/0bHKFBxf/download-10.webp';

                if (imgUrl) {
                  return (
                    <img
                      src={imgUrl}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${positionClass} ${filterClass}`}
                      onError={(e) => {
                        if (e.currentTarget.src !== localFallback && !e.currentTarget.src.endsWith(localFallback)) {
                          e.currentTarget.src = localFallback;
                        }
                      }}
                    />
                  );
                }

                return (
                  <SmellGoodBottle
                    name={product.name}
                    numberCode={product.ref || product.numberCode}
                    size={selectedSize}
                    family={product.family || product.notes?.family}
                    category={product.category}
                  />
                );
              })()}
            </div>

            {/* Sensual & Luxury Badge */}
            <div className="mt-4 p-3 bg-[#111111] border border-[#D4AF37]/20 rounded-xs text-center space-y-1">
              <div className="font-display text-xs tracking-[3px] uppercase text-[#D4AF37] font-medium">
                {getSensualPerfumeTag(product)}
              </div>
              <p className="font-body text-[11px] text-[#B8AF9E] font-light italic">
                &ldquo;Fragrâncias que marcam presença. Fixação que permanece.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Information & Purchase */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Attributes */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] tracking-[2px] uppercase text-[#c9a84c] font-medium">
                <span>{isMasculina ? 'Perfumaria Masculina' : 'Perfumaria Feminina'}</span>
                <span>•</span>
                <span className="text-[#f4efe6]">ALTA FIXAÇÃO</span>
              </div>

              {/* Title (Mínimo 28px no mobile!) */}
              <div className="space-y-1">
                <h2 className="font-serif text-[28px] sm:text-4xl text-[#B8860B] font-bold leading-tight uppercase">
                  {product.titleFormatted || `SMELL GOOD No. ${product.numberCode || product.ref || '01'} - ${(product.fictionalName || product.name).toUpperCase()}`}
                </h2>
                <p className="text-[13px] text-[#A89F91] font-light">
                  Inspiração olfativa: {product.genericInspiration || 'Fragrância autoral de alta fixação'}
                </p>
              </div>

              {/* Description (16px, line-height 1.6!) */}
              <div className="space-y-2">
                <p className="text-[16px] text-[#D8D2C6] font-light leading-[1.6]">
                  {product.description}
                </p>
                <p className="text-[13px] text-[#D4AF37] font-medium tracking-wide">
                  ✦ Alta fixação comprovada de 6h a 10h*
                </p>
              </div>

              {/* Fragrance Metadata Pills from PDF */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {product.notes?.family && (
                  <div className="p-2.5 bg-[#161616] border border-[#c9a84c]/20 rounded-xs">
                    <span className="block text-[8px] uppercase tracking-wider text-[#9e8f85]">Família Olfativa</span>
                    <span className="text-xs text-[#f4efe6] font-medium">{product.notes.family}</span>
                  </div>
                )}
                {product.notes?.occasion && (
                  <div className="p-2.5 bg-[#161616] border border-[#c9a84c]/20 rounded-xs">
                    <span className="block text-[8px] uppercase tracking-wider text-[#9e8f85]">Ocasião Ideal</span>
                    <span className="text-xs text-[#f4efe6] font-medium">{product.notes.occasion}</span>
                  </div>
                )}
                {product.notes?.intensity && (
                  <div className="p-2.5 bg-[#161616] border border-[#c9a84c]/20 rounded-xs">
                    <span className="block text-[8px] uppercase tracking-wider text-[#9e8f85]">Intensidade</span>
                    <span className="text-xs text-[#c9a84c] font-medium">{product.notes.intensity}</span>
                  </div>
                )}
                <div className="p-2.5 bg-[#161616] border border-[#c9a84c]/20 rounded-xs">
                  <span className="block text-[8px] uppercase tracking-wider text-[#9e8f85]">Concentração</span>
                  <span className="text-xs text-[#f4efe6] font-medium">Eau de Parfum Premium</span>
                </div>
              </div>

              {/* Size Selector: 60ml e 15ml */}
              <div className="space-y-2 pt-2">
                <div className="text-[10px] tracking-[2px] uppercase text-[#9e8f85]">
                  Selecione o Frasco Desejado:
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedSize('60ml')}
                    className={`p-3.5 text-left border rounded-xs transition-all cursor-pointer ${
                      selectedSize === '60ml'
                        ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f4efe6] shadow-sm'
                        : 'border-[#c9a84c]/25 bg-transparent text-[#9e8f85] hover:border-[#c9a84c]/60'
                    }`}
                  >
                    <div className="font-display text-lg font-medium text-[#f4efe6]">Frasco 60ml</div>
                    <div className="text-[11px] text-[#9e8f85] tracking-wider uppercase">Tamanho Oficial</div>
                    <div className="font-serif text-[22px] text-[#D4AF37] mt-1 font-bold">
                      R$ {(product.price_60ml || 79.9).toFixed(2).replace('.', ',')}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedSize('15ml')}
                    className={`p-3.5 text-left border rounded-xs transition-all cursor-pointer ${
                      selectedSize === '15ml'
                        ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f4efe6] shadow-sm'
                        : 'border-[#c9a84c]/25 bg-transparent text-[#9e8f85] hover:border-[#c9a84c]/60'
                    }`}
                  >
                    <div className="font-display text-lg font-medium text-[#f4efe6]">Frasco 15ml Pocket</div>
                    <div className="text-[11px] text-[#9e8f85] tracking-wider uppercase">Bolsa & Viagem</div>
                    <div className="font-serif text-[22px] text-[#D4AF37] mt-1 font-bold">
                      R$ {(product.price_15ml || 29.9).toFixed(2).replace('.', ',')}
                    </div>
                  </button>
                </div>
              </div>

              {/* Quantity Selector & Price Summary */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center border border-[#c9a84c]/30 rounded-xs bg-[#0a0a0a]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-1.5 text-sm text-[#9e8f85] hover:text-[#c9a84c] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs text-[#f4efe6] font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-1.5 text-sm text-[#9e8f85] hover:text-[#c9a84c] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="block text-[9px] tracking-[1.5px] uppercase text-[#9e8f85]">Total Selecionado</span>
                  <span className="font-display text-2xl text-[#c9a84c] font-medium">
                    R$ {(price * quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: COMPRAR AGORA, Sacola, WhatsApp */}
            <div className="space-y-2.5 pt-4 border-t border-[#c9a84c]/20">
              <button
                onClick={handleDirectBuy}
                className="w-full py-4 bg-[#c9a84c] hover:bg-[#dec17b] text-[#0a0a0a] text-xs tracking-[3px] uppercase font-bold transition-all rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Comprar Agora · {selectedSize} (R$ {(price * quantity).toFixed(2).replace('.', ',')})</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-[#181818] hover:bg-[#222222] text-[#f4efe6] hover:text-[#c9a84c] border border-[#c9a84c]/30 text-xs tracking-[2px] uppercase font-semibold transition-all rounded-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#c9a84c]" />
                <span>Adicionar à Sacola de Compras</span>
              </button>

              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '') || '5516990603561'}?text=${encodeURIComponent(
                  'Olá, vim pelo site Smell Good e quero saber mais sobre as REFs'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ou peça pelo WhatsApp (16) 99060-3561</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
