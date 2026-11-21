import React from 'react';

interface MarqueeProps {
  text?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text = 'THE KING OF SCENTS ◆ SMELL GOOD ◆ ALTA FIXAÇÃO GARANTIDA 6H À 10H ◆ FRETE GRÁTIS ACIMA DE R$ 120 ◆ ATENDIMENTO WHATSAPP (16) 99060-3561 ◆ ENVIOS PARA TODO BRASIL ◆ ',
}) => {
  return (
    <div className="bg-[#100f0c] border-b border-[#c9a84c]/20 py-2 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[#c9a84c] font-medium pr-12">
          {text}
        </span>
        <span className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[#c9a84c] font-medium pr-12">
          {text}
        </span>
        <span className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[#c9a84c] font-medium pr-12">
          {text}
        </span>
      </div>
    </div>
  );
};
