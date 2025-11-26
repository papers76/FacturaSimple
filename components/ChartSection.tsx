import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { RevenueData } from '../types';

interface ChartSectionProps {
  data: RevenueData[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6 col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
          <p className="text-sm text-zinc-500">Monthly revenue vs expenses performance</p>
        </div>
        <div className="flex items-center gap-2">
           <select className="bg-black border border-zinc-800 text-zinc-400 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500">
             <option>Last 6 Months</option>
             <option>Last Year</option>
           </select>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#52525b" 
              tick={{ fill: '#71717a', fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#52525b" 
              tick={{ fill: '#71717a', fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#09090b', 
                borderColor: '#27272a', 
                borderRadius: '8px',
                color: '#fff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ color: '#a1a1aa', marginBottom: '8px' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366f1" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorProfit)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};