import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MetricCard } from './components/MetricCard';
import { ChartSection } from './components/ChartSection';
import { RecentSales } from './components/RecentSales';
import { AiInsightWidget } from './components/AiInsightWidget';
import { generateExecutiveSummary } from './services/geminiService';
import { DashboardData } from './types';

// Mock Data
const MOCK_DATA: DashboardData = {
  metrics: [
    { id: '1', label: 'Total Revenue', value: '$45,231.89', change: 20.1, trend: 'up', iconName: 'DollarSign' },
    { id: '2', label: 'Active Users', value: '2,350', change: 15.2, trend: 'up', iconName: 'Users' },
    { id: '3', label: 'Bounce Rate', value: '42.3%', change: -5.4, trend: 'down', iconName: 'Activity' },
    { id: '4', label: 'Avg. Session', value: '4m 32s', change: 1.2, trend: 'neutral', iconName: 'Briefcase' },
  ],
  chartData: [
    { date: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
    { date: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
    { date: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
    { date: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
    { date: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
    { date: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
    { date: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
    { date: 'Aug', revenue: 4200, expenses: 2100, profit: 2100 },
    { date: 'Sep', revenue: 5100, expenses: 2300, profit: 2800 },
    { date: 'Oct', revenue: 5800, expenses: 2500, profit: 3300 },
    { date: 'Nov', revenue: 6500, expenses: 2800, profit: 3700 },
    { date: 'Dec', revenue: 7200, expenses: 3100, profit: 4100 },
  ],
  transactions: [
    { id: '1', user: 'Olivia Martin', avatar: 'https://picsum.photos/101/101', amount: '$1,999.00', status: 'Completed', date: '2 min ago' },
    { id: '2', user: 'Jackson Lee', avatar: 'https://picsum.photos/102/102', amount: '$39.00', status: 'Pending', date: '15 min ago' },
    { id: '3', user: 'Isabella Nguyen', avatar: 'https://picsum.photos/103/103', amount: '$299.00', status: 'Completed', date: '1 hour ago' },
    { id: '4', user: 'William Kim', avatar: 'https://picsum.photos/104/104', amount: '$99.00', status: 'Failed', date: '3 hours ago' },
    { id: '5', user: 'Sofia Davis', avatar: 'https://picsum.photos/105/105', amount: '$149.00', status: 'Completed', date: '5 hours ago' },
  ]
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleGenerateInsight = useCallback(async () => {
    return await generateExecutiveSummary(MOCK_DATA);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Page Title & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                <p className="text-zinc-400 mt-1">Overview of your project performance and metrics.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
                  Download Report
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-[0_0_15px_-3px_rgba(79,70,229,0.5)]">
                  + New Campaign
                </button>
              </div>
            </div>

            {/* AI Insights Section */}
            <AiInsightWidget onGenerate={handleGenerateInsight} />

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_DATA.metrics.map(metric => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>

            {/* Charts & Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartSection data={MOCK_DATA.chartData} />
              <div className="col-span-1">
                <RecentSales transactions={MOCK_DATA.transactions} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;