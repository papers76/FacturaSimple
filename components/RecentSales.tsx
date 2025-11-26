import React from 'react';
import { RecentTransaction } from '../types';

interface RecentSalesProps {
  transactions: RecentTransaction[];
}

export const RecentSales: React.FC<RecentSalesProps> = ({ transactions }) => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6 h-full">
      <h3 className="text-lg font-bold text-white mb-1">Recent Transactions</h3>
      <p className="text-sm text-zinc-500 mb-6">You made {transactions.length} sales today.</p>

      <div className="space-y-6">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.user} className="w-9 h-9 rounded-full ring-1 ring-zinc-800" />
              <div>
                <p className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">{t.user}</p>
                <p className="text-xs text-zinc-500">{t.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">{t.amount}</p>
              <p className={`text-[10px] font-medium uppercase tracking-wide ${
                t.status === 'Completed' ? 'text-emerald-500' : 
                t.status === 'Pending' ? 'text-amber-500' : 'text-rose-500'
              }`}>
                {t.status}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 text-xs font-medium text-zinc-400 hover:text-white border border-dashed border-zinc-800 rounded-lg hover:border-zinc-600 transition-all">
        View All Transactions
      </button>
    </div>
  );
};