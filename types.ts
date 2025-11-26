export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number; // Net Amount
  taxRate: number; // e.g., 0.21 for 21%
  taxAmount: number; // VAT Amount
  total: number; // Subtotal + VAT
  status: 'Draft' | 'Processed' | 'Exported';
  originalImage?: string; // Base64 string
}

export type View = 'Dashboard' | 'NewInvoice' | 'Invoices' | 'Settings';

export interface DashboardMetrics {
  totalProcessed: number;
  totalNetAmount: number;
  totalVatAmount: number;
  pendingExport: number;
}

export interface StatMetric {
  label: string;
  value: string;
  change: number;
  iconName: string;
}

export interface RevenueData {
  date: string;
  revenue: number;
  profit: number;
}

export interface RecentTransaction {
  id: string;
  user: string;
  avatar: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export enum GeminiStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
