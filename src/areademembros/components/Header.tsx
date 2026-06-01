import React, { useState } from 'react';
import { LogOut, Search, X } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({ onLogout, onSearch, searchQuery }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchToggle = () => {
    if (searchOpen) {
      onSearch('');
    }
    setSearchOpen(!searchOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#4E2A1E] shadow-lg h-[72px] flex items-center justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between px-4">

        {/* Logo — overflowing absolute */}
        <div className={`relative w-28 h-10 flex items-center transition-all duration-300 ${searchOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
          <img
            src="https://i.ibb.co/QvybJJJH/image.png"
            alt="X-Bolo Lucrativo"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-28 max-w-none w-auto object-contain drop-shadow-lg select-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Search bar (expanded) */}
        <div className={`flex-1 transition-all duration-300 ${searchOpen ? 'opacity-100 mr-2' : 'opacity-0 w-0 overflow-hidden pointer-events-none'}`}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar material..."
            autoFocus={searchOpen}
            className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#F4C95D]/60 focus:bg-white/15 transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          <button
            onClick={handleSearchToggle}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all active:scale-90"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
          <button
            onClick={onLogout}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/80 hover:text-[#F4C95D] hover:bg-white/10 transition-all active:scale-90"
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
