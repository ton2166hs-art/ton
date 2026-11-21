import React, { useState } from 'react';
import { Product, PerfumeSize } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Zap, Eye, Check } from 'lucide-react';
import { SmellGoodBottle } from './SmellGoodBottle';

interface KingProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onBuyNow?: (product: Product, size: PerfumeSize) => void;
}

export const KingProductCard: React.FC<KingProductCardProps> = ({
  product,
  onOpenDetail,
  onBuyNow,
}) => {
  const { addItem, buyNow, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>('60ml');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price = selectedSize === '60ml' ? (product.price_60ml || 79.9) : (product.price_15ml || 29.9);
  const formattedPixPrice = `R$ ${price.toFixed(2).replace('.', ',')}`;

  // Cálculo de parcelas
  const installmentCount = selectedSize === '60ml' ? 3 : 2;
  const installmentValue = (price / installmentCount).toFixed(2).replace('.', ',');

  // Imagem do frasco
  const imgUrl =
    selectedSize === '15ml'
      ? product.image_15ml || product.image15ml || 'https://i.postimg.cc/gnBLQTmF/download.png'
      : product.image_60ml || product.imagem || product.image || 'https://i.postimg.cc/0bHKFBxf/download-(10).webp';

  const refCode = product.ref || product.numberCode || '01';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleDirectBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product, selectedSize);
    } else {
      buyNow(product, selectedSize, 1);
    }
    setIsCartOpen(true);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative bg-white border border-[#E5E5E5] hover:border-[#C59B27] rounded-xs p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer"
    >
      <div>
        {/* CONTAINER DA FOTO GRANDE DO FRASCO EM FUNDO BRANCO LIMPO (IGUAL KING) */}
        <div className="relative aspect-square w-full bg-[#FDFDFD] rounded-xs overflow-hidden flex items-center justify-center p-2 mb-2 border border-gray-100 group-hover:border-amber-200/50 transition-colors">
          
          {/* Badge sutil superior se houver */}
          {product.badge && (
            <div className="absolute top-2 left-2 z-10">
              <span className="text-[9px] tracking-wider uppercase font-semibold text-[#8A6715] bg-[#F9F4E8] border border-[#D4AF37]/30 px-2 py-0.5 rounded-xs">
                {product.badge}
              </span>
            </div>
          )}

          {/* Tag de REF discreta */}
          <div className="absolute top-2 right-2 z-10">
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#444444] bg-white/90 px-1.5 py-0.5 rounded-xs border border-gray-200">
              REF {refCode}
            </span>
          </div>

          {/* Imagem do Frasco em Alta Resolução */}
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={product.name}
              className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-500 ease-out"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://i.postimg.cc/0bHKFBxf/download-(10).webp';
              }}
            />
          ) : (
            <SmellGoodBottle
              name={product.name}
              numberCode={refCode}
              size={selectedSize}
              className="w-full h-full scale-105"
            />
          )}

          {/* Hover Overlay "Ver Detalhes" */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-[#111111] text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-xs shadow-md flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Ver Detalhes</span>
            </span>
          </div>
        </div>

        {/* SELETOR RÁPIDO DE TAMANHO: 60ml ou 15ml */}
        <div className="flex items-center justify-center gap-1.5 py-1 mb-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSize('60ml');
            }}
            className={`px-2.5 py-0.5 text-[10px] tracking-wider uppercase font-semibold rounded-xs border transition-colors cursor-pointer ${
              selectedSize === '60ml'
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
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
            className={`px-2.5 py-0.5 text-[10px] tracking-wider uppercase font-semibold rounded-xs border transition-colors cursor-pointer ${
              selectedSize === '15ml'
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            15ml
          </button>
        </div>

        {/* TÍTULO GRANDE EM DOURADO: SMELL GOOD No. [NÚMERO] - [NOME FICTÍCIO EM CAPS] */}
        <h3 className="font-serif text-[16px] sm:text-[17px] font-bold text-[#B8860B] tracking-tight leading-snug line-clamp-1 group-hover:text-[#D4AF37] transition-colors text-left uppercase">
          {product.titleFormatted || `SMELL GOOD No. ${refCode} - ${(product.fictionalName || product.name).toUpperCase()}`}
        </h3>

        {/* SUBTÍTULO PEQUENO EM CINZA CLARO 12PX: Inspiração olfativa genérica sem marca */}
        <p className="text-[12px] text-[#777777] text-left line-clamp-1 mt-0.5 font-light">
          Inspiração olfativa: {product.genericInspiration || 'Fragrância autoral de alta fixação'}
        </p>

        {/* BLOCO DE PREÇO: R$ 79,90 NO PIX EM VERDE + PARCELADO PEQUENO CINZA */}
        <div className="mt-2 text-left space-y-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-[21px] sm:text-[22px] font-bold text-emerald-600 tracking-tight">
              {formattedPixPrice}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs border border-emerald-200">
              NO PIX
            </span>
          </div>

          <p className="text-[12px] sm:text-[13px] text-[#777777] font-normal leading-none">
            ou {installmentCount}x de R$ {installmentValue} sem juros
          </p>
        </div>
      </div>

      {/* BOTÕES DE AÇÃO: "Adicionar à sacolinha" DISCRETO COM BORDA FINA + "COMPRAR AGORA" */}
      <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center gap-1.5">
        
        {/* Botão Discreto com Borda Fina: Adicionar à sacolinha (igual King, sem verde gritante!) */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-2 px-2 border rounded-xs text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            addedAnimation
              ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
              : 'border-[#CCCCCC] hover:border-[#111111] text-[#222222] hover:bg-[#111111] hover:text-white'
          }`}
          title="Adicionar à sacola"
        >
          {addedAnimation ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Adicionado!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="truncate">Sacolinha</span>
            </>
          )}
        </button>

        {/* Botão Dourado: Comprar Agora */}
        <button
          type="button"
          onClick={handleDirectBuy}
          className="flex-1 py-2 px-2 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#E5C464] hover:to-[#D4AF37] text-[#0A0A0A] text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded-xs transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span className="truncate">Comprar</span>
        </button>
      </div>
    </div>
  );
};
