import React from 'react';
import { PerfumeSize } from '../types';
import { getBackdropForPerfume } from '../utils/luxuryBackdrops';

interface SmellGoodBottleProps {
  name: string;
  numberCode?: string;
  size?: PerfumeSize;
  family?: string;
  category?: string;
  className?: string;
}

export const SmellGoodBottle: React.FC<SmellGoodBottleProps> = ({
  name,
  numberCode,
  size = '60ml',
  family = '',
  category = '',
  className = '',
}) => {
  const is15ml = size === '15ml';
  const cleanKey = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  // Retrieve deterministic luxury backdrop for this specific perfume
  const theme = getBackdropForPerfume(numberCode, name, family);

  const textContext = `${name} ${family} ${category}`.toLowerCase();
  const isFloral = textContext.includes('floral') || textContext.includes('ros') || textContext.includes('fem') || textContext.includes('miss') || textContext.includes('mademoiselle') || textContext.includes('dior');
  const isFresh = textContext.includes('fresc') || textContext.includes('aquát') || textContext.includes('marinho') || textContext.includes('cítric') || textContext.includes('invictus') || textContext.includes('acqua') || textContext.includes('sauvage');
  const isSweet = textContext.includes('doce') || textContext.includes('baunilha') || textContext.includes('oriental') || textContext.includes('scandal') || textContext.includes('million') || textContext.includes('good girl');
  const isWoody = !isFloral && !isFresh && !isSweet;

  const refDisplay = numberCode ? `REF ${numberCode}` : '';

  return (
    <div className={`relative w-full aspect-square overflow-hidden select-none flex items-center justify-center bg-[#070707] ${className}`}>
      {/* 1. Fundo de Luxo Exclusivo por Perfume */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: theme.bgRadial }}
      />
      
      {/* Soft Ambient Glow (Bespoke per luxury theme) */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full blur-[70px] pointer-events-none opacity-40"
        style={{ backgroundColor: theme.glowPrimary }}
      />
      <div
        className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[90px] pointer-events-none opacity-25"
        style={{ backgroundColor: theme.glowSecondary }}
      />

      {/* Luxury Table Horizon Line */}
      <div className={`absolute bottom-[22%] inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent ${theme.horizonColor} to-transparent`} />
      <div
        className="absolute bottom-0 inset-x-0 h-[22%]"
        style={{ background: theme.tableGradient }}
      />

      {/* Marble / Texture Veins (Unique per theme) */}
      <svg className="absolute bottom-0 inset-x-0 h-[22%] w-full opacity-40 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 100">
        <path d={theme.veinPath1} stroke={theme.veinColor1} strokeWidth="0.85" fill="none" opacity="0.45" />
        <path d={theme.veinPath2} stroke={theme.veinColor2} strokeWidth="0.6" fill="none" opacity="0.3" />
      </svg>

      {/* Contact Ground Shadows & Golden Light Reflection on Marble */}
      <div className="absolute bottom-[19%] left-1/2 -translate-x-1/2 w-[82%] h-7 bg-black/95 rounded-full blur-md" />
      <div
        className="absolute bottom-[20%] left-[62%] -translate-x-1/2 w-[35%] h-3 rounded-full blur-sm opacity-35"
        style={{ backgroundColor: theme.reflectionColor }}
      />

      {/* Theme Editorial Tag */}
      <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[8px] tracking-[1.5px] uppercase font-light text-[#D4AF37] bg-black/80 px-2 py-0.5 rounded-xs border border-[#D4AF37]/30 backdrop-blur-xs">
          {theme.tag}
        </span>
      </div>

      {/* 2. Vector Rendering: Editorial High-End Bottle & Box Matching User's Reference */}
      <svg
        viewBox="0 0 500 500"
        className="relative z-10 w-full h-full max-h-[94%] max-w-[94%] drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Luminous Amber Liquid Gradient */}
          <linearGradient id={`amberLiq-${cleanKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#875112" />
            <stop offset="15%" stopColor="#B87B22" />
            <stop offset="42%" stopColor="#E2A63B" />
            <stop offset="55%" stopColor="#F8CB64" />
            <stop offset="78%" stopColor="#C68928" />
            <stop offset="100%" stopColor="#78440D" />
          </linearGradient>

          {/* Premium Metallic Gold Gradient */}
          <linearGradient id={`goldLotusGrad-${cleanKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B3892F" />
            <stop offset="28%" stopColor="#F4D984" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="78%" stopColor="#F9E29B" />
            <stop offset="100%" stopColor="#8A671B" />
          </linearGradient>

          {/* Curved Glass Highlight */}
          <linearGradient id={`glassGloss-${cleanKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.48" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
          </linearGradient>

          {/* Matte Black Texture */}
          <linearGradient id={`matteCapGrad-${cleanKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="35%" stopColor="#282828" />
            <stop offset="65%" stopColor="#202020" />
            <stop offset="100%" stopColor="#0D0D0D" />
          </linearGradient>

          {/* Mirror Reflection Fade */}
          <linearGradient id={`mirrorFade-${cleanKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {!is15ml ? (
          /* ======================================================== */
          /* PADRÃO OFICIAL 60ML: FRASCO CILÍNDRICO + CAIXA PRETA "SG"*/
          /* Conforme Imagem de Referência 1 Enviada pelo Usuário     */
          /* ======================================================== */
          <g>
            {/* Contextual Note Elements on Marble (Petals, Dew drops, Amber resin, or Wood) */}
            {isFloral && (
              <g id="floralNotes" opacity="0.85">
                {/* Soft Rose petals on marble surface */}
                <path d="M70,410 C60,405 55,420 70,425 C85,430 90,415 70,410 Z" fill="#E8A598" opacity="0.6" />
                <path d="M410,405 C400,395 390,415 410,422 C430,428 435,405 410,405 Z" fill="#E8A598" opacity="0.65" />
                <path d="M375,425 C365,420 360,430 372,434 C385,438 390,428 375,425 Z" fill="#F4D3CC" opacity="0.5" />
                <circle cx="95" cy="418" r="1.5" fill="#FFFFFF" opacity="0.8" />
                <circle cx="395" cy="415" r="1.2" fill="#FFFFFF" opacity="0.8" />
              </g>
            )}

            {isFresh && (
              <g id="freshNotes" opacity="0.9">
                {/* Water dew droplets on marble */}
                <ellipse cx="80" cy="412" rx="4" ry="2" fill="#FFFFFF" opacity="0.5" />
                <circle cx="81" cy="411" r="1.5" fill="#FFFFFF" opacity="0.9" />
                <ellipse cx="405" cy="410" rx="5" ry="2.5" fill="#FFFFFF" opacity="0.55" />
                <circle cx="406" cy="409" r="2" fill="#FFFFFF" opacity="0.95" />
                <ellipse cx="380" cy="422" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.4" />
                <circle cx="381" cy="421" r="1" fill="#FFFFFF" opacity="0.85" />
              </g>
            )}

            {isSweet && (
              <g id="sweetNotes" opacity="0.85">
                {/* Warm amber resin & vanilla sparkles on marble */}
                <ellipse cx="75" cy="415" rx="5" ry="2" fill="#D4AF37" opacity="0.6" />
                <circle cx="76" cy="414" r="1.2" fill="#FFF2C2" opacity="0.9" />
                <ellipse cx="415" cy="412" rx="4.5" ry="1.8" fill="#D4AF37" opacity="0.6" />
                <circle cx="385" cy="420" r="1" fill="#FFD700" opacity="0.75" />
              </g>
            )}

            {isWoody && (
              <g id="woodyNotes" opacity="0.8">
                {/* Noble cedar slivers & amber highlights */}
                <path d="M65,414 L85,417 L78,419 Z" fill="#8B5A2B" opacity="0.7" />
                <ellipse cx="400" cy="414" rx="4" ry="1.5" fill="#D4AF37" opacity="0.55" />
              </g>
            )}

            {/* ---------------------------------------------------- */}
            {/* 1. CAIXA PRETA FOSCA DE LUXO (Á ESQUERDA)            */}
            {/* Com Flor de Lótus, SMELL GOOD, Logo SG e DEIXE SUA MARCA */}
            {/* ---------------------------------------------------- */}
            <g id="luxuryBlackBox">
              {/* Box Side (3D Perspective Left Face) */}
              <path d="M85,150 L120,132 L120,398 L85,412 Z" fill="#0A0A0A" stroke="#1F1F1F" strokeWidth="0.8" />
              <line x1="86" y1="151" x2="86" y2="411" stroke="#333333" strokeWidth="0.5" opacity="0.5" />

              {/* Box Front Face (Matte Black) */}
              <rect x="120" y="132" width="105" height="266" rx="2" fill="#141414" stroke="#252525" strokeWidth="0.8" />

              {/* Gold Embossed Frame on Box Face */}
              <rect x="127" y="139" width="91" height="252" rx="1" fill="none" stroke={`url(#goldLotusGrad-${cleanKey})`} strokeWidth="0.9" opacity="0.9" />

              {/* Gold Lotus Logo on Box Top */}
              <g transform="translate(172.5, 178) scale(0.52)" stroke={`url(#goldLotusGrad-${cleanKey})`} fill="none" strokeWidth="2">
                <path d="M0,16 C-8,-4 0,-24 0,-24 C0,-24 8,-4 0,16 Z" fill={`url(#goldLotusGrad-${cleanKey})`} fillOpacity="0.5" />
                <path d="M0,16 C-20,9 -30,-8 -24,-18 C-16,-10 -6,-1 0,16 Z" fill={`url(#goldLotusGrad-${cleanKey})`} fillOpacity="0.3" />
                <path d="M0,16 C20,9 30,-8 24,-18 C16,-10 6,-1 0,16 Z" fill={`url(#goldLotusGrad-${cleanKey})`} fillOpacity="0.3" />
                <path d="M-18,16 Q0,23 18,16" strokeWidth="2" />
                <circle cx="0" cy="-28" r="1.5" fill={`url(#goldLotusGrad-${cleanKey})`} />
              </g>

              {/* "SMELL GOOD" Text on Box (8px spaced) */}
              <text
                x="172.5"
                y="222"
                textAnchor="middle"
                fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
                fontSize="10"
                letterSpacing="3"
                fill={`url(#goldLotusGrad-${cleanKey})`}
                fontWeight="400"
              >
                SMELL GOOD
              </text>

              {/* "EAU PARFUM" Subtitle on Box */}
              <text
                x="172.5"
                y="245"
                textAnchor="middle"
                fontFamily="'Montserrat', 'Inter', sans-serif"
                fontSize="5"
                letterSpacing="2.5"
                fill={`url(#goldLotusGrad-${cleanKey})`}
                opacity="0.95"
                fontWeight="300"
              >
                EAU PARFUM
              </text>

              {/* Monograma "SG" Dourado Entrelaçado (Como na Foto de Referência) */}
              <g transform="translate(172.5, 290)">
                {/* S serif letter */}
                <text
                  x="-7"
                  y="6"
                  textAnchor="middle"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontSize="21"
                  fontStyle="italic"
                  fill={`url(#goldLotusGrad-${cleanKey})`}
                  fontWeight="600"
                >
                  S
                </text>
                {/* G lower interlocking letter */}
                <text
                  x="7"
                  y="15"
                  textAnchor="middle"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontSize="18"
                  fontStyle="italic"
                  fill={`url(#goldLotusGrad-${cleanKey})`}
                  fontWeight="600"
                >
                  g
                </text>
              </g>

              {/* "DEIXE SUA MARCA" Slogan */}
              <text
                x="172.5"
                y="336"
                textAnchor="middle"
                fontFamily="'Montserrat', 'Inter', sans-serif"
                fontSize="4.5"
                letterSpacing="2.2"
                fill={`url(#goldLotusGrad-${cleanKey})`}
                opacity="0.95"
                fontWeight="400"
              >
                DEIXE SUA MARCA
              </text>

              {/* Volume text "60 ml e 2.03 FL.OZ" */}
              <text
                x="172.5"
                y="374"
                textAnchor="middle"
                fontFamily="'Montserrat', 'Inter', sans-serif"
                fontSize="4.8"
                letterSpacing="1.2"
                fill={`url(#goldLotusGrad-${cleanKey})`}
                opacity="0.85"
                fontWeight="300"
              >
                60 ml e 2.03 FL.OZ
              </text>
            </g>

            {/* Mirror Reflection of Box on Polished Marble Surface */}
            <g transform="translate(0, 796) scale(1, -1)" opacity="0.18">
              <rect x="120" y="398" width="105" height="70" fill="#141414" />
              <rect x="127" y="398" width="91" height="60" fill="none" stroke={`url(#goldLotusGrad-${cleanKey})`} strokeWidth="0.8" />
            </g>

            {/* ---------------------------------------------------- */}
            {/* 2. FRASCO CILÍNDRICO 60ML TRANSPARENTE (À DIREITA)   */}
            {/* Com Líquido Âmbar Nobre, Tampa Preta Fosca e Rótulo   */}
            {/* ---------------------------------------------------- */}
            <g id="cylindricalBottle60ml">
              {/* Glass Shadow Contact */}
              <ellipse cx="325" cy="404" rx="55" ry="7" fill="#000000" opacity="0.8" />

              {/* Transparent Glass Body Contour */}
              <rect x="270" y="212" width="112" height="192" rx="8" fill="#16120C" fillOpacity="0.55" />

              {/* Amber Liquid Fill with Realistic Meniscus */}
              <rect x="274" y="246" width="104" height="152" rx="4" fill={`url(#amberLiq-${cleanKey})`} />
              {/* Curved Top Liquid Meniscus Oval */}
              <ellipse cx="326" cy="246" rx="52" ry="5.5" fill="#FCE18A" opacity="0.9" />

              {/* Thick Solid Crystal Bottom Glass */}
              <rect x="272" y="390" width="108" height="14" rx="4" fill="#ffffff" fillOpacity="0.14" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.8" />
              <line x1="278" y1="394" x2="374" y2="394" stroke={`url(#goldLotusGrad-${cleanKey})`} strokeOpacity="0.5" strokeWidth="0.9" />

              {/* Glass Highlights & Reflections (Cylindrical Curve) */}
              <rect x="273" y="216" width="14" height="184" rx="2" fill={`url(#glassGloss-${cleanKey})`} />
              <rect x="367" y="216" width="10" height="184" rx="2" fill="#ffffff" fillOpacity="0.16" />
              <line x1="298" y1="222" x2="298" y2="400" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.6" strokeLinecap="round" />

              {/* Outer Crystal Glass Contour Border */}
              <rect x="270" y="212" width="112" height="192" rx="8" fill="none" stroke="#ffffff" strokeOpacity="0.36" strokeWidth="1.2" />

              {/* Internal Dip Tube (Canudo do spray cristalino) */}
              <line x1="326" y1="216" x2="310" y2="394" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />

              {/* ---------------------------------------------------- */}
              {/* 3. RÓTULO PRETO COM FLOR DE LÓTUS DOURADA E TEXTOS   */}
              {/* "SMELL GOOD", "EAU THE PARFUM", "60 ML"              */}
              {/* ---------------------------------------------------- */}
              <g id="bottleLabel">
                {/* Black Label Background */}
                <rect x="281" y="266" width="90" height="106" rx="2" fill="#0E0E0E" stroke="#1C1C1C" strokeWidth="0.9" />
                
                {/* Double Gold Line Border on Label */}
                <rect x="284" y="269" width="84" height="100" rx="1.5" fill="none" stroke={`url(#goldLotusGrad-${cleanKey})`} strokeWidth="0.8" opacity="0.95" />
                <rect x="287" y="272" width="78" height="94" rx="1" fill="none" stroke={`url(#goldLotusGrad-${cleanKey})`} strokeWidth="0.4" opacity="0.6" />

                {/* Golden Lotus Flower on Label */}
                <g transform="translate(326, 296) scale(0.44)" stroke={`url(#goldLotusGrad-${cleanKey})`} fill="none" strokeWidth="2">
                  <path d="M0,16 C-8,-4 0,-24 0,-24 C0,-24 8,-4 0,16 Z" fill={`url(#goldLotusGrad-${cleanKey})`} fillOpacity="0.55" />
                  <path d="M0,16 C-20,9 -30,-8 -24,-18 C-16,-10 -6,-1 0,16 Z" fill={`url(#goldLotusGrad-${cleanKey})`} fillOpacity="0.35" />
                  <path d="M0,16 C20,9 30,-8 24,-18 C16,-10 6,-1 0,16 Z" fill={`url(#goldLotusGrad-${cleanKey})`} fillOpacity="0.35" />
                  <path d="M-18,16 Q0,23 18,16" strokeWidth="2" />
                  <circle cx="0" cy="-28" r="1.5" fill={`url(#goldLotusGrad-${cleanKey})`} />
                </g>

                {/* "SMELL GOOD" Text on Label (8px tracking feel) */}
                <text
                  x="326"
                  y="323"
                  textAnchor="middle"
                  fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
                  fontSize="8.8"
                  letterSpacing="2.2"
                  fill={`url(#goldLotusGrad-${cleanKey})`}
                  fontWeight="500"
                >
                  SMELL GOOD
                </text>

                {/* Subtle Divider Line */}
                <line x1="304" y1="330" x2="348" y2="330" stroke={`url(#goldLotusGrad-${cleanKey})`} strokeWidth="0.5" opacity="0.7" />

                {/* "EAU PARFUM" e "60ML" */}
                <text
                  x="326"
                  y="339"
                  textAnchor="middle"
                  fontFamily="'Montserrat', 'Inter', sans-serif"
                  fontSize="4.6"
                  letterSpacing="1.8"
                  fill="#F5F1EB"
                  opacity="0.9"
                  fontWeight="300"
                >
                  EAU PARFUM
                </text>

                {/* "60ML" */}
                <text
                  x="326"
                  y="349"
                  textAnchor="middle"
                  fontFamily="'Montserrat', 'Inter', sans-serif"
                  fontSize="4.5"
                  letterSpacing="1.8"
                  fill={`url(#goldLotusGrad-${cleanKey})`}
                  fontWeight="500"
                >
                  60ML
                </text>

                {/* Optional Fragrance REF Subtitle on Label */}
                {numberCode && (
                  <text
                    x="326"
                    y="360"
                    textAnchor="middle"
                    fontFamily="'Montserrat', 'Inter', sans-serif"
                    fontSize="3.6"
                    letterSpacing="1"
                    fill="#B8AF9E"
                    opacity="0.8"
                  >
                    REF {numberCode}
                  </text>
                )}
              </g>

              {/* Gold Collar Neck Ring */}
              <rect x="303" y="202" width="46" height="11" rx="1.5" fill={`url(#goldLotusGrad-${cleanKey})`} stroke="#7D5816" strokeWidth="0.6" />
              <line x1="303" y1="207" x2="349" y2="207" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />

              {/* Cylindrical Matte Black Cap (Tampa Preta Fosca) */}
              <rect x="296" y="146" width="60" height="58" rx="3" fill={`url(#matteCapGrad-${cleanKey})`} stroke="#3A3A3A" strokeWidth="0.9" />
              <ellipse cx="326" cy="147" rx="30" ry="4" fill="#383838" />
              {/* Highlights on matte black cap */}
              <line x1="302" y1="152" x2="302" y2="200" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.4" />
              <line x1="350" y1="152" x2="350" y2="200" stroke={`url(#goldLotusGrad-${cleanKey})`} strokeOpacity="0.35" strokeWidth="0.8" />
            </g>

            {/* Mirror Reflection of Bottle on Polished Marble Surface */}
            <g transform="translate(0, 808) scale(1, -1)" opacity="0.2">
              <rect x="274" y="404" width="104" height="60" rx="3" fill={`url(#amberLiq-${cleanKey})`} />
              <rect x="281" y="404" width="90" height="40" fill="#0E0E0E" stroke={`url(#goldLotusGrad-${cleanKey})`} strokeWidth="0.5" />
            </g>
          </g>
        ) : (
          /* ======================================================== */
          /* PADRÃO OFICIAL 15ML: FRASCO POCKET (Imagem 2 Referência) */
          /* Rótulo Vertical "SMELL GOOD parfyn 15 ml" + Pedras/Água */
          /* ======================================================== */
          <g>
            {/* Natural Mineral Stone & Water Splash Elements (Ref Imagem 2) */}
            <g id="pocketBackground15ml" opacity="0.85">
              {/* Dark wet rocks on marble */}
              <path d="M120,430 C150,380 210,385 240,415 C260,435 150,445 120,430 Z" fill="#181512" stroke="#2D2721" strokeWidth="0.8" />
              <path d="M260,420 C290,390 360,395 385,425 C395,438 310,445 260,420 Z" fill="#141210" stroke="#28221D" strokeWidth="0.8" />
              
              {/* Water Splash droplets around bottle */}
              <circle cx="170" cy="340" r="3" fill="#A8D8F0" opacity="0.6" />
              <circle cx="165" cy="280" r="2" fill="#FFFFFF" opacity="0.75" />
              <circle cx="330" cy="310" r="3.5" fill="#A8D8F0" opacity="0.65" />
              <circle cx="340" cy="260" r="2" fill="#FFFFFF" opacity="0.8" />
              <circle cx="325" cy="370" r="2.5" fill="#D4AF37" opacity="0.5" />
            </g>

            {/* 15ml Sleek Rectangular/Cylindrical Pocket Bottle */}
            <g id="pocketBottleGroup" transform="translate(0, -10)">
              {/* Contact Shadow */}
              <ellipse cx="250" cy="420" rx="42" ry="6" fill="#000000" opacity="0.85" />

              {/* Crystal Glass Body */}
              <rect x="214" y="200" width="72" height="216" rx="5" fill="#16120C" fillOpacity="0.6" />

              {/* Amber Liquid */}
              <rect x="218" y="234" width="64" height="176" rx="3" fill={`url(#amberLiq-${cleanKey})`} />
              <ellipse cx="250" cy="234" rx="32" ry="4.5" fill="#FCE18A" opacity="0.9" />

              {/* Solid Glass Bottom */}
              <rect x="215" y="402" width="70" height="14" rx="3" fill="#ffffff" fillOpacity="0.16" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.7" />

              {/* Glass Highlights */}
              <rect x="216" y="204" width="9" height="206" rx="2" fill={`url(#glassGloss-${cleanKey})`} />
              <line x1="233" y1="210" x2="233" y2="408" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.4" strokeLinecap="round" />
              <rect x="214" y="200" width="72" height="216" rx="5" fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="1.2" />

              {/* ---------------------------------------------------- */}
              {/* Rótulo Preto Vertical 15ml (Como na Foto 2)          */}
              {/* Lótus Prateado/Dourado + SMELL GOOD parfyn 15 ml     */}
              {/* ---------------------------------------------------- */}
              <g id="pocketVerticalLabel">
                <rect x="223" y="246" width="54" height="142" rx="1.5" fill="#0B0B0B" stroke="#222222" strokeWidth="0.8" />
                <rect x="225" y="248" width="50" height="138" rx="1" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="0.5" />

                {/* Stylized Lotus Emblem (White/Silver as in Photo 2) */}
                <g transform="translate(250, 268) scale(0.38)" stroke="#FFFFFF" fill="none" strokeWidth="1.8">
                  <path d="M0,16 C-8,-4 0,-24 0,-24 C0,-24 8,-4 0,16 Z" fill="#FFFFFF" fillOpacity="0.7" />
                  <path d="M0,16 C-20,9 -30,-8 -24,-18 C-16,-10 -6,-1 0,16 Z" fill="#FFFFFF" fillOpacity="0.45" />
                  <path d="M0,16 C20,9 30,-8 24,-18 C16,-10 6,-1 0,16 Z" fill="#FFFFFF" fillOpacity="0.45" />
                  <path d="M-18,16 Q0,23 18,16" strokeWidth="1.8" />
                </g>

                {/* Vertical "SMELL GOOD" text rotated 90 degrees */}
                <g transform="translate(244, 345) rotate(-90)">
                  <text
                    x="0"
                    y="0"
                    fontFamily="'Playfair Display', Georgia, serif"
                    fontSize="9.5"
                    letterSpacing="3"
                    fill="#FFFFFF"
                    fontWeight="500"
                  >
                    SMELL GOOD
                  </text>
                </g>

                {/* "parfyn 15 ml" subtitle */}
                <g transform="translate(258, 345) rotate(-90)">
                  <text
                    x="0"
                    y="0"
                    fontFamily="'Montserrat', 'Inter', sans-serif"
                    fontSize="5"
                    letterSpacing="1"
                    fill="#CCCCCC"
                    fontWeight="300"
                  >
                    parfyn 15 ml
                  </text>
                </g>

                {/* REF Indicator at bottom */}
                {numberCode && (
                  <text
                    x="250"
                    y="380"
                    textAnchor="middle"
                    fontFamily="'Montserrat', sans-serif"
                    fontSize="4"
                    letterSpacing="1"
                    fill={`url(#goldLotusGrad-${cleanKey})`}
                    fontWeight="600"
                  >
                    REF {numberCode}
                  </text>
                )}
              </g>

              {/* Gold Neck Ring */}
              <rect x="235" y="192" width="30" height="9" rx="1" fill={`url(#goldLotusGrad-${cleanKey})`} stroke="#7D5816" strokeWidth="0.5" />

              {/* Tall Matte Black Cap (Tampa Preta Alta 15ml) */}
              <rect x="231" y="126" width="38" height="68" rx="2" fill={`url(#matteCapGrad-${cleanKey})`} stroke="#3A3A3A" strokeWidth="0.8" />
              <ellipse cx="250" cy="127" rx="19" ry="2.5" fill="#383838" />
              <line x1="236" y1="132" x2="236" y2="190" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.2" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
