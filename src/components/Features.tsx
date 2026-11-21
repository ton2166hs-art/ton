import React from 'react';
import { Droplets, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const Features: React.FC = () => {
  const pillars = [
    {
      icon: Droplets,
      title: 'Alta Concentração',
      subtitle: 'Eau de Parfum',
      description: 'Fragrâncias formuladas com alta densidade de essências nobres para projeção elegante e fixação duradoura.',
    },
    {
      icon: Sparkles,
      title: 'Dois Formatos',
      subtitle: '60ml e 15ml Pocket',
      description: '60ml (R$ 79,90) para sua presença marcante todos os dias e 15ml (R$ 29,90) para levar no bolso, bolsa ou viagem.',
    },
    {
      icon: MapPin,
      title: 'Feito em Sertãozinho',
      subtitle: 'Origem Paulista',
      description: 'Produzido com paixão e rigor artesanal no interior de São Paulo, valorizando a perfumaria autoral brasileira.',
    },
    {
      icon: CheckCircle2,
      title: 'Compra Transparente',
      subtitle: 'WhatsApp & Online',
      description: 'Feche seu pedido com PIX, cartão de crédito ou diretamente com nosso consultor no WhatsApp com total tranquilidade.',
    },
  ];

  return (
    <section className="py-14 border-b border-[#c9a84c]/15 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#141414] border border-[#c9a84c]/20 rounded-sm hover:border-[#c9a84c]/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] mb-4 group-hover:bg-[#c9a84c] group-hover:text-[#0a0a0a] transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-[10px] tracking-[2.5px] uppercase text-[#c9a84c] font-medium mb-1">
                  {item.subtitle}
                </div>
                <h3 className="font-display text-xl text-[#f4efe6] font-normal mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9e8f85] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
