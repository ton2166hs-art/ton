import React, { useState, useMemo } from 'react';
import { Search, Sparkles, X, SlidersHorizontal } from 'lucide-react';
import { Product, PerfumeSize } from '../types';
import { ProductCard } from './ProductCard';
import { AnimatedGridItem } from './AnimatedGridItem';
import { LotusLogo } from './LotusLogo';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenDetail: (product: Product) => void;
  onBuyNow: (product: Product, size: PerfumeSize) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export type TopFilter = 'todos' | 'masculino' | 'feminino' | 'doce' | 'fresco' | 'amadeirado';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onOpenDetail,
  onBuyNow,
  searchQuery,
  onSearchChange,
}) => {
  // Top filter: Todos, Masculino, Feminino, Doce, Fresco, Amadeirado
  const [topFilter, setTopFilter] = useState<TopFilter>(() => {
    if (activeCategory === 'masculino' || activeCategory === 'masculina') return 'masculino';
    if (activeCategory === 'feminino' || activeCategory === 'feminina') return 'feminino';
    return 'todos';
  });

  // Sync if parent activeCategory changes
  React.useEffect(() => {
    if (activeCategory === 'masculino' || activeCategory === 'masculina') {
      setTopFilter('masculino');
    } else if (activeCategory === 'feminino' || activeCategory === 'feminina') {
      setTopFilter('feminino');
    } else if (activeCategory === 'catalogo' || activeCategory === 'todos') {
      setTopFilter('todos');
    }
  }, [activeCategory]);

  const handleFilterClick = (filter: TopFilter) => {
    setTopFilter(filter);
    if (filter === 'masculino') onSelectCategory('masculino');
    else if (filter === 'feminino') onSelectCategory('feminino');
    else onSelectCategory('todos');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Top Filters: Todos, Masculino, Feminino, Doce, Fresco, Amadeirado
      if (topFilter === 'masculino') {
        const cat = p.category?.toLowerCase();
        if (cat !== 'masculino' && cat !== 'masculina') return false;
      } else if (topFilter === 'feminino') {
        const cat = p.category?.toLowerCase();
        if (cat !== 'feminino' && cat !== 'feminina') return false;
      } else if (topFilter === 'doce') {
        const text = `${p.family || ''} ${p.notes?.family || ''} ${p.description || ''}`.toLowerCase();
        const isSweet = text.includes('doce') || text.includes('baunilha') || text.includes('oriental') || text.includes('gourmand') || text.includes('âmbar');
        if (!isSweet) return false;
      } else if (topFilter === 'fresco') {
        const text = `${p.family || ''} ${p.notes?.family || ''} ${p.description || ''}`.toLowerCase();
        const isFresh = text.includes('fresc') || text.includes('aquát') || text.includes('cítric') || text.includes('marinho') || text.includes('aromático');
        if (!isFresh) return false;
      } else if (topFilter === 'amadeirado') {
        const text = `${p.family || ''} ${p.notes?.family || ''} ${p.description || ''}`.toLowerCase();
        const isWoody = text.includes('amadeir') || text.includes('madeira') || text.includes('cedro') || text.includes('vetiver') || text.includes('couro');
        if (!isWoody) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const refStr = (p.ref || p.numberCode || '').toLowerCase();
        const nameStr = p.name.toLowerCase();
        const refFull = (p.refFormatted || '').toLowerCase();
        const descStr = (p.description || '').toLowerCase();
        const familyStr = (p.family || p.notes?.family || '').toLowerCase();
        if (
          !refStr.includes(q) &&
          !nameStr.includes(q) &&
          !refFull.includes(q) &&
          !descStr.includes(q) &&
          !familyStr.includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [products, topFilter, searchQuery]);

  const filterButtons: { id: TopFilter; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'masculino', label: 'Masculino' },
    { id: 'feminino', label: 'Feminino' },
    { id: 'doce', label: 'Doce' },
    { id: 'fresco', label: 'Fresco' },
    { id: 'amadeirado', label: 'Amadeirado' },
  ];

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] tracking-[3px] uppercase font-light">
            <LotusLogo className="w-3.5 h-3.5" />
            <span className="font-body">Coleção <strong className="tracking-[8px] font-normal">SMELL GOOD</strong> · Curadoria Editorial</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F5F1EB] tracking-wide">
            Coleção Oficial de <em className="italic text-[#D4AF37] font-normal">Perfumes</em>
          </h2>

          <p className="font-body text-xs sm:text-sm text-[#B8AF9E] font-light leading-relaxed max-w-xl mx-auto">
            Frascos oficiais de <strong className="text-[#F5F1EB] font-normal">60ml (R$ 79,90)</strong> e <strong className="text-[#F5F1EB] font-normal">15ml Pocket (R$ 29,90)</strong>.
            Feitos artesanalmente em Sertãozinho/SP com alta fixação de 6h a 10h*.
          </p>
        </div>

        {/* Filters Top Bar: Todos, Masculino, Feminino, Doce, Fresco, Amadeirado */}
        <div className="space-y-4 mb-10 pb-6 border-b border-[#D4AF37]/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Required Filters in Top */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#121212] border border-[#D4AF37]/35 rounded-xs w-full lg:w-auto">
              {filterButtons.map((btn) => {
                const isSelected = topFilter === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => handleFilterClick(btn.id)}
                    className={`px-4 sm:px-5 py-2 text-xs tracking-[1.5px] uppercase font-semibold transition-all rounded-xs cursor-pointer flex-1 sm:flex-none text-center ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#0A0A0A] shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold'
                        : 'text-[#B8AF9E] hover:text-[#F5F1EB] hover:bg-white/5'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full lg:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8AF9E]" />
              <input
                type="text"
                placeholder="Buscar REF (ex: 02, 69) ou nome..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#121212] border border-[#D4AF37]/35 text-xs text-[#F5F1EB] placeholder-[#777] pl-10 pr-9 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#F5F1EB]"
                  aria-label="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Results Count Banner */}
          <div className="flex items-center justify-between text-[11px] text-[#B8AF9E] px-1 pt-1">
            <span>
              Exibindo <strong className="text-[#D4AF37]">{filteredProducts.length}</strong> perfumes na curadoria
            </span>
            {topFilter !== 'todos' && (
              <button
                onClick={() => handleFilterClick('todos')}
                className="text-[#D4AF37] hover:underline cursor-pointer"
              >
                Limpar filtro ({topFilter})
              </button>
            )}
          </div>
        </div>

        {/* 1. GRADE DE PRODUTOS: 3 COLUNAS NO DESKTOP, 1 NO CELULAR */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product, idx) => (
              <AnimatedGridItem key={product.id} index={idx} className="h-full">
                <ProductCard
                  product={product}
                  onOpenDetail={onOpenDetail}
                  onBuyNow={onBuyNow}
                />
              </AnimatedGridItem>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121212] border border-[#D4AF37]/20 rounded-sm p-8">
            <LotusLogo className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-display text-xl text-[#F5F1EB]">Nenhuma fragrância encontrada com o filtro selecionado.</p>
            <p className="text-xs text-[#B8AF9E] mt-1">Tente selecionar outro filtro ou limpar sua busca.</p>
            <button
              onClick={() => {
                setTopFilter('todos');
                onSearchChange('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#D4AF37] text-[#0A0A0A] text-xs uppercase tracking-[2px] font-bold rounded-xs cursor-pointer hover:bg-[#E5C464]"
            >
              Ver Toda a Coleção
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
