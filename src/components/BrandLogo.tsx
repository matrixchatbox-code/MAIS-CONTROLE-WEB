import React from 'react';

interface BrandLogoProps {
  variant?: 'maiscontrole' | 'trycontroller';
  className?: string;
  inverted?: boolean; // True for dark/purple backgrounds, False for light/white backgrounds
  showSubtitle?: boolean;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'maiscontrole',
  className = '',
  inverted = false,
  showSubtitle = false,
  iconOnly = false,
  size = 'md',
}) => {
  // Size calculations
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  // Official Mais Controle Logo - Faithful Vector Reproduction of logotipo-mais-controle.jpeg
  const MaisControleIcon = ({ isDarkBg = false }: { isDarkBg?: boolean }) => (
    <svg
      viewBox="0 0 160 130"
      className={`${iconSizes[size]} overflow-visible drop-shadow-xs flex-shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 3 Barras Douradas Verticais Ascendentes */}
      <rect x="94" y="66" width="11" height="26" rx="5.5" fill="#f5be63" />
      <rect x="110" y="52" width="11" height="40" rx="5.5" fill="#f5be63" />
      <rect x="126" y="36" width="11" height="56" rx="5.5" fill="#f5be63" />

      {/* Linha em Zigzag Ascendente (Azul Petróleo / Ciano) */}
      <path
        d="M 14 74 L 48 38 L 74 68 L 132 18"
        stroke={isDarkBg ? '#38bdf8' : '#389ebc'}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Ponta da Seta no Topo Direito */}
      <polygon
        points="114,14 146,12 144,44"
        fill={isDarkBg ? '#38bdf8' : '#389ebc'}
      />
    </svg>
  );

  if (iconOnly) {
    return <MaisControleIcon isDarkBg={inverted} />;
  }

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      <MaisControleIcon isDarkBg={inverted} />

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline space-x-1">
          <span
            className={`font-black tracking-tight ${textSizes[size]} ${
              inverted ? 'text-white' : 'text-[#323c46]'
            }`}
          >
            MAIS
          </span>
          <span
            className={`font-normal tracking-wide ${textSizes[size]} ${
              inverted ? 'text-cyan-300' : 'text-[#389ebc]'
            }`}
          >
            CONTROLE
          </span>
        </div>

        {/* Linha decorativa inferior com traço central como no logotipo oficial */}
        <div className="flex items-center space-x-1 mt-0.5">
          <div
            className={`h-0.5 w-4 rounded-full ${
              inverted ? 'bg-cyan-400/40' : 'bg-[#389ebc]/40'
            }`}
          />
          <div
            className={`h-1 w-6 rounded-full ${
              inverted ? 'bg-cyan-400' : 'bg-[#389ebc]'
            }`}
          />
          <div
            className={`h-0.5 w-6 rounded-full ${
              inverted ? 'bg-cyan-400/40' : 'bg-[#389ebc]/40'
            }`}
          />
        </div>

        {showSubtitle && (
          <span
            className={`text-[10px] font-sans tracking-wide mt-0.5 font-bold ${
              inverted ? 'text-emerald-300' : 'text-[#76b82a]'
            }`}
          >
            Controller
          </span>
        )}
      </div>
    </div>
  );
};
