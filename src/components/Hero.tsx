import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck, Droplets, Zap } from 'lucide-react';
import { SmellGoodBottle } from './SmellGoodBottle';
import { LotusLogo } from './LotusLogo';

interface HeroProps {
  onExplore: () => void;
  onPocket: () => void;
  onOpenAiConsultant?: () => void;
  onBuyDefault?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onPocket,
  onOpenAiConsultant,
  onBuyDefault,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#12100B] to-[#0A0A0A] border-b border-[#D4AF37]/20 py-14 sm:py-20 lg:py-24">
      {/* Golden Ray & Ambient Luxury Glow on Black Marble */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            {/* Lotus & Origin Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] sm:text-xs tracking-[3px] uppercase font-semibold">
              <LotusLogo className="w-3.5 h-3.5" />
              <span>Sertãozinho · Brasil · Alta Fixação</span>
            </div>

            {/* Main Headline: "Smell Good" grande com 8px de espaçamento e peso 400 */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[8px] text-[#F5F1EB] uppercase leading-none">
                SMELL GOOD
              </h1>
              {/* "Perfumaria artesanal com curadoria editorial" */}
              <p className="font-display text-xl sm:text-2xl lg:text-3xl text-[#D4AF37] italic font-normal tracking-[0.04em]">
                Perfumaria artesanal com curadoria editorial
              </p>
            </div>

            {/* Quote: "A elegância é a única beleza que nunca desaparece" */}
            <div className="flex justify-center lg:justify-start">
              <div className="border-l-2 border-[#D4AF37] pl-4 py-1 text-left">
                <p className="font-display text-sm sm:text-base text-[#F5F1EB] italic font-normal tracking-wide">
                  &ldquo;A elegância é a única beleza que nunca desaparece.&rdquo;
                </p>
                <span className="font-body text-[10px] tracking-[2px] uppercase text-[#B8AF9E] block mt-0.5 font-light">
                  Inspirações de Grifes Internacionais · Sertãozinho/SP
                </span>
              </div>
            </div>

            {/* Short impactful luxury phrase */}
            <p className="font-display text-base sm:text-xl lg:text-2xl text-[#F5F1EB] font-light tracking-[0.04em] max-w-2xl mx-auto lg:mx-0">
              Fragrâncias que marcam presença. Fixação que permanece.
            </p>

            {/* Minimalist badges without prices */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <span className="font-body text-xs sm:text-sm tracking-[2px] uppercase text-[#D4AF37] font-light">
                • Disponível em 60ml
              </span>
              <span className="font-body text-xs sm:text-sm tracking-[2px] uppercase text-[#D4AF37] font-light">
                • Disponível em 15ml Pocket
              </span>
            </div>

            {/* CTAs with explicit Botão dourado: EXPLORAR COLEÇÃO */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-xs tracking-[3px] uppercase font-bold transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 shadow-lg rounded-xs"
              >
                <span>EXPLORAR COLEÇÃO</span>
                <ArrowRight className="w-4 h-4 text-[#0A0A0A]" />
              </button>

              {onOpenAiConsultant && (
                <button
                  onClick={onOpenAiConsultant}
                  className="w-full sm:w-auto px-6 py-4 bg-[#121212] hover:bg-[#1A1A1A] text-[#F5F1EB] border border-[#D4AF37]/45 hover:border-[#D4AF37] text-xs tracking-[2px] uppercase font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 rounded-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Consultor IA</span>
                </button>
              )}

              <button
                onClick={onPocket}
                className="w-full sm:w-auto px-5 py-4 bg-transparent hover:bg-white/5 text-[#B8AF9E] hover:text-[#F5F1EB] text-xs tracking-[2px] uppercase font-medium transition-all cursor-pointer rounded-xs"
              >
                Linha Pocket 15ml
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 border-t border-[#D4AF37]/15 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Droplets className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[11px] text-[#B8AF9E] font-light">Eau de Parfum · Alta Fixação</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[11px] text-[#B8AF9E] font-light">Sertãozinho · Brasil</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[11px] text-[#B8AF9E] font-light">Envio ou Retirada</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Column:
              Foto da caixa preta e frasco 60ml em mármore preto com luz dourada */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              {/* Inner Decorative Golden Border */}
              <div className="absolute inset-2 border border-[#D4AF37]/35 pointer-events-none rounded-xs z-20" />
              <div className="absolute -inset-1 border border-[#D4AF37]/15 pointer-events-none rounded-xs z-20" />

              {/* SmellGood Official Standard Bottle 60ml Photo */}
              <img
                src="https://i.postimg.cc/0bHKFBxf/download-10.webp"
                alt="Smell Good Frasco Oficial 60ml"
                className="w-full h-full object-contain p-4 rounded-xs shadow-2xl relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Sensual Luxury Badge Over Image */}
              <div className="absolute bottom-5 right-5 z-20 bg-[#0A0A0A]/95 backdrop-blur-md border border-[#D4AF37]/50 px-4 py-2 text-right shadow-2xl rounded-xs">
                <div className="flex items-center gap-1.5 justify-end mb-0.5">
                  <LotusLogo size={12} />
                  <span className="text-[8px] tracking-[2px] uppercase text-[#D4AF37] font-semibold">
                    Alta Perfumaria
                  </span>
                </div>
                <span className="font-display text-sm sm:text-base text-[#F5F1EB] font-normal block">
                  Sensual e Envolvente
                </span>
                <span className="text-[9px] text-[#D4AF37] block font-light">
                  Elegância Atemporal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
