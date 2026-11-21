import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { CrownGold } from './CrownGold';

interface KingHeroSliderProps {
  onExplore: () => void;
  onPocket: () => void;
}

export const KingHeroSlider: React.FC<KingHeroSliderProps> = ({
  onExplore,
  onPocket,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    // BANNER 1: SMELL GOOD - ALTA FIXAÇÃO
    {
      id: 'le-beau-gold',
      badge: 'THE KING OF SCENTS',
      title: 'SMELL GOOD',
      highlight: 'ALTA FIXAÇÃO 6H À 10H',
      subtitle: 'Eau de Parfum de alta concentração com essências nobres e fixação duradoura na pele.',
      ctaText: 'Conheça agora',
      ctaAction: onExplore,
      bgImg: '/images/smellgood-ref05-official.webp',
      fallbackImg: 'https://i.postimg.cc/zybHrFXd/download-(4).webp',
    },
    // BANNER 2: MAIS QUE PERFUME, UMA IDENTIDADE (FULL-WIDTH TRUE)
    {
      id: 'identity-gold',
      badge: 'THE KING OF SCENTS',
      title: 'MAIS QUE PERFUME,',
      highlight: 'UMA IDENTIDADE',
      subtitle: 'Fragrâncias marcantes inspiradas nos maiores clássicos da perfumaria internacional.',
      ctaText: 'Conheça agora',
      ctaAction: onExplore,
      bgImg: '/images/smellgood-ref08-official.webp',
      fallbackImg: 'https://i.postimg.cc/ppdn0HNR/download-(21).webp',
    },
    // BANNER 3: LINHA POCKET 15ML (FULL-WIDTH TRUE - SEM BOX, SEM CARD, SEM RECORTE)
    {
      id: 'pocket-15ml',
      badge: 'EDIÇÃO BOLSO & VIAGEM',
      title: 'LINHA POCKET 15ML',
      highlight: 'POR APENAS R$ 29,90',
      subtitle: 'Leve sua assinatura olfativa no bolso ou na bolsa para qualquer lugar.',
      ctaText: 'Ver Pockets',
      ctaAction: onPocket,
      bgImg: '/images/smellgood-splash-gold.webp',
      fallbackImg: 'https://i.postimg.cc/SjdM7KPF/download-(27).webp',
    },
  ];

  // Auto-play a cada 6 segundos
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Suporte a swipe no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-screen left-1/2 right-1/2 -mx-[50vw] h-[500px] overflow-hidden select-none bg-black"
      style={{ width: '100vw', height: '500px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, idx) => {
        const isActive = idx === currentSlide;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            } bg-black`}
            style={{ width: '100vw', height: '500px' }}
          >
            {/* 
              BANNER FULL-WIDTH TRUE:
              - CSS: width: 100vw; height: 500px; object-fit: cover; background-position: center;
              - ZERO box, ZERO card, ZERO border-radius, ZERO padding lateral
              - A foto do frasco preto SMELL GOOD PREENCHE 100% DA LARGURA
            */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={slide.bgImg}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.1] transform scale-105 transition-transform duration-1000"
                style={{ width: '100vw', height: '500px', objectFit: 'cover', objectPosition: 'center' }}
                onError={(e) => {
                  e.currentTarget.src = slide.fallbackImg;
                }}
              />

              {/* Degradê cinematográfico escuro para leitura impecável */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/85" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/75" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* TEXTO POR CIMA COM SOMBRA - CENTRALIZADO IGUAL KING OF PARFUMS */}
            <div className="relative z-10 w-full h-full max-w-4xl mx-auto px-5 sm:px-8 flex flex-col items-center justify-center text-center space-y-3.5 sm:space-y-4">
              
              {/* Coroa Dourada Real */}
              <div className="flex justify-center drop-shadow-md">
                <CrownGold size={34} />
              </div>

              {/* Kicker / Badge */}
              <span className="text-[11px] sm:text-xs tracking-[3.5px] uppercase font-bold text-[#D4AF37] drop-shadow-sm">
                {slide.badge}
              </span>

              {/* Título Principal com Tipografia Grande para Mobile (mínimo 28px no mobile!) */}
              <h1 className="font-serif text-[28px] sm:text-5xl lg:text-6xl font-light text-white tracking-wider uppercase leading-tight drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)]">
                {slide.title} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9E29D] via-[#D4AF37] to-[#E5C464]">
                  {slide.highlight}
                </span>
              </h1>

              {/* Subtítulo 16px no mobile com sombra */}
              <p className="text-[15px] sm:text-[17px] text-[#EAE4D8] font-light max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {slide.subtitle}
              </p>

              {/* Botão Dourado com Sombra */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={slide.ctaAction}
                  className="inline-flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C464] to-[#C59B27] hover:from-[#F9E29D] hover:to-[#D4AF37] text-[#0A0A0A] text-xs sm:text-sm font-bold uppercase tracking-[2px] rounded-xs shadow-[0_6px_25px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0A0A]" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Setas Laterais Discretas */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37]/40 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37]/40 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicadores em Barras Douradas */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              i === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Ir para banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
