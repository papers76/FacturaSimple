import React from 'react';
import { StatMetric } from '../types';
import { Icons } from './Icons';

interface MetricCardProps {
  metric: StatMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  // Dynamically get icon component
  const IconComponent = (Icons as any)[metric.iconName] || Icons.Activity;
  const isPositive = metric.change >= 0;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6 hover:bg-zinc-900/60 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors">
          <IconComponent size={20} />
        </div>
        <div className={`
          flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border
          ${isPositive 
            ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' 
            : 'text-rose-400 bg-rose-400/10 border-rose-400/20'}
        `}>
          {isPositive ? <Icons.TrendingUp size={12} /> : <Icons.TrendingDown size={12} />}
          <span>{Math.abs(metric.change)}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-zinc-500 font-medium">{metric.label}</p>
        <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">{metric.value}</h3>
      </div>
    </div>
  );
};