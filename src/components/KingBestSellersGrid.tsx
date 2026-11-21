import React, { useState, useMemo } from 'react';
import { Product, PerfumeSize } from '../types';
import { CrownGold } from './CrownGold';
import { KingProductCard } from './KingProductCard';
import { Search, Sparkles, Filter, X } from 'lucide-react';

interface KingBestSellersGridProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onBuyNow?: (product: Product, size: PerfumeSize) => void;
  activeSensation?: string | null;
  onClearSensation?: () => void;
}

export const KingBestSellersGrid: React.FC<KingBestSellersGridProps> = ({
  products,
  onOpenDetail,
  onBuyNow,
  activeSensation,
  onClearSensation,
}) => {
  const [activeGender, setActiveGender] = useState<'all' | 'masculino' | 'feminino' | 'pocket'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtragem inteligente por gênero, busca e sensação olfativa
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Filtro de gênero
      if (activeGender === 'masculino' && p.category !== 'masculina' && p.category !== 'masculino') return false;
      if (activeGender === 'feminino' && p.category !== 'feminina' && p.category !== 'feminino') return false;

      // Filtro por sensação (se selecionado na seção anterior)
      if (activeSensation) {
        const fullText = `${p.family || ''} ${p.notes?.family || ''} ${p.description || ''} ${p.name || ''}`.toLowerCase();
        if (!fullText.includes(activeSensation.toLowerCase())) return false;
      }

      // Filtro por termo de busca
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const refMatch = (p.ref || p.numberCode || '').toLowerCase().includes(query);
        const nameMatch = p.name.toLowerCase().includes(query);
        const familyMatch = (p.family || p.notes?.family || '').toLowerCase().includes(query);
        if (!refMatch && !nameMatch && !familyMatch) return false;
      }

      return true;
    });
  }, [products, activeGender, activeSensation, searchQuery]);

  return (
    <section id="mais-vendidos" className="py-14 sm:py-20 bg-[#FFFFFF] text-[#111111] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO DA VITRINE COM COROA DOURADA E TÍTULO SERIF FINO PRETO (IGUAL VÍDEO DO KING) */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          
          {/* Coroa Dourada Centralizada */}
          <div className="flex justify-center">
            <CrownGold size={38} className="drop-shadow-sm" />
          </div>

          {/* Título Principal em Serif Fino Preto (Mínimo 28px no mobile!) */}
          <h2 className="font-serif text-[28px] sm:text-4xl lg:text-5xl font-light text-[#111111] tracking-wider uppercase">
            OS MAIS VENDIDOS DO MÊS
          </h2>

          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto" />

          {/* Subtítulo com Tipografia 16px para excelente legibilidade sem zoom */}
          <p className="text-[16px] text-[#555555] font-light max-w-xl mx-auto leading-relaxed">
            Descubra as fragrâncias autorais de maior sucesso com fixação marcante de 6h a 10h*.
          </p>

          {/* Se houver filtro de sensação ativo, exibir aviso elegante */}
          {activeSensation && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9F4E8] border border-[#D4AF37]/50 rounded-full text-xs text-[#8A6715] font-medium">
              <span>Filtrando por sensação: <strong>{activeSensation.toUpperCase()}</strong></span>
              {onClearSensation && (
                <button
                  type="button"
                  onClick={onClearSensation}
                  className="hover:text-black ml-1 cursor-pointer"
                  title="Limpar filtro de sensação"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* BARRA DE CONTROLE: ABAS DE CATEGORIA + BUSCA RÁPIDA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
          
          {/* Abas Minimalistas */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveGender('all')}
              className={`px-4 py-2 text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer whitespace-nowrap ${
                activeGender === 'all'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({products.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveGender('masculino')}
              className={`px-4 py-2 text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer whitespace-nowrap ${
                activeGender === 'masculino'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Masculinos
            </button>

            <button
              type="button"
              onClick={() => setActiveGender('feminino')}
              className={`px-4 py-2 text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer whitespace-nowrap ${
                activeGender === 'feminino'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Femininos
            </button>

            <button
              type="button"
              onClick={() => setActiveGender('pocket')}
              className={`px-4 py-2 text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer whitespace-nowrap ${
                activeGender === 'pocket'
                  ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-xs'
                  : 'bg-amber-50 text-[#8A6715] hover:bg-amber-100 border border-amber-200/50'
              }`}
            >
              Pocket 15ml (R$ 29,90)
            </button>
          </div>

          {/* Busca Rápida por REF ou Nome */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar perfume ou REF (ex: 02, 10)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs text-[#111111] placeholder-gray-400 pl-9 pr-8 py-2 rounded-xs focus:outline-none focus:border-[#B8860B] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* GRID DE PRODUTOS: EXATAMENTE 2 POR LINHA NO CELULAR (IGUAL KING) */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <CrownGold size={32} className="opacity-40 mx-auto" />
            <div className="font-serif text-xl text-[#333333]">Nenhuma fragrância encontrada</div>
            <p className="text-sm text-[#777777] max-w-sm mx-auto">
              Tente buscar por outro nome, número de REF ou limpe o filtro atual.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveGender('all');
                setSearchQuery('');
                if (onClearSensation) onClearSensation();
              }}
              className="px-5 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold rounded-xs cursor-pointer hover:bg-black"
            >
              Ver Todas as Fragrâncias
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <KingProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenDetail}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        )}

        {/* Selo de Garantia e Fixação no Rodapé da Vitrine */}
        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#666666]">
          <div className="flex items-center gap-2">
            <CrownGold size={18} />
            <span className="font-medium text-[#111111]">Qualidade Eau de Parfum Autoral</span>
            <span>·</span>
            <span>Fixação marcante de 6h a 10h*</span>
          </div>

          <div className="flex items-center gap-4 text-[#888888]">
            <span>Frete Grátis acima de R$ 120</span>
            <span>·</span>
            <span>Envios diários via Correios</span>
          </div>
        </div>

      </div>
    </section>
  );
};
