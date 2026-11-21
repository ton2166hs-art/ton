import React, { useState } from 'react';
import { X, Sparkles, Wand2, Compass, ArrowRight, Check, Droplets, Clock, Zap } from 'lucide-react';
import { Product, PerfumeSize } from '../types';
import { LotusLogo } from './LotusLogo';
import { SmellGoodBottle } from './SmellGoodBottle';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onBuyNow: (product: Product, size: PerfumeSize) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  products,
  onBuyNow,
  onOpenProductDetail,
}) => {
  const [gender, setGender] = useState<'todos' | 'masculina' | 'feminina'>('todos');
  const [occasion, setOccasion] = useState<string>('noite');
  const [vibe, setVibe] = useState<string>('marcante');
  const [promptInput, setPromptInput] = useState<string>('');
  const [isConsulting, setIsConsulting] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<{
    product: Product;
    matchScore: number;
    editorialReason: string;
  }[] | null>(null);

  if (!isOpen) return null;

  const handleConsult = () => {
    setIsConsulting(true);

    setTimeout(() => {
      // Intelligent Sommelier Matching Algorithm
      const pool = products.filter((p) => {
        if (gender === 'todos') return true;
        return p.category === gender;
      });

      const scored = pool.map((product) => {
        let score = 70;
        const textToSearch = `${product.name} ${product.description} ${product.notes?.family || ''} ${
          product.notes?.occasion || ''
        } ${product.notes?.intensity || ''} ${product.notes?.top || ''} ${product.notes?.heart || ''} ${
          product.notes?.base || ''
        }`.toLowerCase();

        // Occasion scoring
        if (occasion === 'noite' && (textToSearch.includes('noite') || textToSearch.includes('festa') || textToSearch.includes('intenso'))) {
          score += 15;
        } else if (occasion === 'dia' && (textToSearch.includes('dia') || textToSearch.includes('fresco') || textToSearch.includes('trabalho'))) {
          score += 15;
        } else if (occasion === 'romantico' && (textToSearch.includes('romântico') || textToSearch.includes('sedut') || textToSearch.includes('baunilha') || textToSearch.includes('rosa'))) {
          score += 15;
        }

        // Vibe scoring
        if (vibe === 'marcante' && (textToSearch.includes('intenso') || textToSearch.includes('amadeirado') || textToSearch.includes('oriental'))) {
          score += 12;
        } else if (vibe === 'fresco' && (textToSearch.includes('fresco') || textToSearch.includes('marinho') || textToSearch.includes('cítrico'))) {
          score += 12;
        } else if (vibe === 'elegante' && (textToSearch.includes('elegân') || textToSearch.includes('clássico') || textToSearch.includes('chipre') || textToSearch.includes('floral'))) {
          score += 12;
        }

        // Custom search terms if user entered text
        if (promptInput.trim()) {
          const terms = promptInput.toLowerCase().split(/\s+/);
          terms.forEach((t) => {
            if (t.length > 2 && textToSearch.includes(t)) {
              score += 10;
            }
          });
        }

        // Editorial Sommelier reason
        const editorialReason = `Harmoniza a potência ${product.notes?.family || 'olfativa nobre'} com alta fixação de 6h a 10h*. Suas notas de ${product.notes?.heart || 'corpo refinado'} traduzem perfeitamente o perfil ${vibe} desejado para ${occasion === 'noite' ? 'a noite' : occasion === 'dia' ? 'o dia' : 'momentos especiais'}.`;

        return {
          product,
          matchScore: Math.min(score, 99),
          editorialReason,
        };
      });

      scored.sort((a, b) => b.matchScore - a.matchScore);
      setRecommendations(scored.slice(0, 3));
      setIsConsulting(false);
    }, 600);
  };

  const handleReset = () => {
    setRecommendations(null);
    setPromptInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0A0A0A] border border-[#D4AF37]/35 rounded-sm p-6 sm:p-8 text-[#F5F1EB] shadow-[0_0_50px_rgba(212,175,55,0.15)] my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#B8AF9E] hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5"
          aria-label="Fechar Consultor IA"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] tracking-[3px] uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Consultoria Olfativa Smell Good</span>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <LotusLogo size={24} />
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-[#F5F1EB] tracking-wide">
              Consultor <em className="italic text-[#D4AF37] font-normal">IA</em>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#B8AF9E] max-w-lg mx-auto font-light">
            Descubra sua assinatura olfativa perfeita entre nossas 46 inspirações de grifes internacionais de alta fixação.
          </p>
        </div>

        {!recommendations ? (
          /* Selection Step */
          <div className="space-y-6">
            {/* Gender Selection */}
            <div>
              <label className="block text-xs uppercase tracking-[2px] text-[#D4AF37] font-medium mb-2.5">
                1. Linha Desejada
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'todos', label: 'Toda Coleção' },
                  { id: 'masculina', label: 'Masculino' },
                  { id: 'feminina', label: 'Feminino' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id as any)}
                    className={`py-2.5 px-3 rounded-sm border text-xs tracking-[1px] uppercase font-medium transition-all ${
                      gender === g.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                        : 'border-white/10 bg-[#121212] text-[#B8AF9E] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Selection */}
            <div>
              <label className="block text-xs uppercase tracking-[2px] text-[#D4AF37] font-medium mb-2.5">
                2. Momento de Uso
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'noite', label: 'Noite & Eventos' },
                  { id: 'dia', label: 'Dia & Trabalho' },
                  { id: 'romantico', label: 'Encontros' },
                ].map((occ) => (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setOccasion(occ.id)}
                    className={`py-2.5 px-3 rounded-sm border text-xs tracking-[1px] uppercase font-medium transition-all ${
                      occasion === occ.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                        : 'border-white/10 bg-[#121212] text-[#B8AF9E] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe Selection */}
            <div>
              <label className="block text-xs uppercase tracking-[2px] text-[#D4AF37] font-medium mb-2.5">
                3. Sensação Desejada
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'marcante', label: 'Marcante & Intenso' },
                  { id: 'fresco', label: 'Fresco & Revigorante' },
                  { id: 'elegante', label: 'Elegante & Sofisticado' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVibe(v.id)}
                    className={`py-2.5 px-3 rounded-sm border text-xs tracking-[1px] uppercase font-medium transition-all ${
                      vibe === v.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                        : 'border-white/10 bg-[#121212] text-[#B8AF9E] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Free text */}
            <div>
              <label className="block text-xs uppercase tracking-[2px] text-[#D4AF37] font-medium mb-2">
                4. Detalhes Adicionais (Opcional)
              </label>
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ex: Gosto de notas amadeiradas, baunilha ou estilo Sauvage..."
                className="w-full px-4 py-3 bg-[#121212] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#F5F1EB] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none rounded-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleConsult}
              disabled={isConsulting}
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-xs uppercase tracking-[3px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)] rounded-sm"
            >
              {isConsulting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-[#0A0A0A]" />
                  <span>Curando Fragrâncias Ideais...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-[#0A0A0A]" />
                  <span>Gerar Recomendação do Sommelier</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs tracking-[2px] uppercase text-[#D4AF37] font-medium">
                3 Fragrâncias Selecionadas Para Você
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-[#B8AF9E] hover:text-[#D4AF37] underline transition-colors cursor-pointer"
              >
                Refazer consulta
              </button>
            </div>

            <div className="space-y-4">
              {recommendations.map(({ product, matchScore, editorialReason }, idx) => (
                <div
                  key={product.id}
                  className="bg-[#121212] border border-[#D4AF37]/30 p-4 sm:p-5 rounded-sm hover:border-[#D4AF37] transition-all grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Bottle Visual */}
                  <div className="sm:col-span-3 flex justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28">
                      <SmellGoodBottle
                        name={product.name}
                        numberCode={product.ref || product.numberCode}
                        size="60ml"
                        family={product.family || product.notes?.family}
                        category={product.category}
                        className="rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="sm:col-span-6 space-y-1.5 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="font-body text-[10px] tracking-[2px] uppercase px-2 py-0.5 rounded-xs bg-[#D4AF37]/20 text-[#D4AF37] font-medium">
                        REF {product.ref || product.numberCode || (idx + 1)}
                      </span>
                      <span className="font-body text-[10px] tracking-[1.5px] uppercase text-emerald-400 font-light">
                        {matchScore}% Afinidade
                      </span>
                    </div>

                    <h4 className="font-display text-lg sm:text-xl font-normal tracking-[0.05em] text-[#F5F1EB]">
                      {product.refFormatted || (product.numberCode ? `REF ${product.numberCode} - ${product.name}` : product.name)}
                    </h4>

                    <p className="font-body text-[11px] text-[#B8AF9E] font-light leading-relaxed line-clamp-2">
                      {editorialReason}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[10px] text-[#B8AF9E]">
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-[#D4AF37]" />
                        {product.notes?.family || 'Eau de Parfum'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        Alta Fixação
                      </span>
                    </div>
                  </div>

                  {/* Buy Buttons */}
                  <div className="sm:col-span-3 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onBuyNow(product, '60ml');
                        onClose();
                      }}
                      className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-[11px] tracking-[2px] uppercase font-bold transition-all rounded-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Zap className="w-3 h-3 fill-current" />
                      <span>Comprar 60ml · R$ 79,90</span>
                    </button>

                    <button
                      onClick={() => {
                        onBuyNow(product, '15ml');
                        onClose();
                      }}
                      className="w-full py-2 bg-[#1A1A1A] hover:bg-[#222] border border-[#D4AF37]/35 text-[#F5F1EB] text-[10px] tracking-[1.5px] uppercase font-medium transition-all rounded-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>15ml Pocket · R$ 29,90</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenProductDetail(product);
                        onClose();
                      }}
                      className="text-center text-[10px] text-[#B8AF9E] hover:text-[#D4AF37] underline transition-colors cursor-pointer pt-0.5"
                    >
                      Ver pirâmide olfativa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs tracking-[2px] uppercase text-[#B8AF9E] hover:text-[#F5F1EB] transition-colors"
              >
                Voltar à Loja
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
