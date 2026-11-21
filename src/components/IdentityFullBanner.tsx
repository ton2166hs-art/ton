import React from 'react';
import { CrownGold } from './CrownGold';
import { ArrowRight } from 'lucide-react';

interface IdentityFullBannerProps {
  onExplore: () => void;
}

export const IdentityFullBanner: React.FC<IdentityFullBannerProps> = ({ onExplore }) => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] h-[400px] sm:h-[500px] overflow-hidden bg-black select-none border-y border-[#D4AF37]/25">
      {/* IMAGEM DO NOSSO FRASCO ATUAL QUADRADO PRETO FOSCO COM TAMPA DOURADA E LOGO SG */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/smellgood-ref08-official.webp"
          alt="SMELL GOOD - Nosso Frasco Oficial"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] transform scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://i.postimg.cc/ppdn0HNR/download-(21).webp';
          }}
        />
        {/* Iluminação de estúdio dourada e degradê escuro para contraste cinematográfico */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* CONTEÚDO CENTRALIZADO POR CIMA DA IMAGEM */}
      <div className="relative z-10 w-full h-full max-w-4xl mx-auto px-5 sm:px-8 flex flex-col items-center justify-center text-center space-y-4">
        
        {/* Coroa Dourada Centralizada */}
        <div className="flex justify-center drop-shadow-md">
          <CrownGold size={32} />
        </div>

        {/* Badge / Kicker */}
        <span className="text-[11px] sm:text-xs tracking-[3.5px] uppercase font-bold text-[#D4AF37] drop-shadow-sm">
          THE KING OF SCENTS
        </span>

        {/* TEXTO PRINCIPAL: 28px NO MOBILE (EXATAMENTE COMO SOLICITADO) */}
        <h2 className="font-serif text-[28px] sm:text-5xl lg:text-6xl font-light text-white tracking-wider uppercase leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          MAIS QUE PERFUME, UMA IDENTIDADE
        </h2>

        {/* Subtítulo com tipografia 16px no mobile */}
        <p className="text-[15px] sm:text-[17px] text-[#E5DFD3] font-light max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Fragrâncias marcantes de alta fixação (6h a 10h*) inspiradas nos maiores clássicos da perfumaria mundial.
        </p>

        {/* Botão Dourado Sofisticado "Conheça agora" */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex items-center gap-2.5 px-7 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C464] to-[#C59B27] hover:from-[#F9E29D] hover:to-[#D4AF37] text-[#0A0A0A] text-xs sm:text-sm font-bold uppercase tracking-[2px] rounded-xs shadow-[0_6px_25px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <span>Conheça agora</span>
            <ArrowRight className="w-4 h-4 text-[#0A0A0A]" />
          </button>
        </div>
      </div>
    </section>
  );
};
