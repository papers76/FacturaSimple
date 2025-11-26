import React from 'react';
import { Icons } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: Icons.Dashboard, active: true },
  { label: 'Analytics', icon: Icons.Analytics, active: false },
  { label: 'Customers', icon: Icons.Users, active: false },
  { label: 'Projects', icon: Icons.Briefcase, active: false },
  { label: 'Settings', icon: Icons.Settings, active: false },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 z-50 bg-black border-r border-zinc-800 flex flex-col
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">OA</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Obsidian</span>
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden text-zinc-400">
            <Icons.Close size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${item.active 
                  ? 'bg-zinc-900 text-white' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}
              `}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-4 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <Icons.Sparkles size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Pro Plan</span>
            </div>
            <p className="text-xs text-zinc-400 mb-3">Upgrade for advanced AI analytics.</p>
            <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};