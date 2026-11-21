import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { SmellGoodBottle } from './SmellGoodBottle';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products
        .filter((p) => {
          const q = query.toLowerCase();
          const refStr = (p.ref || p.numberCode || '').toLowerCase();
          const fullRef = (p.refFormatted || '').toLowerCase();
          const nameStr = p.name.toLowerCase();
          const descStr = (p.description || '').toLowerCase();
          const famStr = (p.family || p.notes?.family || '').toLowerCase();
          return (
            refStr.includes(q) ||
            fullRef.includes(q) ||
            nameStr.includes(q) ||
            descStr.includes(q) ||
            famStr.includes(q) ||
            p.notes?.top?.toLowerCase().includes(q) ||
            p.notes?.heart?.toLowerCase().includes(q) ||
            p.notes?.base?.toLowerCase().includes(q)
          );
        })
        .slice(0, 8)
    : [];

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl bg-[#141414] border border-[#c9a84c]/30 rounded-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-[#c9a84c]/20 p-4 flex items-center gap-3 bg-[#181818]">
          <Search className="w-5 h-5 text-[#c9a84c] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Qual perfume você procura? (ex: Sauvage, Baunilha, Doce...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#f4efe6] placeholder-[#9e8f85] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#9e8f85] hover:text-[#f4efe6]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-[#9e8f85] hover:text-[#c9a84c] uppercase tracking-wider pl-2"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#9e8f85] space-y-2">
              <Sparkles className="w-6 h-6 text-[#c9a84c] mx-auto opacity-40" />
              <p>Digite o nome do perfume ou notas como jasmim, amadeirado, cítrico...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelect(product)}
                className="flex items-center justify-between p-3 rounded-xs bg-[#1a1a1a] hover:bg-[#222] border border-white/5 hover:border-[#c9a84c]/40 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-[#0a0a0a] rounded-xs overflow-hidden flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                    {product.imagem || product.image ? (
                      <img
                        src={product.imagem || product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <SmellGoodBottle
                        name={product.name}
                        numberCode={product.ref || product.numberCode}
                        size="60ml"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-display text-sm sm:text-base text-[#D4AF37] group-hover:text-[#F9E29D] transition-colors line-clamp-1 font-semibold uppercase">
                      {product.titleFormatted || (product.ref ? `SMELL GOOD No. ${product.ref} - ${(product.fictionalName || product.name).toUpperCase()}` : product.name)}
                    </h4>
                    <span className="text-[10px] text-[#B8AF9E] block mt-0.5">
                      Inspiração olfativa: {product.genericInspiration || product.family || 'Fragrância autoral'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-display text-xs sm:text-sm text-[#D4AF37] font-semibold">
                    R$ 79,90 / R$ 29,90
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#B8AF9E] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-[#9e8f85]">
              Nenhum perfume encontrado para "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
