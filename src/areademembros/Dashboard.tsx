import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Gift, Award, Calculator } from 'lucide-react';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { ProgressCard } from './components/ProgressCard';
import { MaterialCard } from './components/MaterialCard';
import { Certificate } from './Certificate';
import { ALL_MATERIALS, MAIN_MATERIALS, BONUS_MATERIALS } from './data/materials';
import { PdfModal } from './components/PdfModal';
import { CostCalculator } from './components/CostCalculator';
import confetti from 'canvas-confetti';

type Tab = 'materiais' | 'bonus' | 'calculadora' | 'certificado';

const STORAGE_KEY = 'xbolo_viewed_materials';
const AUTH_KEY = 'xbolo_user';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem(AUTH_KEY);

  // Auth guard — redirect to /login if not authenticated
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryName = params.get('name');
    if (queryName) {
      localStorage.setItem('xbolo_user_name', queryName);
    }
    if (!userEmail) {
      navigate('/login', { replace: true });
    }
  }, [userEmail, navigate]);

  const [activeTab, setActiveTab] = useState<Tab>('materiais');
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfOpen, setPdfOpen] = useState(false);
  const [selectedPdfTitle, setSelectedPdfTitle] = useState('');

  const [viewedIds, setViewedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [completionDate] = useState(() => {
    return localStorage.getItem('xbolo_completion_date') || new Date().toLocaleDateString('pt-BR');
  });

  const totalMaterials = ALL_MATERIALS.length;
  const viewedCount = viewedIds.length;
  const progress = Math.round((viewedCount / totalMaterials) * 100);
  const isComplete = viewedCount === totalMaterials;

  // Persist viewed state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedIds));
    if (viewedIds.length === totalMaterials) {
      localStorage.setItem('xbolo_completion_date', new Date().toLocaleDateString('pt-BR'));
    }
  }, [viewedIds, totalMaterials]);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate('/login', { replace: true });
  };

  const toggleViewed = (id: string) => {
    setViewedIds((prev) => {
      const wasViewed = prev.includes(id);
      if (!wasViewed) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#4E2A1E', '#F4C95D', '#E5DED3', '#22c55e']
        });
      }
      return wasViewed ? prev.filter((v) => v !== id) : [...prev, id];
    });
  };

  const filterMaterials = (materials: typeof ALL_MATERIALS) => {
    if (!searchQuery.trim()) return materials;
    const q = searchQuery.toLowerCase();
    return materials.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.tag ?? '').toLowerCase().includes(q)
    );
  };

  const handleOpenPdf = (material: typeof ALL_MATERIALS[0]) => {
    setSelectedPdfTitle(material.title);
    setPdfOpen(true);
  };

  const filteredMain = filterMaterials(MAIN_MATERIALS);
  const filteredBonus = filterMaterials(BONUS_MATERIALS);
  const filteredAll = filterMaterials(ALL_MATERIALS);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    {
      id: 'materiais',
      label: 'Materiais',
      icon: <BookOpen className="w-4 h-4" />,
      count: MAIN_MATERIALS.length,
    },
    {
      id: 'bonus',
      label: 'Bônus',
      icon: <Gift className="w-4 h-4" />,
      count: BONUS_MATERIALS.length,
    },
    {
      id: 'calculadora',
      label: 'Calculadora',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'certificado',
      label: 'Certificado',
      icon: <Award className="w-4 h-4" />,
    },
  ];

  const showingSearch = searchQuery.trim().length > 0;

  if (!userEmail) return null;

  return (
    <div className="min-h-screen bg-[#F5F1EA] font-sans antialiased flex flex-col">
      <Header onLogout={handleLogout} onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="flex-1 pb-24 max-w-6xl mx-auto w-full px-0 md:px-4">
        {/* Search results mode */}
        {showingSearch ? (
          <div className="pt-4 px-4 space-y-3">
            <p className="text-xs font-mono text-[#4E2A1E]/50 uppercase tracking-wider">
              {filteredAll.length} resultado(s) para "{searchQuery}"
            </p>
            {filteredAll.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="text-3xl">🔍</p>
                <p className="text-sm text-[#4E2A1E]/50">Nenhum material encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0">
                {filteredAll.map((m) => (
                  <MaterialCard
                    key={m.id}
                    material={m}
                    isViewed={viewedIds.includes(m.id)}
                    onToggleViewed={toggleViewed}
                    onOpen={handleOpenPdf}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Banner + Progress */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-0">
              <div className="md:col-span-2">
                <Banner userName={userEmail} />
              </div>
              <div className="md:col-span-1">
                <ProgressCard viewed={viewedCount} total={totalMaterials} />
              </div>
            </div>

            {/* Tab bar */}
            <div className="sticky top-[72px] z-30 bg-[#F5F1EA] px-4 md:px-0 pb-3 pt-1">
              <div className="flex bg-white border border-[#E5DED3] rounded-2xl p-1 shadow-sm max-w-md md:max-w-none">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl text-xs font-sans font-bold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#4E2A1E] text-[#F4C95D] shadow-sm'
                        : 'text-[#4E2A1E]/50 hover:text-[#4E2A1E]/80'
                    } ${tab.id === 'certificado' && !isComplete ? 'opacity-60' : ''}`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        activeTab === tab.id
                          ? 'bg-[#F4C95D]/20 text-[#F4C95D]'
                          : 'bg-[#4E2A1E]/5 text-[#4E2A1E]/40'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                    {tab.id === 'certificado' && !isComplete && (
                      <span className="text-[10px]">🔒</span>
                    )}
                    {tab.id === 'certificado' && isComplete && (
                      <span className="text-[10px]">✅</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="px-4 md:px-0">
              {activeTab === 'materiais' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono font-bold text-[#4E2A1E]/50 uppercase tracking-wider">
                      Módulos do Curso
                    </p>
                    <span className="text-[10px] font-mono text-[#4E2A1E]/40">
                      {MAIN_MATERIALS.filter(m => viewedIds.includes(m.id)).length}/{MAIN_MATERIALS.length} vistos
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMain.map((m) => (
                      <MaterialCard
                        key={m.id}
                        material={m}
                        isViewed={viewedIds.includes(m.id)}
                        onToggleViewed={toggleViewed}
                        onOpen={handleOpenPdf}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'bonus' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono font-bold text-[#4E2A1E]/50 uppercase tracking-wider">
                      Bônus Exclusivos
                    </p>
                    <span className="text-[10px] font-mono text-[#4E2A1E]/40">
                      {BONUS_MATERIALS.filter(m => viewedIds.includes(m.id)).length}/{BONUS_MATERIALS.length} vistos
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredBonus.map((m) => (
                      <MaterialCard
                        key={m.id}
                        material={m}
                        isViewed={viewedIds.includes(m.id)}
                        onToggleViewed={toggleViewed}
                        onOpen={handleOpenPdf}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'calculadora' && (
                <CostCalculator />
              )}

              {activeTab === 'certificado' && (
                <Certificate
                  userName={userEmail}
                  completionDate={completionDate}
                  isUnlocked={isComplete}
                  progress={progress}
                />
              )}
            </div>
          </>
        )}
      </main>

      {/* PDF Viewer Modal */}
      <PdfModal
        isOpen={pdfOpen}
        onClose={() => setPdfOpen(false)}
        title={selectedPdfTitle}
      />
    </div>
  );
};
