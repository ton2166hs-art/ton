// ============================================================================
// 💎 SISTEMA DE FUNDOS DE LUXO EXCLUSIVOS PARA CADA PERFUME
//
// 16 cenários visuais de alta joalheria / perfumaria de nicho internacional.
// Cada perfume recebe um cenário próprio, eliminando fundos repetitivos.
// ============================================================================

export interface LuxuryTheme {
  id: string;
  name: string;
  bgRadial: string;
  glowPrimary: string;
  glowSecondary: string;
  spotlightClass: string;
  tableGradient: string;
  horizonColor: string;
  veinColor1: string;
  veinColor2: string;
  veinPath1: string;
  veinPath2: string;
  reflectionColor: string;
  tag: string;
}

export const LUXURY_THEMES: LuxuryTheme[] = [
  {
    id: 'nero-gold',
    name: 'Nero Marquina & Ouro Puro',
    bgRadial: 'radial-gradient(circle at 50% 32%, #1c1812 0%, #0d0b09 45%, #050403 85%)',
    glowPrimary: '#D4AF37',
    glowSecondary: '#9A7718',
    spotlightClass: 'top-[30%] left-[50%]',
    tableGradient: 'linear-gradient(to bottom, #110f0b 0%, #050403 100%)',
    horizonColor: 'via-[#D4AF37]/50',
    veinColor1: '#D4AF37',
    veinColor2: '#F3E5AB',
    veinPath1: 'M0,45 Q110,15 220,65 T400,25',
    veinPath2: 'M40,80 Q160,35 280,70 T400,50',
    reflectionColor: '#D4AF37',
    tag: 'Nero Marquina',
  },
  {
    id: 'emerald-imperial',
    name: 'Esmeralda Imperial & Âmbar',
    bgRadial: 'radial-gradient(circle at 52% 30%, #0e1e17 0%, #07110d 45%, #030806 85%)',
    glowPrimary: '#1fa472',
    glowSecondary: '#c8a14b',
    spotlightClass: 'top-[28%] left-[54%]',
    tableGradient: 'linear-gradient(to bottom, #09140f 0%, #020504 100%)',
    horizonColor: 'via-[#2fd999]/40',
    veinColor1: '#2fd999',
    veinColor2: '#D4AF37',
    veinPath1: 'M0,35 Q90,55 190,20 T400,45',
    veinPath2: 'M20,75 Q140,40 260,65 T400,30',
    reflectionColor: '#2fd999',
    tag: 'Esmeralda Imperial',
  },
  {
    id: 'sapphire-night',
    name: 'Safira da Meia-Noite & Poeira Estelar',
    bgRadial: 'radial-gradient(circle at 48% 35%, #0d1624 0%, #060b13 45%, #030508 85%)',
    glowPrimary: '#3878b4',
    glowSecondary: '#D4AF37',
    spotlightClass: 'top-[32%] left-[46%]',
    tableGradient: 'linear-gradient(to bottom, #08101a 0%, #020406 100%)',
    horizonColor: 'via-[#4a97db]/40',
    veinColor1: '#60a5fa',
    veinColor2: '#D4AF37',
    veinPath1: 'M0,50 Q130,25 240,60 T400,35',
    veinPath2: 'M30,70 Q150,50 270,75 T400,40',
    reflectionColor: '#60a5fa',
    tag: 'Safira Noir',
  },
  {
    id: 'cognac-amber',
    name: 'Âmbar Bourbon & Quartzo Fumê',
    bgRadial: 'radial-gradient(circle at 50% 30%, #261609 0%, #150c05 45%, #070401 85%)',
    glowPrimary: '#e58f27',
    glowSecondary: '#b85e12',
    spotlightClass: 'top-[30%] left-[50%]',
    tableGradient: 'linear-gradient(to bottom, #160d05 0%, #060301 100%)',
    horizonColor: 'via-[#f59e0b]/50',
    veinColor1: '#fbbf24',
    veinColor2: '#f97316',
    veinPath1: 'M0,40 Q100,60 210,30 T400,55',
    veinPath2: 'M15,85 Q135,45 255,70 T400,45',
    reflectionColor: '#fbbf24',
    tag: 'Âmbar Cognac',
  },
  {
    id: 'bordeaux-velvet',
    name: 'Bordeaux Velvet & Ouro Rosé',
    bgRadial: 'radial-gradient(circle at 52% 34%, #250d15 0%, #13060a 45%, #060204 85%)',
    glowPrimary: '#c2416b',
    glowSecondary: '#D4AF37',
    spotlightClass: 'top-[33%] left-[52%]',
    tableGradient: 'linear-gradient(to bottom, #14070c 0%, #040102 100%)',
    horizonColor: 'via-[#e11d48]/40',
    veinColor1: '#f43f5e',
    veinColor2: '#D4AF37',
    veinPath1: 'M0,30 Q120,45 230,15 T400,50',
    veinPath2: 'M25,75 Q145,35 265,65 T400,35',
    reflectionColor: '#fb7185',
    tag: 'Bordeaux Velvet',
  },
  {
    id: 'calacatta-oro',
    name: 'Calacatta Negro & Ouro Champanhe',
    bgRadial: 'radial-gradient(circle at 50% 35%, #18191b 0%, #0c0d0e 45%, #050506 85%)',
    glowPrimary: '#f6d89e',
    glowSecondary: '#8d7543',
    spotlightClass: 'top-[31%] left-[50%]',
    tableGradient: 'linear-gradient(to bottom, #101113 0%, #040405 100%)',
    horizonColor: 'via-[#fef3c7]/40',
    veinColor1: '#fde68a',
    veinColor2: '#ffffff',
    veinPath1: 'M0,55 Q80,20 190,50 T380,20 L400,25',
    veinPath2: 'M10,70 Q130,30 250,60 T400,40',
    reflectionColor: '#fde68a',
    tag: 'Calacatta Oro',
  },
  {
    id: 'mahogany-wood',
    name: 'Mogno Nobre & Verniz Laqueado',
    bgRadial: 'radial-gradient(circle at 48% 30%, #22120e 0%, #120907 45%, #050201 85%)',
    glowPrimary: '#d97736',
    glowSecondary: '#853e14',
    spotlightClass: 'top-[29%] left-[48%]',
    tableGradient: 'linear-gradient(to bottom, #130a07 0%, #050201 100%)',
    horizonColor: 'via-[#ea580c]/40',
    veinColor1: '#f97316',
    veinColor2: '#D4AF37',
    veinPath1: 'M0,45 Q115,25 225,55 T400,30',
    veinPath2: 'M35,80 Q155,50 275,70 T400,50',
    reflectionColor: '#ea580c',
    tag: 'Mogno Francês',
  },
  {
    id: 'obsidian-onyx',
    name: 'Obsidiana Espelhada & Chiaroscuro',
    bgRadial: 'radial-gradient(circle at 50% 36%, #151515 0%, #0a0a0a 45%, #020202 85%)',
    glowPrimary: '#D4AF37',
    glowSecondary: '#ffffff',
    spotlightClass: 'top-[34%] left-[50%]',
    tableGradient: 'linear-gradient(to bottom, #0e0e0e 0%, #010101 100%)',
    horizonColor: 'via-[#D4AF37]/60',
    veinColor1: '#D4AF37',
    veinColor2: '#a3a3a3',
    veinPath1: 'M0,35 Q105,45 215,20 T400,45',
    veinPath2: 'M20,70 Q140,30 260,60 T400,30',
    reflectionColor: '#ffffff',
    tag: 'Obsidiana Pura',
  },
  {
    id: 'champagne-silk',
    name: 'Seda Champanhe & Grafite Nobre',
    bgRadial: 'radial-gradient(circle at 52% 32%, #1b1715 0%, #0e0c0b 45%, #050403 85%)',
    glowPrimary: '#fcd34d',
    glowSecondary: '#b45309',
    spotlightClass: 'top-[30%] left-[52%]',
    tableGradient: 'linear-gradient(to bottom, #110e0c 0%, #040302 100%)',
    horizonColor: 'via-[#fde68a]/50',
    veinColor1: '#fde68a',
    veinColor2: '#d97706',
    veinPath1: 'M0,50 Q95,20 205,50 T400,25',
    veinPath2: 'M15,75 Q135,45 255,65 T400,40',
    reflectionColor: '#fde68a',
    tag: 'Seda Champanhe',
  },
  {
    id: 'lava-basalt',
    name: 'Basalto Vulcânico & Brasas Douradas',
    bgRadial: 'radial-gradient(circle at 49% 33%, #1e130c 0%, #0f0906 45%, #040201 85%)',
    glowPrimary: '#f97316',
    glowSecondary: '#ef4444',
    spotlightClass: 'top-[31%] left-[49%]',
    tableGradient: 'linear-gradient(to bottom, #120a06 0%, #040201 100%)',
    horizonColor: 'via-[#f97316]/50',
    veinColor1: '#f97316',
    veinColor2: '#eab308',
    veinPath1: 'M0,40 Q110,60 220,30 T400,50',
    veinPath2: 'M30,85 Q150,45 270,75 T400,45',
    reflectionColor: '#f97316',
    tag: 'Pedra Basáltica',
  },
  {
    id: 'titanium-slate',
    name: 'Ardósia Titânio & Veios Minerais',
    bgRadial: 'radial-gradient(circle at 50% 35%, #14171a 0%, #0a0c0e 45%, #030405 85%)',
    glowPrimary: '#94a3b8',
    glowSecondary: '#D4AF37',
    spotlightClass: 'top-[33%] left-[50%]',
    tableGradient: 'linear-gradient(to bottom, #0d0f12 0%, #020304 100%)',
    horizonColor: 'via-[#cbd5e1]/40',
    veinColor1: '#cbd5e1',
    veinColor2: '#D4AF37',
    veinPath1: 'M0,35 Q100,50 210,25 T400,40',
    veinPath2: 'M20,70 Q140,40 260,65 T400,35',
    reflectionColor: '#cbd5e1',
    tag: 'Ardósia Titânio',
  },
  {
    id: 'amethyst-noir',
    name: 'Ametista Noir & Halo Dourado',
    bgRadial: 'radial-gradient(circle at 51% 33%, #1c0e24 0%, #0e0713 45%, #050207 85%)',
    glowPrimary: '#a855f7',
    glowSecondary: '#D4AF37',
    spotlightClass: 'top-[31%] left-[51%]',
    tableGradient: 'linear-gradient(to bottom, #110816 0%, #040105 100%)',
    horizonColor: 'via-[#c084fc]/40',
    veinColor1: '#c084fc',
    veinColor2: '#D4AF37',
    veinPath1: 'M0,45 Q120,20 230,55 T400,30',
    veinPath2: 'M30,80 Q150,45 270,70 T400,45',
    reflectionColor: '#c084fc',
    tag: 'Ametista Imperial',
  },
  {
    id: 'terracotta-sun',
    name: 'Terracota & Sol Poente Dourado',
    bgRadial: 'radial-gradient(circle at 48% 31%, #24140c 0%, #130a06 45%, #050201 85%)',
    glowPrimary: '#ea580c',
    glowSecondary: '#d97706',
    spotlightClass: 'top-[29%] left-[48%]',
    tableGradient: 'linear-gradient(to bottom, #140b06 0%, #040201 100%)',
    horizonColor: 'via-[#f97316]/50',
    veinColor1: '#fb923c',
    veinColor2: '#fde047',
    veinPath1: 'M0,35 Q105,55 215,25 T400,45',
    veinPath2: 'M25,75 Q145,35 265,65 T400,35',
    reflectionColor: '#fb923c',
    tag: 'Terracota Âmbar',
  },
  {
    id: 'carbon-gold',
    name: 'Carbono Nobre & Linhas de Ouro',
    bgRadial: 'radial-gradient(circle at 50% 34%, #151817 0%, #0b0c0c 45%, #030404 85%)',
    glowPrimary: '#D4AF37',
    glowSecondary: '#10b981',
    spotlightClass: 'top-[32%] left-[50%]',
    tableGradient: 'linear-gradient(to bottom, #0e1010 0%, #020303 100%)',
    horizonColor: 'via-[#D4AF37]/50',
    veinColor1: '#D4AF37',
    veinColor2: '#34d399',
    veinPath1: 'M0,50 Q110,25 220,55 T400,25',
    veinPath2: 'M20,70 Q140,50 260,70 T400,40',
    reflectionColor: '#D4AF37',
    tag: 'Carbono & Ouro',
  },
  {
    id: 'antique-bronze',
    name: 'Bronze Antigo & Pátina Dourada',
    bgRadial: 'radial-gradient(circle at 52% 32%, #20170f 0%, #100b07 45%, #050302 85%)',
    glowPrimary: '#ca8a04',
    glowSecondary: '#78350f',
    spotlightClass: 'top-[30%] left-[52%]',
    tableGradient: 'linear-gradient(to bottom, #120d08 0%, #040302 100%)',
    horizonColor: 'via-[#eab308]/40',
    veinColor1: '#facc15',
    veinColor2: '#ca8a04',
    veinPath1: 'M0,40 Q95,60 205,30 T400,50',
    veinPath2: 'M15,80 Q135,45 255,70 T400,45',
    reflectionColor: '#facc15',
    tag: 'Bronze Escovado',
  },
  {
    id: 'pearl-black',
    name: 'Pérola Negra & Reflexos Iridescentes',
    bgRadial: 'radial-gradient(circle at 50% 33%, #17181f 0%, #0b0c10 45%, #030406 85%)',
    glowPrimary: '#818cf8',
    glowSecondary: '#D4AF37',
    spotlightClass: 'top-[31%] left-[50%]',
    tableGradient: 'linear-gradient(to bottom, #0e0f14 0%, #020305 100%)',
    horizonColor: 'via-[#a5b4fc]/40',
    veinColor1: '#a5b4fc',
    veinColor2: '#D4AF37',
    veinPath1: 'M0,45 Q115,25 225,50 T400,30',
    veinPath2: 'M30,75 Q150,40 270,65 T400,40',
    reflectionColor: '#a5b4fc',
    tag: 'Pérola Negra',
  },
];

export function getBackdropForPerfume(refCode?: string, name?: string, family?: string): LuxuryTheme {
  const parsedNum = parseInt(refCode || '0', 10);
  
  if (!isNaN(parsedNum) && parsedNum > 0) {
    // Offset slightly with 1-based indexing so REF 01 = theme 0, REF 02 = theme 1, etc.
    const index = (parsedNum - 1) % LUXURY_THEMES.length;
    return LUXURY_THEMES[index];
  }

  // Fallback hashing from name & family
  const seed = `${name || ''} ${family || ''}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % LUXURY_THEMES.length;
  return LUXURY_THEMES[index];
}
