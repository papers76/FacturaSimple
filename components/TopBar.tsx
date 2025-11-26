import React from 'react';
import { Icons } from './Icons';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
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
            placeholder="Search analytics..." 
            className="h-9 w-64 bg-zinc-900/50 border border-zinc-800 rounded-full pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
          <Icons.Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-black"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Alex Morgan</p>
            <p className="text-xs text-zinc-500">Admin</p>
          </div>
          <img 
            src="https://picsum.photos/100/100" 
            alt="Profile" 
            className="w-9 h-9 rounded-full ring-2 ring-zinc-800"
          />
        </div>
      </div>
    </header>
  );
};