import React from 'react';
import { Award } from 'lucide-react';

interface ProgressCardProps {
  viewed: number;
  total: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ viewed, total }) => {
  const percentage = total === 0 ? 0 : Math.round((viewed / total) * 100);
  const remaining = total - viewed;

  // SVG circle progress
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage === 100) return '#22c55e';
    if (percentage >= 60) return '#F4C95D';
    return '#F4C95D';
  };

  return (
    <div className="mx-4 md:mx-0 mb-4 bg-white rounded-2xl border border-[#E5DED3] shadow-sm overflow-hidden">
      <div className="flex items-center p-4 space-x-4">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg width="88" height="88" className="-rotate-90">
            {/* Track */}
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              stroke="#F5F1EA"
              strokeWidth="7"
            />
            {/* Progress */}
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              stroke={getColor()}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-black font-mono text-[#4E2A1E] leading-none">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-[#F4C95D]" />
            <span className="text-xs font-mono font-black tracking-widest text-[#4E2A1E]/60 uppercase">
              Progresso
            </span>
          </div>
          <p className="text-base font-serif font-bold text-[#4E2A1E] leading-tight">
            {percentage === 100
              ? '🎉 Certificado Desbloqueado!'
              : `${remaining} material${remaining !== 1 ? 'is' : ''} para o certificado`}
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <div className="flex-1 h-1.5 bg-[#F5F1EA] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                  background: percentage === 100
                    ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                    : 'linear-gradient(90deg, #F4C95D, #e0a830)',
                }}
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#4E2A1E]/60 whitespace-nowrap">
              {viewed}/{total}
            </span>
          </div>
        </div>
      </div>

      {percentage === 100 && (
        <div className="bg-green-50 border-t border-green-100 px-4 py-2.5 flex items-center space-x-2">
          <span className="text-xs text-green-700 font-semibold">
            ✅ Vá até a aba <strong>Certificado</strong> para resgatar o seu!
          </span>
        </div>
      )}
    </div>
  );
};
