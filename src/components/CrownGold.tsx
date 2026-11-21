import React from 'react';

interface CrownGoldProps {
  className?: string;
  size?: number;
}

export const CrownGold: React.FC<CrownGoldProps> = ({
  className = '',
  size = 32,
}) => {
  return (
    <svg
      width={size}
      height={Math.round((size * 26) / 36)}
      viewBox="0 0 36 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kingGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9E29D" />
          <stop offset="25%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFF2B2" />
          <stop offset="75%" stopColor="#C59B27" />
          <stop offset="100%" stopColor="#8A6715" />
        </linearGradient>
        <filter id="crownGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#crownGoldGlow)">
        {/* Five Crown Jewels (Top Pearls) */}
        <circle cx="3" cy="6" r="2" fill="url(#kingGoldGrad)" />
        <circle cx="10.5" cy="3.5" r="2.2" fill="url(#kingGoldGrad)" />
        <circle cx="18" cy="1.8" r="2.5" fill="url(#kingGoldGrad)" />
        <circle cx="25.5" cy="3.5" r="2.2" fill="url(#kingGoldGrad)" />
        <circle cx="33" cy="6" r="2" fill="url(#kingGoldGrad)" />

        {/* Crown Body with royal peaks */}
        <path
          d="M3 8.5 L6.5 20 L29.5 20 L33 8.5 L26 13 L18 4.5 L10 13 Z"
          fill="url(#kingGoldGrad)"
          stroke="#8A6715"
          strokeWidth="0.5"
        />

        {/* Inner Arch Details */}
        <path
          d="M7.5 19 L10.5 14 L14 18 L18 10 L22 18 L25.5 14 L28.5 19 Z"
          fill="#1C180E"
          opacity="0.35"
        />

        {/* Imperial Crown Base Band */}
        <rect x="5.5" y="21" width="25" height="3.5" rx="0.75" fill="url(#kingGoldGrad)" stroke="#8A6715" strokeWidth="0.5" />
        
        {/* Base Band Jewels */}
        <circle cx="9" cy="22.75" r="0.9" fill="#1C180E" />
        <circle cx="13.5" cy="22.75" r="0.9" fill="#FFF2B2" />
        <circle cx="18" cy="22.75" r="1.1" fill="#C59B27" />
        <circle cx="22.5" cy="22.75" r="0.9" fill="#FFF2B2" />
        <circle cx="27" cy="22.75" r="0.9" fill="#1C180E" />
      </g>
    </svg>
  );
};
