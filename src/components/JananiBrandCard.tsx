import React from 'react';

interface JananiBrandCardProps {
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}

export const JananiBrandCard: React.FC<JananiBrandCardProps> = ({
  compact = false,
  className = '',
  onClick,
}) => {
  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 cursor-pointer group ${className}`}
      >
        <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFE5E8] to-[#F8F4FE] border border-[#FF8C94]/25 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
          {/* Mini brand mark */}
          <span className="font-serif font-black text-[#2D2426] text-lg leading-none">J</span>
          <span className="absolute -bottom-0.5 w-4 h-1 bg-[#FF8C94] rounded-full" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold tracking-tight text-[#2D2426] leading-none">
              Janani
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#B35860] uppercase">
              CARE
            </span>
          </div>
          <span className="text-[10px] font-medium text-[#7D6F72] mt-0.5">
            Empathetic Maternal Care
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative w-full bg-white rounded-[28px] py-5 px-5 sm:px-7 border border-[#7D6F72]/10 shadow-[0_10px_28px_-6px_rgba(220,160,165,0.16)] overflow-hidden text-center transition-all ${className}`}
    >
      {/* Top Left Rose Accent Dot - Positioned safely away from text */}
      <div className="absolute top-3.5 left-3.5 w-6 h-6 rounded-full bg-[#FFE5E8]/70 flex items-center justify-center pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF8C94]/80" />
      </div>

      {/* Bottom Right Sage Green Accent Dot - Positioned safely away from text */}
      <div className="absolute bottom-3.5 right-3.5 w-6 h-6 rounded-full bg-[#E2F8EE]/80 flex items-center justify-center pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-[#A8E6CF]" />
      </div>

      {/* Content wrapper with relative z-10 so nothing goes behind dots */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Center Badge: MATERNAL CARE */}
        <div className="inline-flex items-center justify-center px-3 py-0.5 rounded-full bg-[#FFE5E8]/90 border border-[#FF8C94]/30 mb-1.5">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#B35860] uppercase">
            MATERNAL CARE
          </span>
        </div>

        {/* Main Brand Title: Janani */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2426] tracking-tight leading-none pb-0.5">
          Janani
        </h1>

        {/* Signature Curved Underline with Center Spark */}
        <div className="relative flex items-center justify-center my-1">
          <svg
            className="w-24 sm:w-28 h-3 text-[#FF8C94]"
            viewBox="0 0 140 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gentle smiling curved arc */}
            <path
              d="M6 5 Q 70 14 134 5"
              stroke="#FF8C94"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Center 4-point diamond star spark */}
            <polygon
              points="70,1 72.5,9.5 81,10 72.5,10.5 70,19 67.5,10.5 59,10 67.5,9.5"
              fill="#FF8C94"
              transform="scale(0.7) translate(30, -1)"
            />
          </svg>
        </div>

        {/* Sub-wordmark: C A R E */}
        <div className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.28em] text-[#5A4D50] uppercase pt-0.5">
          C A R E
        </div>

        {/* Tagline */}
        <p className="text-[11px] text-[#7D6F72] mt-1.5 px-2 max-w-xs font-medium leading-relaxed">
          Empathetic Clinical &amp; Restorative Pregnancy Companion
        </p>
      </div>
    </div>
  );
};
