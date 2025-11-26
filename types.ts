export interface StatMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  iconName: string;
}

export interface RevenueData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface RecentTransaction {
  id: string;
  user: string;
  avatar: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export interface DashboardData {
  metrics: StatMetric[];
  chartData: RevenueData[];
  transactions: RecentTransaction[];
}

export enum GeminiStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}