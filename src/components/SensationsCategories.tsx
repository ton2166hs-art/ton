import React, { useState } from 'react';
import { CrownGold } from './CrownGold';
import { ArrowRight } from 'lucide-react';

interface SensationItem {
  id: string;
  name: string;
  familyFilter: string;
  imageUrl: string;
  fallbackUrl: string;
  description: string;
  tag: string;
}

interface SensationsCategoriesProps {
  onSelectSensation: (sensationKey: string) => void;
  activeSensation?: string | null;
}

export const SensationsCategories: React.FC<SensationsCategoriesProps> = ({
  onSelectSensation,
  activeSensation,
}) => {
  const [mobileIndex, setMobileIndex] = useState(0);

  // Ordem estrita do carrossel: 1 CÍTRICOS, 2 FRUTAL, 3 AMADEIRADO, 4 GOURMAND
  const sensations: SensationItem[] = [
    // 1. CÍTRICOS: Laranja, grapefruit rosa, limão, lima com gotas de água em fundo preto
    {
      id: 'citricos',
      name: 'CÍTRICOS',
      familyFilter: 'cítrico',
      imageUrl: '/images/sensations/citricos_grapefruit_limas.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1200&h=800&q=90',
      description: 'Laranja, grapefruit rosa, limão e lima com gotas d\x27água',
      tag: 'Frescor & Vitalidade',
    },
    // 2. FRUTAL: Maçãs vermelhas, verdes, peras, morango caindo em fundo preto
    {
      id: 'frutal',
      name: 'FRUTAL',
      familyFilter: 'frutal',
      imageUrl: '/images/sensations/frutal_macas_peras.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&h=800&q=90',
      description: 'Maçãs vermelhas e verdes, peras e morangos frescos',
      tag: 'Vibrante & Suculento',
    },
    // 3. AMADEIRADO: Madeiras nobres, sândalo, cedro, âmbar e resinas douradas
    {
      id: 'amadeirado',
      name: 'AMADEIRADO',
      familyFilter: 'amadeirado',
      imageUrl: '/images/sensations/amadeirado_nobres_ambar.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&h=800&q=90',
      description: 'Madeiras nobres, sândalo, cedro, âmbar e resinas douradas',
      tag: 'Poder & Sofisticação',
    },
    // 4. GOURMAND: Baunilha, fava tonka, caramelo, chocolate, canela e erva-doce estrelada
    {
      id: 'gourmand',
      name: 'GOURMAND',
      familyFilter: 'doce',
      imageUrl: '/images/sensations/gourmand_baunilha_caramelo.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&h=800&q=90',
      description: 'Baunilha, fava tonka, caramelo, chocolate, canela e erva-doce estrelada',
      tag: 'Poder & Sedução',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#0E0E0E] border-b border-[#222222] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção com Coroa Real */}
        <div className="text-center space-y-2.5 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2">
            <CrownGold size={22} />
            <span className="text-[11px] sm:text-xs tracking-[3.5px] uppercase font-bold text-[#D4AF37]">
              FAMÍLIAS OLFATIVAS EXCLUSIVAS
            </span>
          </div>

          <h2 className="font-serif text-[28px] sm:text-4xl lg:text-5xl font-light text-white tracking-wide">
            Explore por sensações
          </h2>

          <p className="text-[15px] sm:text-base text-[#B0A79B] font-light max-w-xl mx-auto leading-relaxed">
            Selecione uma família para visualizar as fragrâncias autorais criadas com as melhores essências da perfumaria fina.
          </p>
        </div>

        {/* 
          CARROSSEL DAS 4 FAMÍLIAS OLFATIVAS:
          1 CÍTRICOS, 2 FRUTAL, 3 AMADEIRADO, 4 GOURMAND
          - Altura: 400px no mobile (h-[400px])
          - 100% largura (w-full / min-w-full)
          - object-fit: cover
          - Texto dourado por cima
        */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 -mx-4 sm:mx-0 px-4 sm:px-0">
          {sensations.map((item, idx) => {
            const isSelected = activeSensation === item.familyFilter;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectSensation(item.familyFilter);
                  setMobileIndex(idx);
                }}
                className={`flex-none w-full min-w-full sm:min-w-0 sm:flex-1 snap-center group relative h-[400px] sm:h-[420px] rounded-sm overflow-hidden border cursor-pointer transition-all duration-500 shadow-2xl ${
                  isSelected
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/60 scale-[1.01]'
                    : 'border-[#D4AF37]/30 hover:border-[#D4AF37] hover:scale-[1.01]'
                }`}
              >
                {/* IMAGEM COM 100% LARGURA, ALTURA 400PX NO MOBILE, OBJECT-FIT: COVER */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    if (item.fallbackUrl && e.currentTarget.src !== item.fallbackUrl) {
                      e.currentTarget.src = item.fallbackUrl;
                    }
                  }}
                />

                {/* Degradê cinematográfico escuro para contraste impecável */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

                {/* Tag no Topo */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="text-[10px] tracking-[2px] uppercase font-bold text-[#D4AF37] bg-black/85 px-3 py-1.5 rounded-xs border border-[#D4AF37]/40 backdrop-blur-md shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* TEXTO DOURADO POR CIMA */}
                <div className="absolute bottom-5 inset-x-5 z-10 space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <CrownGold size={18} />
                    <span className="text-[11px] uppercase tracking-[3px] text-[#D4AF37] font-semibold">
                      ALTA FIXAÇÃO
                    </span>
                  </div>

                  <h3 className="font-serif text-[32px] sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9E29D] via-[#D4AF37] to-[#E5C464] tracking-wider uppercase drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
                    {item.name}
                  </h3>

                  <p className="text-[14px] sm:text-[15px] text-[#F3ECE0] font-light leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-sm line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[2px] uppercase text-[#D4AF37] group-hover:text-[#F9E29D] transition-colors">
                    <span>Ver perfumes {item.name.toLowerCase()}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-[#D4AF37]/50 transition-colors" />
              </div>
            );
          })}
        </div>

        {/* Indicadores no Mobile (1 a 4) */}
        <div className="sm:hidden flex items-center justify-center gap-2 pt-3">
          {sensations.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === mobileIndex ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
