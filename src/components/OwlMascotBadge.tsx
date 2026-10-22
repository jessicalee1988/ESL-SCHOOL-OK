import React from 'react';

interface OwlMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  speechBubbleText?: string;
}

export const OwlMascotBadge: React.FC<OwlMascotProps> = ({ 
  className = '', 
  size = 'md',
  speechBubbleText
}) => {
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24 sm:w-28 sm:h-28'
  }[size];

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* Friendly 2D Owl Mascot SVG */}
      <div className={`${dimensions} shrink-0 relative transition-transform hover:scale-105 duration-200`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Owl Ears */}
          <polygon points="26,30 38,12 44,28" fill="#B08365" />
          <polygon points="74,30 62,12 56,28" fill="#B08365" />
          <polygon points="30,28 38,16 42,27" fill="#E8C39E" />
          <polygon points="70,28 62,16 58,27" fill="#E8C39E" />

          {/* Owl Body */}
          <ellipse cx="50" cy="55" rx="36" ry="38" fill="#9C6B4B" />
          <ellipse cx="50" cy="62" rx="26" ry="26" fill="#FFF5D6" />

          {/* Wings */}
          <ellipse cx="18" cy="58" rx="8" ry="18" transform="rotate(-15 18 58)" fill="#845336" />
          <ellipse cx="82" cy="58" rx="8" ry="18" transform="rotate(15 82 58)" fill="#845336" />

          {/* Big Owl Eyes & Glasses */}
          <circle cx="37" cy="40" r="14" fill="#FFFFFF" stroke="#245E59" strokeWidth="3" />
          <circle cx="63" cy="40" r="14" fill="#FFFFFF" stroke="#245E59" strokeWidth="3" />
          {/* Glasses bridge */}
          <line x1="48" y1="40" x2="52" y2="40" stroke="#245E59" strokeWidth="3" strokeLinecap="round" />
          <line x1="23" y1="40" x2="20" y2="38" stroke="#245E59" strokeWidth="2.5" />
          <line x1="77" y1="40" x2="80" y2="38" stroke="#245E59" strokeWidth="2.5" />

          {/* Pupils */}
          <circle cx="39" cy="40" r="6" fill="#245E59" />
          <circle cx="61" cy="40" r="6" fill="#245E59" />
          {/* Catchlight */}
          <circle cx="41" cy="38" r="2" fill="#FFFFFF" />
          <circle cx="63" cy="38" r="2" fill="#FFFFFF" />

          {/* Cute Orange Beak */}
          <polygon points="46,47 54,47 50,56" fill="#F59E0B" />

          {/* Cheeks */}
          <circle cx="28" cy="48" r="4" fill="#FFD9E5" />
          <circle cx="72" cy="48" r="4" fill="#FFD9E5" />

          {/* Graduation Scarf / Book */}
          <rect x="36" y="68" width="28" height="20" rx="3" fill="#245E59" />
          <rect x="38" y="70" width="11" height="16" rx="2" fill="#FFFFFF" />
          <rect x="51" y="70" width="11" height="16" rx="2" fill="#FFFFFF" />
          <line x1="50" y1="69" x2="50" y2="87" stroke="#E6D385" strokeWidth="1.5" />

          {/* Little Feet */}
          <ellipse cx="42" cy="91" rx="4" ry="2" fill="#F59E0B" />
          <ellipse cx="58" cy="91" rx="4" ry="2" fill="#F59E0B" />
        </svg>
      </div>

      {speechBubbleText && (
        <div className="relative bg-white border border-[#BCEBD8] rounded-2xl px-3.5 py-2 text-xs font-medium text-[#245E59] shadow-xs max-w-xs animate-in fade-in">
          <span className="block">{speechBubbleText}</span>
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white border-l border-b border-[#BCEBD8] transform rotate-45" />
        </div>
      )}
    </div>
  );
};
