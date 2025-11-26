import React from 'react';
import { Icons } from './Icons';
import { View } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: View;
  onNavigate: (view: View) => void;
}

const navItems: { label: View; icon: any; display: string }[] = [
  { label: 'Dashboard', display: 'Dashboard', icon: Icons.Dashboard },
  { label: 'NewInvoice', display: 'Nueva Factura', icon: Icons.Plus },
  { label: 'Invoices', display: 'Facturas', icon: Icons.FileText },
  { label: 'Settings', display: 'Configuración', icon: Icons.Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onNavigate }) => {
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
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]">
              <Icons.FileText size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">FacturaAI</span>
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden text-zinc-400">
            <Icons.Close size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.label);
                onClose();
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${currentView === item.label 
                  ? 'bg-zinc-900 text-white border border-zinc-800 shadow-inner' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50 hover:border-transparent'}
              `}
            >
              <item.icon size={18} className={currentView === item.label ? 'text-emerald-400' : ''} />
              {item.display}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2 text-emerald-400">
              <Icons.Download size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Calipso Ready</span>
            </div>
            <p className="text-xs text-zinc-400">Generates XLS/CSV format compatible with Calipso import.</p>
          </div>
        </div>
      </aside>
    </>
  );
};