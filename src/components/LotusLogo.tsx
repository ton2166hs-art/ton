import React from 'react';

interface LotusLogoProps {
  className?: string;
  size?: number;
  variant?: 'gold' | 'amber' | 'white';
}

export const LotusLogo: React.FC<LotusLogoProps> = ({
  className = 'w-6 h-6',
  size,
  variant = 'gold',
}) => {
  const gradientId = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`lotusGrad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#AA820A" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      {/* Central Petal */}
      <path
        d="M32 8 C30 20 25 36 32 50 C39 36 34 20 32 8 Z"
        fill={`url(#lotusGrad-${gradientId})`}
        opacity="0.95"
      />

      {/* Inner Left Petal */}
      <path
        d="M32 50 C23 44 14 32 18 20 C23 28 28 40 32 50 Z"
        fill={`url(#lotusGrad-${gradientId})`}
        opacity="0.8"
      />

      {/* Inner Right Petal */}
      <path
        d="M32 50 C41 44 50 32 46 20 C41 28 36 40 32 50 Z"
        fill={`url(#lotusGrad-${gradientId})`}
        opacity="0.8"
      />

      {/* Outer Left Petal */}
      <path
        d="M32 50 C19 49 6 42 10 32 C17 37 25 45 32 50 Z"
        fill={`url(#lotusGrad-${gradientId})`}
        opacity="0.65"
      />

      {/* Outer Right Petal */}
      <path
        d="M32 50 C45 49 58 42 54 32 C47 37 39 45 32 50 Z"
        fill={`url(#lotusGrad-${gradientId})`}
        opacity="0.65"
      />

      {/* Bottom Base Calyx / Water Lotus Crest */}
      <path
        d="M16 50 Q32 56 48 50 Q32 53 16 50 Z"
        fill={`url(#lotusGrad-${gradientId})`}
      />
      <circle cx="32" cy="51" r="1.5" fill="#F5F1EB" />
    </svg>
  );
};
