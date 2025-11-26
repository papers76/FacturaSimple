import React from 'react';
import { Icons } from './Icons';

interface TopBarProps {
  onMenuClick: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, searchValue, onSearchChange }) => {
  return (
    <header className="h-16 bg-black/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-zinc-400 hover:text-white"
        >
          <Icons.Menu size={20} />
        </button>
        <div className="relative hidden md:block">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input 
            type="text" 
            placeholder="Search transactions, users..." 
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-64 bg-zinc-900/50 border border-zinc-800 rounded-full pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => alert("No new notifications")}
        >
          <Icons.Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-black animate-pulse"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Alex Morgan</p>
            <p className="text-xs text-zinc-500">Admin</p>
          </div>
          <button className="focus:outline-none group">
            <img 
              src="https://picsum.photos/100/100" 
              alt="Profile" 
              className="w-9 h-9 rounded-full ring-2 ring-zinc-800 group-hover:ring-zinc-600 transition-all"
            />
          </button>
        </div>
      </div>
    </header>
  );
};