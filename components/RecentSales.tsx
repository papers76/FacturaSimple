import React, { useState } from 'react';
import { RecentTransaction } from '../types';

interface RecentSalesProps {
  transactions: RecentTransaction[];
}

export const RecentSales: React.FC<RecentSalesProps> = ({ transactions }) => {
  const [showAll, setShowAll] = useState(false);

  // Show only 5 items if not "showAll"
  const displayTransactions = showAll ? transactions : transactions.slice(0, 5);

  if (transactions.length === 0) {
    return (
      <div className="bg-black border border-zinc-800 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-bold text-white mb-2">No Transactions</h3>
        <p className="text-sm text-zinc-500">No matching transactions found.</p>
      </div>
    );
  }

  return (
    <div className="bg-black border border-zinc-800 rounded-xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-white mb-1">Recent Transactions</h3>
      <p className="text-sm text-zinc-500 mb-6">
        You made {transactions.filter(t => t.status === 'Completed').length} successful sales.
      </p>

      <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[400px]">
        {displayTransactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.user} className="w-9 h-9 rounded-full ring-1 ring-zinc-800 object-cover" />
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
      
      {transactions.length > 5 && (
        <button 
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-6 py-2 text-xs font-medium text-zinc-400 hover:text-white border border-dashed border-zinc-800 rounded-lg hover:border-zinc-600 hover:bg-zinc-900 transition-all"
        >
          {showAll ? 'Show Less' : 'View All Transactions'}
        </button>
      )}
    </div>
  );
};