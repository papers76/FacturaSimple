import React, { useState, useMemo } from 'react';
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
  const [timeRange, setTimeRange] = useState<'6m' | '1y'>('1y');

  const filteredData = useMemo(() => {
    if (timeRange === '6m') {
      return data.slice(-6);
    }
    return data;
  }, [data, timeRange]);

  return (
    <div className="bg-black border border-zinc-800 rounded-xl p-6 col-span-1 lg:col-span-2 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
          <p className="text-sm text-zinc-500">Monthly revenue vs expenses performance</p>
        </div>
        <div className="flex items-center gap-2">
           <select 
             value={timeRange}
             onChange={(e) => setTimeRange(e.target.value as '6m' | '1y')}
             className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
           >
             <option value="6m">Last 6 Months</option>
             <option value="1y">Last Year</option>
           </select>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
                backgroundColor: '#000', 
                borderColor: '#27272a', 
                borderRadius: '8px',
                color: '#fff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
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
              name="Revenue"
            />
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorProfit)" 
              name="Profit"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};