import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, Maximize2, Minimize2, ChevronLeft, ChevronRight, FileText, Eye } from 'lucide-react';

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl?: string; // in case they want to link a real PDF file
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose, title, pdfUrl }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8; // Simulated pages

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 70));
  const handleResetZoom = () => setZoom(100);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Mock content pages for the ebook to look like a premium PDF
  const renderMockPageContent = (page: number) => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
            <div className="w-20 h-20 bg-[#F4C95D]/20 rounded-full flex items-center justify-center text-[#F4C95D]">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-serif font-black text-[#4E2A1E]">{title}</h1>
            <p className="text-xs font-mono tracking-widest text-[#4E2A1E]/40 uppercase">Curso Completo de Bolos Gourmet Lucrativos</p>
            <div className="w-16 h-1 bg-[#F4C95D] rounded-full my-4"></div>
            <p className="text-xs text-[#4E2A1E]/70 max-w-sm">
              Este guia digital contém o passo a passo completo, receitas detalhadas, segredos de preparo e dicas comerciais exclusivas.
            </p>
            <p className="text-[10px] text-[#4E2A1E]/40 pt-12">Página 1 de {totalPages} • Apostila Oficial</p>
          </div>
        );
      case 2:
        return (
          <div className="p-8 space-y-4 text-left">
            <h2 className="text-lg font-serif font-bold text-[#4E2A1E] border-b pb-2 border-[#E5DED3]">1. Introdução & Conceito</h2>
            <p className="text-xs text-[#4E2A1E]/80 leading-relaxed">
              O segredo do sucesso na confeitaria gourmet em casa não está apenas em misturar ingredientes, mas em criar uma experiência irresistível para o seu cliente. O mercado de bolos artesanais cresce anualmente, impulsionado por consumidores que buscam sabor de verdade e apresentação premium.
            </p>
            <h3 className="text-xs font-bold text-[#4E2A1E] uppercase tracking-wider pt-2">Por que o X-Bolo Gourmet?</h3>
            <ul className="text-xs text-[#4E2A1E]/80 space-y-2 list-disc pl-4">
              <li><strong>Margem de Lucro Elevada:</strong> Custo de produção baixo e alto valor percebido.</li>
              <li><strong>Facilidade de Escala:</strong> Produza na sua cozinha padrão sem necessidade de equipamentos industriais.</li>
              <li><strong>Fidelização:</strong> Receitas testadas e aprovadas que garantem recompra recorrente.</li>
            </ul>
          </div>
        );
      case 3:
        return (
          <div className="p-8 space-y-4 text-left">
            <h2 className="text-lg font-serif font-bold text-[#4E2A1E] border-b pb-2 border-[#E5DED3]">2. Ingredientes Premium & Seleção</h2>
            <p className="text-xs text-[#4E2A1E]/80 leading-relaxed">
              Utilizar ingredientes de qualidade é o que diferencia o seu bolo do bolo industrializado comum. Nunca economize na qualidade da manteiga, do chocolate e do leite condensado.
            </p>
            <div className="bg-[#FAEFE4] p-3 rounded-xl border border-[#E5DED3] space-y-2">
              <h4 className="text-xs font-bold text-[#4E2A1E]">Dica de Ouro da Confeiteira:</h4>
              <p className="text-[11px] text-[#4E2A1E]/80 leading-relaxed">
                Opte sempre por chocolate em pó com teor de cacau de no mínimo 50%. Evite achocolatados comerciais, pois eles adicionam açúcar em excesso e mascaram o sabor real da massa.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 space-y-4 text-left">
            <h2 className="text-lg font-serif font-bold text-[#4E2A1E] border-b pb-2 border-[#E5DED3]">Página {page}: Guia de Prática</h2>
            <p className="text-xs text-[#4E2A1E]/80 leading-relaxed">
              Siga sempre a risca a ordem de pesagem dos ingredientes. O uso de uma balança de cozinha digital é altamente recomendado para manter a padronização e evitar desperdícios.
            </p>
            <p className="text-xs text-[#4E2A1E]/80 leading-relaxed">
              Certifique-se de que o forno foi pré-aquecido a 180°C por pelo menos 15 minutos antes de colocar a massa. Nunca abra o forno antes de 30 minutos de cozimento para evitar que o bolo murche.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm">
      {/* Modal Card */}
      <div 
        className={`bg-[#1E1E1E] text-white flex flex-col w-full transition-all duration-300 shadow-2xl ${
          isFullscreen 
            ? 'h-full w-full rounded-none' 
            : 'h-full md:h-[90vh] md:max-w-4xl md:rounded-2xl overflow-hidden'
        }`}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#2D2D2D] border-b border-[#3D3D3D]">
          <div className="flex items-center space-x-2 min-w-0">
            <FileText className="w-5 h-5 text-[#F4C95D] flex-shrink-0" />
            <h3 className="text-sm font-bold truncate max-w-[200px] md:max-w-xs">{title}</h3>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/60 uppercase">PDF</span>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Zoom controls (hidden on small mobile) */}
            <div className="hidden md:flex items-center space-x-2 bg-white/5 rounded-lg p-0.5 border border-white/10">
              <button 
                onClick={handleZoomOut} 
                className="p-1 hover:bg-white/10 rounded transition-all text-white/70 hover:text-white"
                title="Reduzir"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleResetZoom}
                className="text-[10px] px-1 font-mono hover:text-[#F4C95D]"
                title="Restaurar Zoom"
              >
                {zoom}%
              </button>
              <button 
                onClick={handleZoomIn}
                className="p-1 hover:bg-white/10 rounded transition-all text-white/70 hover:text-white"
                title="Ampliar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <a
              href={pdfUrl || "/sample.pdf"}
              download
              className="flex items-center space-x-1 bg-[#F4C95D] hover:bg-[#e0b850] text-[#4E2A1E] px-3 py-1.5 rounded-lg text-xs font-black shadow transition-all active:scale-95"
              title="Baixar PDF Original"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Baixar PDF</span>
            </a>

            <button 
              onClick={() => setIsFullscreen(!isFullscreen)} 
              className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-all"
              title={isFullscreen ? "Minimizar" : "Tela Cheia"}
            >
              {isFullscreen ? <Minimize2 className="w-4.5 h-4.5" /> : <Maximize2 className="w-4.5 h-4.5" />}
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

        {/* PDF Document Container */}
        <div className="flex-1 bg-[#333] overflow-auto flex justify-center p-4 md:p-6 select-none">
          <div 
            className="bg-[#F5F1EA] text-[#4E2A1E] shadow-2xl rounded-sm border border-black/10 origin-top transition-transform duration-200"
            style={{ 
              width: '100%', 
              maxWidth: '650px', 
              aspectRatio: '1/1.414', // A4 proportion
              transform: `scale(${zoom / 100})`,
              minHeight: '400px'
            }}
          >
            {/* Real PDF or beautiful PDF mockup reader */}
            {pdfUrl ? (
              isMobile ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-6 bg-[#F5F1EA] text-[#4E2A1E]">
                  <div className="w-20 h-20 bg-[#F4C95D]/20 rounded-full flex items-center justify-center text-[#F4C95D] animate-bounce my-2">
                    <FileText className="w-10 h-10 text-[#4E2A1E]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-serif font-black text-[#4E2A1E] px-4">{title}</h3>
                    <p className="text-xs text-[#4E2A1E]/70 max-w-xs mx-auto leading-relaxed">
                      Para ler este material no seu celular, abra o arquivo em uma nova aba ou faça o download direto.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3 w-full items-center">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-[#4E2A1E] hover:bg-[#3d2018] text-[#F4C95D] px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 w-full max-w-[200px]"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Visualizar PDF</span>
                    </a>
                    <a
                      href={pdfUrl}
                      download
                      className="flex items-center justify-center space-x-2 bg-[#F4C95D] hover:bg-[#e0b850] text-[#4E2A1E] px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 w-full max-w-[200px]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Baixar PDF</span>
                    </a>
                  </div>
                </div>
              ) : (
                <iframe 
                  src={`${pdfUrl}#toolbar=0`} 
                  className="w-full h-full border-none rounded-sm"
                  title={title}
                />
              )
            ) : (
              <div className="w-full h-full flex flex-col justify-between">
                {/* Simulated PDF Header */}
                <div className="px-6 py-3 border-b border-[#E5DED3] flex items-center justify-between text-[9px] font-mono text-[#4E2A1E]/40 uppercase tracking-wider">
                  <span>Guia Oficial X-Bolo</span>
                  <span>{title}</span>
                </div>

                {/* Simulated PDF Page Content */}
                <div className="flex-1 overflow-y-auto">
                  {renderMockPageContent(currentPage)}
                </div>

                {/* Simulated PDF Footer */}
                <div className="px-6 py-3 border-t border-[#E5DED3] flex items-center justify-between text-[9px] font-mono text-[#4E2A1E]/40">
                  <span>© Curso X-Bolos Gourmet</span>
                  <span>Página {currentPage} de {totalPages}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Pagination Controls (only if using simulated mockup) */}
        {!pdfUrl && (
          <div className="px-4 py-3 bg-[#2D2D2D] border-t border-[#3D3D3D] flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 disabled:opacity-30 disabled:pointer-events-none transition-all text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs font-mono text-white/60">
              Página <strong className="text-white font-bold">{currentPage}</strong> de {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 disabled:opacity-30 disabled:pointer-events-none transition-all text-xs"
            >
              <span>Próxima</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
