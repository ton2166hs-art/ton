import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Wand2, Droplets, Clock, Zap, RotateCcw } from 'lucide-react';
import { Product, PerfumeSize } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { LotusLogo } from './LotusLogo';
import { SmellGoodBottle } from './SmellGoodBottle';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onBuyNow: (product: Product, size: PerfumeSize) => void;
  onOpenProductDetail: (product: Product) => void;
}

interface RecommendationItem {
  product: Product;
  matchScore: number;
  matchedCriteria: string[];
  editorialReason: string;
}

function normalizeText(value?: string): string {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  products,
  onBuyNow,
  onOpenProductDetail,
}) => {
  const [gender, setGender] = useState<'todos' | 'masculino' | 'feminino'>('todos');
  const [occasion, setOccasion] = useState<'noite' | 'dia' | 'romantico'>('noite');
  const [vibe, setVibe] = useState<'marcante' | 'fresco' | 'doce' | 'elegante'>('marcante');
  const [promptInput, setPromptInput] = useState<string>('');
  const [recommendations, setRecommendations] = useState<RecommendationItem[] | null>(null);

  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalScrollRef.current?.scrollTo({ top: 0 });
    }
  }, [isOpen, recommendations]);

  if (!isOpen) return null;

  const catalog = products && products.length > 0 ? products : INITIAL_PRODUCTS;

  const handleConsult = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // 1. Filtragem por categoria (gênero)
    const categoryPool = catalog.filter((p) => {
      if (gender === 'todos') return true;
      const cat = normalizeText(p.category);
      if (gender === 'masculino') {
        return cat === 'masculino' || cat === 'masculina' || cat === 'unissex';
      }
      return cat === 'feminino' || cat === 'feminina' || cat === 'unissex';
    });

    const pool = categoryPool.length > 0 ? categoryPool : catalog;

    // Termos extras digitados pelo usuário
    const customTerms = normalizeText(promptInput)
      .split(/[\s,;]+/)
      .filter((t) => t.length > 2);

    // 2. Filtragem e ranqueamento por notas olfativas, família, ocasião e termos livres
    const evaluated: Array<RecommendationItem & { matchedVibe: boolean; matchedOccasion: boolean; matchedCustom: boolean }> =
      pool.map((product) => {
        let score = 62;
        const matchedCriteria: string[] = [];

        const familyText = normalizeText(`${product.family || ''} ${product.notes?.family || ''}`);
        const occasionText = normalizeText(product.notes?.occasion || '');
        const intensityText = normalizeText(product.notes?.intensity || '');
        const notesText = normalizeText(
          `${product.notes?.top || ''} ${product.notes?.heart || ''} ${product.notes?.base || ''}`
        );
        const fullText = normalizeText(
          `${product.ref || ''} ${product.numberCode || ''} ${product.name || ''} ${
            product.fictionalName || ''
          } ${product.genericInspiration || ''} ${product.titleFormatted || ''} ${
            product.description || ''
          } ${familyText} ${occasionText} ${intensityText} ${notesText}`
        );

        let matchedOccasion = false;
        if (occasion === 'noite') {
          if (
            occasionText.includes('noite') ||
            occasionText.includes('festa') ||
            intensityText.includes('intenso') ||
            intensityText.includes('marcante') ||
            familyText.includes('oriental')
          ) {
            matchedOccasion = true;
            score += occasionText.includes('noite') || occasionText.includes('festa') ? 15 : 9;
            matchedCriteria.push('Ideal para Noite');
          }
        } else if (occasion === 'dia') {
          if (
            occasionText.includes('dia') ||
            occasionText.includes('trabalho') ||
            familyText.includes('citrico') ||
            familyText.includes('aquatico') ||
            familyText.includes('aromatico')
          ) {
            matchedOccasion = true;
            score += occasionText.includes('dia') || occasionText.includes('trabalho') ? 15 : 9;
            matchedCriteria.push('Ideal para o Dia');
          }
        } else if (occasion === 'romantico') {
          if (
            fullText.includes('romantic') ||
            fullText.includes('sedut') ||
            fullText.includes('baunilha') ||
            fullText.includes('rosa') ||
            fullText.includes('doce') ||
            familyText.includes('gourmand') ||
            familyText.includes('floral') ||
            occasionText.includes('noite')
          ) {
            matchedOccasion = true;
            score += 15;
            matchedCriteria.push('Encontros & Sedução');
          }
        }

        let matchedVibe = false;
        if (vibe === 'marcante') {
          if (
            intensityText.includes('intenso') ||
            familyText.includes('amadeirado') ||
            familyText.includes('oriental') ||
            notesText.includes('madeira') ||
            notesText.includes('cedro') ||
            notesText.includes('oud') ||
            notesText.includes('couro') ||
            notesText.includes('ambar') ||
            fullText.includes('especiado')
          ) {
            matchedVibe = true;
            score += 15;
            matchedCriteria.push('Notas Intensas & Amadeiradas');
          }
        } else if (vibe === 'fresco') {
          if (
            familyText.includes('citrico') ||
            familyText.includes('aquatico') ||
            familyText.includes('aromatico') ||
            familyText.includes('vetiver') ||
            notesText.includes('bergamota') ||
            notesText.includes('limao') ||
            notesText.includes('hortela') ||
            notesText.includes('marinho') ||
            fullText.includes('fresco')
          ) {
            matchedVibe = true;
            score += 15;
            matchedCriteria.push('Notas Frescas & Cítricas');
          }
        } else if (vibe === 'doce') {
          if (
            familyText.includes('doce') ||
            familyText.includes('gourmand') ||
            notesText.includes('baunilha') ||
            notesText.includes('caramelo') ||
            notesText.includes('mel') ||
            notesText.includes('tonka') ||
            notesText.includes('praline') ||
            fullText.includes('frutal')
          ) {
            matchedVibe = true;
            score += 15;
            matchedCriteria.push('Notas Doces & Envolventes');
          }
        } else if (vibe === 'elegante') {
          if (
            familyText.includes('floral') ||
            familyText.includes('chipre') ||
            notesText.includes('rosa') ||
            notesText.includes('jasmim') ||
            notesText.includes('almiscar') ||
            notesText.includes('sandalo') ||
            notesText.includes('iris') ||
            fullText.includes('elegan') ||
            fullText.includes('sofistic')
          ) {
            matchedVibe = true;
            score += 15;
            matchedCriteria.push('Elegância Floral & Sofisticada');
          }
        }

        let matchedCustom = false;
        if (customTerms.length > 0) {
          let hits = 0;
          customTerms.forEach((term) => {
            if (fullText.includes(term)) {
              hits += 1;
              score += 10;
            }
          });
          if (hits > 0) {
            matchedCustom = true;
            matchedCriteria.push('Combina com sua busca');
          }
        }

        const occasionLabel =
          occasion === 'noite'
            ? 'a noite e eventos'
            : occasion === 'dia'
            ? 'o dia a dia e trabalho'
            : 'encontros especiais';

        const notesHighlight =
          product.notes?.heart || product.notes?.top || product.notes?.base || 'acordes refinados';

        const editorialReason = `Família ${
          product.notes?.family || product.family || 'olfativa nobre'
        } com alta fixação de 6h a 10h*. Notas em destaque: ${notesHighlight} — combinação ideal para ${occasionLabel}.`;

        return {
          product,
          matchScore: Math.min(score, 99),
          matchedCriteria,
          editorialReason,
          matchedVibe,
          matchedOccasion,
          matchedCustom,
        };
      });

    // Prioriza os produtos que realmente filtram pelas preferências (notas + ocasião + busca)
    const strictMatches = evaluated.filter((item) =>
      customTerms.length > 0
        ? (item.matchedVibe || item.matchedOccasion) && item.matchedCustom
        : item.matchedVibe && item.matchedOccasion
    );

    const broadMatches = evaluated.filter((item) => item.matchedVibe || item.matchedOccasion || item.matchedCustom);

    const chosenPool =
      strictMatches.length >= 3
        ? strictMatches
        : broadMatches.length > 0
        ? broadMatches
        : evaluated;

    const sorted = [...chosenPool].sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(
      sorted.slice(0, 4).map(({ product, matchScore, matchedCriteria, editorialReason }) => ({
        product,
        matchScore,
        matchedCriteria,
        editorialReason,
      }))
    );
  };

  const handleReset = () => {
    setRecommendations(null);
    setPromptInput('');
  };

  const genderLabel =
    gender === 'todos' ? 'Toda Coleção' : gender === 'masculino' ? 'Masculino' : 'Feminino';
  const occasionLabel =
    occasion === 'noite' ? 'Noite & Eventos' : occasion === 'dia' ? 'Dia & Trabalho' : 'Encontros';
  const vibeLabel =
    vibe === 'marcante'
      ? 'Marcante & Intenso'
      : vibe === 'fresco'
      ? 'Fresco & Cítrico'
      : vibe === 'doce'
      ? 'Doce & Sedutor'
      : 'Elegante & Floral';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={modalScrollRef}
        className="relative w-full max-w-3xl bg-[#0A0A0A] border border-[#D4AF37]/35 rounded-sm p-5 sm:p-8 text-[#F5F1EB] shadow-[0_0_50px_rgba(212,175,55,0.15)] my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-[#B8AF9E] hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5 cursor-pointer"
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
            Descubra sua assinatura olfativa perfeita entre nossas {catalog.length} fragrâncias autorais de alta fixação.
          </p>
        </div>

        {!recommendations ? (
          /* Selection Step */
          <form onSubmit={handleConsult} className="space-y-6">
            {/* Gender Selection */}
            <div>
              <label className="block text-xs uppercase tracking-[2px] text-[#D4AF37] font-medium mb-2.5">
                1. Linha Desejada
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { id: 'todos', label: 'Toda Coleção' },
                  { id: 'masculino', label: 'Masculino' },
                  { id: 'feminino', label: 'Feminino' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id as 'todos' | 'masculino' | 'feminino')}
                    className={`py-2.5 px-2 sm:px-3 rounded-sm border text-[11px] sm:text-xs tracking-[1px] uppercase font-medium transition-all cursor-pointer ${
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
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { id: 'noite', label: 'Noite & Eventos' },
                  { id: 'dia', label: 'Dia & Trabalho' },
                  { id: 'romantico', label: 'Encontros' },
                ].map((occ) => (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setOccasion(occ.id as 'noite' | 'dia' | 'romantico')}
                    className={`py-2.5 px-2 sm:px-3 rounded-sm border text-[11px] sm:text-xs tracking-[1px] uppercase font-medium transition-all cursor-pointer ${
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {[
                  { id: 'marcante', label: 'Marcante & Intenso' },
                  { id: 'fresco', label: 'Fresco & Cítrico' },
                  { id: 'doce', label: 'Doce & Sedutor' },
                  { id: 'elegante', label: 'Elegante & Floral' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVibe(v.id as 'marcante' | 'fresco' | 'doce' | 'elegante')}
                    className={`py-2.5 px-2 sm:px-3 rounded-sm border text-[11px] sm:text-xs tracking-[0.5px] uppercase font-medium transition-all cursor-pointer ${
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
                4. Notas ou Preferências (Opcional)
              </label>
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ex: baunilha, amadeirado, cítrico, lavanda, caramelo..."
                className="w-full px-4 py-3 bg-[#121212] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#F5F1EB] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none rounded-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-xs uppercase tracking-[3px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)] rounded-sm"
            >
              <Wand2 className="w-4 h-4 text-[#0A0A0A]" />
              <span>Ver Perfumes Recomendados</span>
            </button>
          </form>
        ) : (
          /* Results View */
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs tracking-[1.5px] sm:tracking-[2px] uppercase text-[#D4AF37] font-semibold block">
                  {recommendations.length} Fragrâncias Recomendadas Para Você
                </span>
                <span className="text-[11px] text-[#B8AF9E] font-light block mt-0.5">
                  Filtros: {genderLabel} · {occasionLabel} · {vibeLabel}
                  {promptInput.trim() ? ` · "${promptInput.trim()}"` : ''}
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline transition-colors cursor-pointer shrink-0 self-start sm:self-center"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refazer consulta</span>
              </button>
            </div>

            <div className="space-y-4">
              {recommendations.map(({ product, matchScore, matchedCriteria, editorialReason }, idx) => {
                const refCode = product.ref || product.numberCode || String(idx + 1).padStart(2, '0');
                const displayTitle =
                  product.titleFormatted ||
                  `SMELL GOOD No. ${refCode} - ${(product.fictionalName || product.name).toUpperCase()}`;
                const imgUrl =
                  product.image_60ml ||
                  product.imagem ||
                  product.image ||
                  'https://i.postimg.cc/0bHKFBxf/download-(10).webp';
                const price60 = (product.price_60ml || 79.9).toFixed(2).replace('.', ',');
                const price15 = (product.price_15ml || 29.9).toFixed(2).replace('.', ',');

                return (
                  <div
                    key={product.id}
                    className="bg-[#121212] border border-[#D4AF37]/30 p-4 sm:p-5 rounded-sm hover:border-[#D4AF37] transition-all grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                  >
                    {/* Bottle Visual */}
                    <div
                      className="sm:col-span-3 flex justify-center cursor-pointer"
                      onClick={() => {
                        onOpenProductDetail(product);
                        onClose();
                      }}
                    >
                      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-xs overflow-hidden flex items-center justify-center p-1.5 border border-[#D4AF37]/30">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={displayTitle}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'https://i.postimg.cc/0bHKFBxf/download-(10).webp';
                            }}
                          />
                        ) : (
                          <SmellGoodBottle
                            name={product.name}
                            numberCode={refCode}
                            size="60ml"
                            family={product.family || product.notes?.family}
                            category={product.category}
                            className="rounded-sm"
                          />
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="sm:col-span-6 space-y-1.5 text-center sm:text-left min-w-0">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="font-body text-[10px] tracking-[2px] uppercase px-2 py-0.5 rounded-xs bg-[#D4AF37]/20 text-[#D4AF37] font-medium">
                          REF {refCode}
                        </span>
                        <span className="font-body text-[10px] tracking-[1.5px] uppercase text-emerald-400 font-semibold">
                          {matchScore}% Afinidade
                        </span>
                        {matchedCriteria.slice(0, 1).map((crit) => (
                          <span
                            key={crit}
                            className="text-[10px] px-2 py-0.5 rounded-xs bg-white/5 border border-white/10 text-[#E5E0D5]"
                          >
                            {crit}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#D4AF37] uppercase leading-snug">
                        {displayTitle}
                      </h4>

                      {product.genericInspiration && (
                        <p className="text-[11px] text-[#A89F91] font-light">
                          Inspiração olfativa: {product.genericInspiration}
                        </p>
                      )}

                      <p className="font-body text-[11px] text-[#D8D2C6] font-light leading-relaxed">
                        {editorialReason}
                      </p>

                      {(product.notes?.top || product.notes?.heart || product.notes?.base) && (
                        <div className="text-[10px] text-[#B8AF9E] space-y-0.5 pt-0.5">
                          {product.notes?.top && (
                            <p className="truncate">
                              <strong className="text-[#D4AF37]">Topo:</strong> {product.notes.top}
                            </p>
                          )}
                          {product.notes?.base && (
                            <p className="truncate">
                              <strong className="text-[#D4AF37]">Fundo:</strong> {product.notes.base}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[10px] text-[#B8AF9E]">
                        <span className="flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-[#D4AF37]" />
                          {product.notes?.family || product.family || 'Eau de Parfum'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#D4AF37]" />
                          Fixação 6h–10h*
                        </span>
                      </div>
                    </div>

                    {/* Buy Buttons */}
                    <div className="sm:col-span-3 flex flex-col gap-2 min-w-0">
                      <button
                        type="button"
                        onClick={() => {
                          onBuyNow(product, '60ml');
                          onClose();
                        }}
                        className="w-full py-2.5 px-2 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-[11px] tracking-[1px] uppercase font-bold transition-all rounded-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Zap className="w-3 h-3 fill-current shrink-0" />
                        <span>Comprar 60ml · R$ {price60}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onBuyNow(product, '15ml');
                          onClose();
                        }}
                        className="w-full py-2 px-2 bg-[#1A1A1A] hover:bg-[#222] border border-[#D4AF37]/35 text-[#F5F1EB] text-[10px] tracking-[1px] uppercase font-medium transition-all rounded-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>15ml Pocket · R$ {price15}</span>
                      </button>

                      <button
                        type="button"
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
                );
              })}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs tracking-[2px] uppercase text-[#B8AF9E] hover:text-[#F5F1EB] transition-colors cursor-pointer"
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
