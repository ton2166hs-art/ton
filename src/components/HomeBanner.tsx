import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import { LotusLogo } from './LotusLogo';

interface HomeBannerProps {
  onExplore?: () => void;
  onPocket?: () => void;
  whatsappNumber?: string;
}

export const HomeBanner: React.FC<HomeBannerProps> = ({
  onExplore,
  onPocket,
  whatsappNumber = '5516990603561',
}) => {
  const [imgError, setImgError] = useState(false);

  const cleanNum = whatsappNumber.replace(/\D/g, '') || '5516990603561';
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(
    'Olá! Vim pelo site Smell Good e gostaria de conhecer as fragrâncias oficiais de 60ml e 15ml!'
  )}`;

  return (
    <section className="relative py-8 sm:py-14 bg-[#070707] border-b border-[#D4AF37]/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] sm:text-xs tracking-[3px] uppercase font-semibold">
            <LotusLogo size={13} />
            <span>Coleção Oficial Smell Good</span>
          </div>

          <span className="hidden sm:inline-block font-body text-xs text-[#B8AF9E] tracking-[2px] uppercase font-light">
            Deixe Sua Marca · 60ml & 15ml
          </span>
        </div>

        {/* 16:9 Widescreen Luxury Banner Container */}
        <div className="relative w-full aspect-[16/9] max-h-[580px] rounded-sm overflow-hidden border border-[#D4AF37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-gradient-to-b from-[#12100B] via-[#0A0A0A] to-[#0D0D0D] group">
          {/* Double Golden Framing Border */}
          <div className="absolute inset-2 border border-[#D4AF37]/25 pointer-events-none rounded-xs z-20" />
          <div className="absolute inset-3 border border-[#D4AF37]/10 pointer-events-none rounded-xs z-20" />

          {!imgError ? (
            <img
              src="banner_smell_good_16x9.png"
              alt="Smell Good Eau de Parfum - Deixe sua Marca - Frascos 60ml e 15ml"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Luxury Fallback Composition matching the exact uploaded image */
            <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-hidden bg-gradient-to-r from-black via-[#0D0B07] to-[#14120D]">
              {/* Marble Surface Texture and Golden Highlights */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.14),transparent_60%)] pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

              {/* Top Details */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LotusLogo size={28} />
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl tracking-[6px] text-[#F5F1EB] uppercase font-normal leading-tight">
                      SMELL GOOD
                    </h3>
                    <span className="font-body text-[9px] tracking-[3px] uppercase text-[#D4AF37] block font-light">
                      EAU DE PARFUM · SERTÃOZINHO/SP
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3 text-right">
                  <span className="text-[10px] tracking-[2px] uppercase text-[#B8AF9E] font-light">
                    Alta Fixação (6h a 10h*) · Essências Nobres
                  </span>
                </div>
              </div>

              {/* Center visual composition: Box + 60ml + 15ml bottles */}
              <div className="relative z-10 my-auto flex items-end justify-center md:justify-end gap-3 sm:gap-6 pr-0 md:pr-12 py-4">
                {/* 60ml Luxury Packaging Box */}
                <div className="w-24 sm:w-32 md:w-40 aspect-[1/2] bg-gradient-to-b from-[#181818] to-[#0A0A0A] border border-[#D4AF37]/45 rounded-xs p-3 flex flex-col justify-between text-center shadow-2xl relative">
                  <div className="border border-[#D4AF37]/25 h-full p-2 flex flex-col justify-between">
                    <div>
                      <LotusLogo size={16} className="mx-auto text-[#D4AF37] mb-1" />
                      <div className="font-display text-[9px] sm:text-[11px] tracking-[2px] uppercase text-[#F5F1EB]">
                        SMELL GOOD
                      </div>
                      <div className="text-[7px] uppercase tracking-wider text-[#B8AF9E] font-light">
                        EAU DE PARFUM
                      </div>
                    </div>

                    <div>
                      <div className="font-display text-sm text-[#D4AF37] italic font-semibold">SG</div>
                      <div className="text-[6px] sm:text-[8px] uppercase tracking-[1.5px] text-[#F5F1EB] mt-0.5">
                        DEIXE SUA MARCA
                      </div>
                      <div className="text-[6px] text-[#B8AF9E] mt-1 font-light">60 ml · 2.03 FL.OZ</div>
                    </div>
                  </div>
                </div>

                {/* 60ml Bottle Photo */}
                <div className="w-28 sm:w-36 md:w-48 aspect-square relative flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/0bHKFBxf/download-10.webp"
                    alt="Smell Good 60ml Oficial"
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]"
                  />
                  <div className="absolute -bottom-2 bg-[#0A0A0A]/90 border border-[#D4AF37]/40 px-2 py-0.5 rounded-xs text-[8px] tracking-[1.5px] uppercase text-[#D4AF37]">
                    60ml · R$ 79,90
                  </div>
                </div>

                {/* 15ml Pocket Bottle Photo */}
                <div className="w-16 sm:w-20 md:w-28 aspect-square relative flex items-center justify-center pb-2">
                  <img
                    src="https://i.postimg.cc/N50rNchx/download-1.png"
                    alt="Smell Good 15ml Pocket"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)]"
                  />
                  <div className="absolute -bottom-2 bg-[#0A0A0A]/90 border border-[#D4AF37]/40 px-2 py-0.5 rounded-xs text-[8px] tracking-[1.5px] uppercase text-[#D4AF37]">
                    15ml · R$ 29,90
                  </div>
                </div>
              </div>

              {/* Bottom Tagline & CTAs */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#D4AF37]/20">
                <div>
                  <p className="font-display text-base sm:text-xl text-[#F5F1EB] font-light">
                    A elegância da alta perfumaria em <span className="text-[#D4AF37] italic">dois formatos oficiais</span>.
                  </p>
                  <p className="text-[11px] text-[#B8AF9E] font-light hidden sm:block">
                    60ml para presença marcante e 15ml Pocket para levar sempre com você.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  {onExplore && (
                    <button
                      type="button"
                      onClick={onExplore}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-[10px] sm:text-xs tracking-[2px] uppercase font-bold rounded-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ver Perfumes</span>
                    </button>
                  )}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-[#141414] hover:bg-[#1C1C1C] border border-[#D4AF37]/40 text-[#F5F1EB] text-[10px] sm:text-xs tracking-[1.5px] uppercase font-medium rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Subdued Gradient Overlay at Bottom of Banner */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
            <div className="pointer-events-auto">
              <span className="text-[9px] tracking-[2.5px] uppercase text-[#D4AF37] font-semibold block mb-0.5">
                Alta Perfumaria Artesanal
              </span>
              <h4 className="font-display text-lg sm:text-2xl text-[#F5F1EB] font-normal tracking-wide">
                Deixe Sua Marca com Smell Good
              </h4>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {onExplore && (
                <button
                  type="button"
                  onClick={onExplore}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-[10px] sm:text-xs tracking-[2px] uppercase font-bold rounded-xs transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explorar Coleção</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onPocket && (
                <button
                  type="button"
                  onClick={onPocket}
                  className="px-3.5 py-2 bg-black/80 hover:bg-black border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] sm:text-xs tracking-[1.5px] uppercase font-semibold rounded-xs transition-all cursor-pointer backdrop-blur-xs"
                >
                  Linha Pocket 15ml
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
