import React, { useState } from 'react';
import { X, Download, Eye, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ isOpen, onClose, title, images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(prev => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(prev => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  // Helper to extract filename for download attribute
  const getFilename = (path: string) => {
    return path.split('/').pop() || 'imagem.png';
  };

  const downloadAll = async () => {
    // Download all images sequentially
    for (let i = 0; i < images.length; i++) {
      const link = document.createElement('a');
      link.href = images[i];
      link.download = getFilename(images[i]);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Small delay to prevent browser blocking multiple downloads
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/85 backdrop-blur-sm select-none">
      {/* Modal Card */}
      <div className="bg-[#1E1E1E] text-white flex flex-col w-full h-full md:h-[90vh] md:max-w-5xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#2D2D2D] border-b border-[#3D3D3D]">
          <div className="flex items-center space-x-2 min-w-0">
            <ImageIcon className="w-5 h-5 text-[#F4C95D] flex-shrink-0" />
            <h3 className="text-sm font-bold truncate max-w-[200px] md:max-w-xs">{title}</h3>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/60 uppercase">Imagens ({images.length})</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={downloadAll}
              className="flex items-center space-x-1.5 bg-[#F4C95D] hover:bg-[#e0b850] text-[#4E2A1E] px-3 py-1.5 rounded-lg text-xs font-black shadow transition-all active:scale-95"
              title="Baixar Todas as Imagens"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Todas</span>
            </button>

            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-white/70 transition-all"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#181818]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <div 
                key={idx}
                className="group relative aspect-square bg-[#262626] rounded-xl overflow-hidden border border-[#333] hover:border-[#F4C95D]/50 transition-all duration-300 shadow-md cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedImageIndex(idx)}
              >
                {/* Image Wrapper */}
                <div className="w-full flex-1 overflow-hidden relative flex items-center justify-center p-1 bg-[#1F1F1F]">
                  <img 
                    src={img} 
                    alt={`Preview ${idx + 1}`} 
                    className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <div className="bg-[#F4C95D] text-[#4E2A1E] p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Footer bar of card */}
                <div className="bg-[#2D2D2D] p-2 flex items-center justify-between border-t border-[#3A3A3A] shrink-0">
                  <span className="text-[10px] font-mono text-white/60">
                    Arte {idx + 1}
                  </span>
                  <a 
                    href={img} 
                    download={getFilename(img)}
                    onClick={(e) => e.stopPropagation()} // Prevent lightbox from opening
                    className="p-1 hover:bg-white/10 text-[#F4C95D] rounded transition-colors"
                    title="Baixar esta imagem"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Preview */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 flex flex-col justify-between"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10">
            <span className="text-sm font-bold text-white">
              Visualizando: Arte {selectedImageIndex + 1} de {images.length}
            </span>
            <div className="flex items-center space-x-2">
              <a 
                href={images[selectedImageIndex]} 
                download={getFilename(images[selectedImageIndex])}
                className="flex items-center space-x-1 bg-[#F4C95D] hover:bg-[#e0b850] text-[#4E2A1E] px-3 py-1.5 rounded-lg text-xs font-black shadow transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar</span>
              </a>
              <button 
                onClick={() => setSelectedImageIndex(null)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image area */}
          <div className="flex-1 flex items-center justify-between relative px-2 md:px-12 py-4">
            {/* Left Nav Button */}
            <button 
              onClick={handlePrev}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F4C95D]/30 text-white rounded-full transition-all active:scale-90 flex-shrink-0 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Displayed Image */}
            <div className="max-w-[85vw] max-h-[75vh] flex items-center justify-center p-2 relative">
              <img 
                src={images[selectedImageIndex]} 
                alt={`Fullsize Preview`} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
                onClick={(e) => e.stopPropagation()} // Prevent closing lightbox when clicking image
              />
            </div>

            {/* Right Nav Button */}
            <button 
              onClick={handleNext}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F4C95D]/30 text-white rounded-full transition-all active:scale-90 flex-shrink-0 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Thumbnail Bar */}
          <div className="bg-black/50 py-3 border-t border-white/10 flex justify-center space-x-2 overflow-x-auto px-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(idx);
                }}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 bg-neutral-900 transition-all ${
                  selectedImageIndex === idx ? 'border-[#F4C95D] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
