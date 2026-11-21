import React from 'react';
import { Award, Compass, Heart, MapPin, Sparkles } from 'lucide-react';
import { SmellGoodBottle } from './SmellGoodBottle';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 sm:py-28 bg-[#0A0A0A] border-b border-[#D4AF37]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column with Official Bottle Standard */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-sm overflow-hidden border border-[#D4AF37]/35 bg-[#070707] shadow-2xl group">
              <img
                src="/images/smellgood-splash-gold.webp"
                alt="Frasco Oficial SMELL GOOD - Frasco Atual com Splash Dourado"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://i.postimg.cc/SjdM7KPF/download-(27).webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 bg-[#0A0A0A]/90 backdrop-blur-md p-3.5 border border-[#D4AF37]/35 z-20">
                <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] tracking-[2px] uppercase font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sertãozinho · Brasil</span>
                </div>
                <p className="font-body text-xs text-[#F5F1EB] font-light">
                  Feito com respeito à tradição da alta perfumaria e ao tempo de maceração ideal.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[3px] text-[#D4AF37] uppercase font-light">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nossa Filosofia</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#F5F1EB] leading-tight">
              A Arte da Perfumaria <br />
              <em className="italic text-[#D4AF37] font-normal">Artesanal e Acessível</em>
            </h2>

            <p className="font-body text-xs sm:text-base text-[#B8AF9E] font-light leading-relaxed">
              A <strong className="font-display font-normal text-[#F5F1EB] tracking-[4px]">SMELL GOOD</strong> nasceu da convicção de que um perfume extraordinário não deve ser um privilégio distante, mas sim uma assinatura sensorial diária.
            </p>

            <p className="font-body text-xs sm:text-sm text-[#B8AF9E] font-light leading-relaxed">
              Cada lote de nossas fragrâncias é preparado artesanalmente em <strong className="text-[#F5F1EB] font-normal">Sertãozinho/SP</strong>, com matérias-primas de procedência certificada e formulações na concentração Eau de Parfum. Isso garante que a nota de saída encante no primeiro borrifo e as notas de fundo permaneçam com você por horas.
            </p>

            {/* Quote box */}
            <div className="p-6 bg-[#141414] border-l-2 border-[#D4AF37] border-y border-r border-[#D4AF37]/20 rounded-r-xs">
              <p className="font-display text-lg sm:text-xl italic text-[#F5F1EB] font-normal">
                &ldquo;O perfume é a forma mais intensa da memória. Criamos frascos que eternizam momentos e destacam quem você verdadeiramente é.&rdquo;
              </p>
              <span className="font-display block text-[10px] tracking-[4px] uppercase text-[#D4AF37] font-normal mt-3">
                — Curadoria SMELL GOOD
              </span>
            </div>

            {/* Badges row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-3 bg-[#111] border border-white/5 text-center">
                <span className="font-display text-2xl text-[#c9a84c]">51+</span>
                <span className="block text-[10px] tracking-[1.5px] uppercase text-[#9e8f85]">Fragrâncias</span>
              </div>
              <div className="p-3 bg-[#111] border border-white/5 text-center">
                <span className="font-display text-2xl text-[#c9a84c]">100%</span>
                <span className="block text-[10px] tracking-[1.5px] uppercase text-[#9e8f85]">Artesanal</span>
              </div>
              <div className="p-3 bg-[#111] border border-white/5 text-center col-span-2 sm:col-span-1">
                <span className="font-display text-2xl text-[#c9a84c]">2</span>
                <span className="block text-[10px] tracking-[1.5px] uppercase text-[#9e8f85]">Tamanhos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
