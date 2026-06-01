import React from 'react';
import { Lock, Download, Printer, FileText, Share2, Briefcase, Trophy, Lightbulb, Award } from 'lucide-react';

interface CertificateProps {
  userName: string;
  completionDate: string;
  isUnlocked: boolean;
  progress: number;
}

export const Certificate: React.FC<CertificateProps> = ({
  userName,
  completionDate,
  isUnlocked,
  progress,
}) => {
  // First try to get the student's name from localStorage (saved from webhook url)
  const storedName = localStorage.getItem('xbolo_user_name');
  
  const displayName = storedName || 'Joice Santos';

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificado - ${displayName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
            
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background-color: #ffffff;
            }
            .cert-wrapper {
              position: relative;
              width: 1122px; /* A4 landscape width at 96 DPI */
              height: 793px;  /* A4 landscape height at 96 DPI */
              box-sizing: border-box;
              overflow: hidden;
            }
            .cert-bg {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .student-name {
              position: absolute;
              top: 46%;
              left: 71%;
              transform: translate(-50%, -50%);
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 32px;
              font-weight: 700;
              color: #4E2A1E;
              text-align: center;
              width: 48%;
              text-transform: capitalize;
              word-break: break-word;
              white-space: normal;
              line-height: 1.3;
            }
            @page {
              size: A4 landscape;
              margin: 0;
            }
            @media print {
              body {
                background: none;
              }
              .cert-wrapper {
                width: 100vw;
                height: 100vh;
              }
            }
          </style>
        </head>
        <body>
          <div class="cert-wrapper">
            <img src="/imgs/certificado.png" class="cert-bg" />
            <div class="student-name">${displayName}</div>
          </div>
          <script>
            // Wait for image to fully load before showing print dialog
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 600);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!isUnlocked) {
    return (
      <div className="px-4 py-6 flex flex-col items-center text-center space-y-5">
        {/* Locked icon */}
        <div className="w-24 h-24 rounded-full bg-[#FAEFE4] border-2 border-[#E5DED3] flex items-center justify-center shadow-inner">
          <Lock className="w-10 h-10 text-[#4E2A1E]/30" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-serif font-bold text-[#4E2A1E]">
            Certificado Bloqueado
          </h3>
          <p className="text-sm text-[#4E2A1E]/60 leading-relaxed max-w-[280px] mx-auto">
            Marque todos os {' '}
            <strong className="text-[#4E2A1E]">11 materiais</strong> {' '}
            como vistos para desbloquear seu certificado de conclusão.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[280px] space-y-2">
          <div className="flex justify-between text-xs font-mono text-[#4E2A1E]/50">
            <span>Progresso atual</span>
            <span className="font-bold text-[#4E2A1E]">{progress}%</span>
          </div>
          <div className="h-2.5 bg-[#F5F1EA] rounded-full overflow-hidden border border-[#E5DED3]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F4C95D] to-[#e0a830] transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-[#4E2A1E]/40">
            Faltam <strong>{Math.round(11 - (progress / 100) * 11)} materiais</strong> para concluir
          </p>
        </div>

        {/* Tips */}
        <div className="w-full max-w-[320px] bg-[#FAEFE4] border border-[#E5DED3] rounded-2xl p-4 text-left space-y-2">
          <p className="text-xs font-mono font-bold text-[#4E2A1E]/60 uppercase tracking-wider">Como desbloquear</p>
          {[
            'Acesse a aba "Materiais" e estude os módulos',
            'Acesse a aba "Bônus" e veja todos os materiais extras',
            'Marque cada um como "Visto" ao finalizar',
          ].map((tip, i) => (
            <div key={i} className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-[#4E2A1E] text-[#F4C95D] text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-xs text-[#4E2A1E]/70 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-5 max-w-5xl mx-auto">
      {/* Success badge */}
      <div className="flex items-center justify-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 w-fit mx-auto">
        <Award className="w-4 h-4 text-green-600 animate-pulse" />
        <span className="text-xs font-mono font-bold text-green-700 uppercase tracking-wider">
          Certificado Desbloqueado!
        </span>
      </div>

      {/* Two-column layout on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left: Certificate card */}
        <div className="lg:col-span-2 flex flex-col items-center space-y-4">
          {/* Certificate card using mockup template with container queries */}
          <div
            id="certificate-card"
            className="relative w-full aspect-[1.414] bg-white border border-[#4E2A1E]/20 rounded-2xl overflow-hidden shadow-2xl [container-type:inline-size]"
          >
            <img
              src="/imgs/certificado.png"
              alt="Certificado de Conclusão"
              className="w-full h-full object-cover select-none"
            />
            
            {/* Dynamic Name Overlay - Centered in right column, below "Certificamos que" */}
            <div className="absolute top-[46%] left-[71%] -translate-x-1/2 -translate-y-1/2 w-[48%] text-center">
              <h2 
                className="font-serif font-bold text-[#4E2A1E] tracking-wide capitalize leading-tight drop-shadow-sm"
                style={{ fontSize: '2.8cqw', lineHeight: '1.3', wordBreak: 'break-word', whiteSpace: 'normal' }}
              >
                {displayName}
              </h2>
            </div>
          </div>

          {/* Print button */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center space-x-2 bg-[#4E2A1E] hover:bg-[#3d2018] text-[#F4C95D] py-4 px-6 rounded-2xl text-sm font-black shadow-md transition-all active:scale-[0.98]"
          >
            <Printer className="w-5 h-5" />
            <span>IMPRIMIR / SALVAR EM PDF</span>
          </button>

          <div className="flex items-center space-x-2 text-[#4E2A1E]/40 text-[11px]">
            <Download className="w-3.5 h-3.5" />
            <p>Clique acima para gerar o PDF oficial pronto para impressão.</p>
          </div>
        </div>

        {/* Right: Help / Info sidebar */}
        <div className="space-y-4">

          {/* Congratulations card */}
          <div className="bg-gradient-to-br from-[#4E2A1E] to-[#6B3A2A] rounded-2xl p-5 text-white space-y-3 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F4C95D]/10 rounded-full -translate-y-8 translate-x-8 blur-xl" />
            <div className="relative z-10 flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-[#F4C95D]/20 flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-[#F4C95D]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#F4C95D]">Parabéns, {displayName}!</h3>
              <p className="text-xs text-white/70 leading-relaxed mt-1">
                Você concluiu com êxito o X-Bolo Gourmet Lucrativo e está pronto(a) para transformar conhecimento em renda!
              </p>
            </div>
          </div>

          {/* How to use */}
          <div className="bg-white border border-[#E5DED3] rounded-2xl p-5 space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-bold text-[#4E2A1E] uppercase tracking-wider">Como usar seu certificado</h4>
            <ul className="space-y-4">
              {[
                { icon: <Printer className="w-5 h-5 text-[#4E2A1E]/70" />, title: 'Imprimir em casa', desc: 'Clique no botão abaixo e imprima em papel A4 horizontal.' },
                { icon: <FileText className="w-5 h-5 text-[#4E2A1E]/70" />, title: 'Salvar em PDF', desc: 'No diálogo de impressão, escolha "Salvar como PDF".' },
                { icon: <Share2 className="w-5 h-5 text-[#4E2A1E]/70" />, title: 'Compartilhar online', desc: 'Tire um print e compartilhe no Instagram ou WhatsApp.' },
                { icon: <Briefcase className="w-5 h-5 text-[#4E2A1E]/70" />, title: 'Portfólio profissional', desc: 'Adicione ao seu currículo ou portfólio de confeiteira.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F1EA] flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#4E2A1E]">{item.title}</p>
                    <p className="text-[11px] text-[#4E2A1E]/60 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Share tip */}
          <div className="bg-[#FAEFE4] border border-[#E5DED3] rounded-2xl p-4 flex items-start space-x-3 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-[#4E2A1E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-4.5 h-4.5 text-[#4E2A1E]" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#4E2A1E]/50 uppercase tracking-wider">Dica Especial</p>
              <p className="text-xs text-[#4E2A1E]/80 leading-relaxed mt-0.5">
                Mostre seu certificado para seus clientes! Isso gera <strong>confiança, credibilidade</strong> e justifica o preço premium do seu produto.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
