import React from 'react';
import { Sparkles } from 'lucide-react';

interface BannerProps {
  userName: string;
}

export const Banner: React.FC<BannerProps> = ({ userName }) => {
  const storedName = localStorage.getItem('xbolo_user_name');
  const displayName = storedName || 'Joice Santos';

  return (
    <div className="mx-4 md:mx-0 mb-4 rounded-2xl overflow-hidden shadow-md relative">
      {/* Background gradient */}
      <div className="bg-gradient-to-br from-[#4E2A1E] via-[#6B3A2A] to-[#3d2018] px-5 py-5 relative">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#F4C95D]/10 rounded-full -translate-y-8 translate-x-8 blur-xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-6 -translate-x-4 blur-lg" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span className="text-[10px] font-mono font-black tracking-widest text-[#F4C95D]/80 uppercase">
                Bem-vindo(a) de volta
              </span>
            </div>
            <h2 className="text-xl font-serif font-bold text-white leading-tight">
              Olá, {displayName}! 👋
            </h2>
            <p className="text-xs text-white/60 leading-relaxed font-light max-w-[220px]">
              Continue sua jornada rumo ao certificado de conclusão.
            </p>
          </div>

          {/* Expert image */}
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#F4C95D]/30 shadow-lg">
            <img
              src="/imgs/pessoa.png"
              alt="Instrutora"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="relative z-10 flex items-center space-x-4 mt-4 pt-4 border-t border-white/10">
          {[
            { label: 'Módulos', value: '6' },
            { label: 'Bônus', value: '5' },
            { label: 'Acesso', value: 'Vitalício' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center flex-1">
              <span className="text-base font-black font-mono text-[#F4C95D] leading-none">{stat.value}</span>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
