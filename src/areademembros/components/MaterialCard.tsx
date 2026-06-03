import React from 'react';
import { CheckCircle2, Circle, Clock, Tag, FileText, Image as ImageIcon, Calculator } from 'lucide-react';
import type { Material } from '../data/materials';

interface MaterialCardProps {
  material: Material;
  isViewed: boolean;
  onToggleViewed: (id: string) => void;
  onOpen: (material: Material) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, isViewed, onToggleViewed, onOpen }) => {
  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between ${
        isViewed ? 'border-green-200' : 'border-[#E5DED3]'
      }`}
    >
      <div>
        {/* Cover image (clickable to open PDF) */}
        <div 
          onClick={() => onOpen(material)}
          className="relative w-full aspect-video overflow-hidden bg-[#FAEFE4] cursor-pointer group"
        >
          <img
            src={material.cover}
            alt={material.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#4E2A1E]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <span className="bg-[#F4C95D] text-[#4E2A1E] text-xs font-black px-3 py-1.5 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {material.mediaType === 'images' ? 'Ver Imagens' : material.mediaType === 'calculator' ? 'Calcular Custos' : 'Acessar Material'}
            </span>
          </div>

          {/* Viewed overlay */}
          {isViewed && (
            <div className="absolute inset-0 bg-green-950/20 flex items-center justify-center pointer-events-none">
              <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
          {/* Tag badge */}
          {material.tag && (
            <div className={`absolute top-2 left-2 flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider ${
              material.type === 'bonus'
                ? 'bg-[#F4C95D] text-[#4E2A1E]'
                : 'bg-[#4E2A1E] text-[#F4C95D]'
            }`}>
              <Tag className="w-2.5 h-2.5" />
              <span>{material.tag}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 space-y-1">
          <h3 
            onClick={() => onOpen(material)}
            className="text-xs md:text-sm font-serif font-bold text-[#4E2A1E] leading-snug line-clamp-2 cursor-pointer hover:text-[#7C4D3E] transition-colors"
          >
            {material.title}
          </h3>
          <p className="text-[10px] md:text-[11px] text-[#4E2A1E]/60 leading-relaxed line-clamp-2">
            {material.description}
          </p>
        </div>
      </div>

      {/* Footer / Buttons */}
      <div className="p-3 pt-0 space-y-2">
        <div className="flex items-center justify-between border-t border-[#F5F1EA] pt-2">
          <div className="flex items-center space-x-1 text-[#4E2A1E]/50">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-mono font-medium">{material.duration}</span>
          </div>

          {/* Mark as seen icon-button */}
          <button
            onClick={() => onToggleViewed(material.id)}
            className={`p-1.5 rounded-xl transition-all active:scale-90 ${
              isViewed
                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                : 'bg-[#4E2A1E]/5 text-[#4E2A1E]/50 hover:bg-[#4E2A1E]/10'
            }`}
            title={isViewed ? "Marcar como não visto" : "Marcar como visto"}
          >
            {isViewed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary view button */}
        <button
          onClick={() => onOpen(material)}
          className="w-full flex items-center justify-center space-x-1.5 bg-[#4E2A1E] hover:bg-[#3d2018] text-[#F4C95D] py-2 px-3 rounded-xl text-[11px] font-sans font-black shadow-sm transition-all active:scale-[0.98]"
        >
          {material.mediaType === 'images' ? (
            <>
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Ver Imagens / Baixar</span>
            </>
          ) : material.mediaType === 'calculator' ? (
            <>
              <Calculator className="w-3.5 h-3.5" />
              <span>Abrir Calculadora</span>
            </>
          ) : (
            <>
              <FileText className="w-3.5 h-3.5" />
              <span>Acessar Material</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
