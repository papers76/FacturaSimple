import React from 'react';
import { Icons } from './Icons';
import { DashboardMetrics } from '../types';

export const DashboardStats: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
           <span className="text-zinc-500 text-xs font-medium uppercase">Processed Invoices</span>
           <Icons.FileText size={16} className="text-indigo-500" />
        </div>
        <h3 className="text-2xl font-bold text-white">{metrics.totalProcessed}</h3>
      </div>
      
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
           <span className="text-zinc-500 text-xs font-medium uppercase">Net Amount</span>
           <Icons.DollarSign size={16} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-white">${metrics.totalNetAmount.toLocaleString()}</h3>
        <p className="text-xs text-zinc-500 mt-1">Excluding Tax</p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
           <span className="text-zinc-500 text-xs font-medium uppercase">VAT (IVA) Recoverable</span>
           <Icons.TrendingUp size={16} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-400">${metrics.totalVatAmount.toLocaleString()}</h3>
        <p className="text-xs text-zinc-500 mt-1">Ready for Calipso</p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
           <span className="text-zinc-500 text-xs font-medium uppercase">Pending Export</span>
           <Icons.Alert size={16} className="text-amber-500" />
        </div>
        <h3 className="text-2xl font-bold text-white">{metrics.pendingExport}</h3>
      </div>
    </div>
  );
}