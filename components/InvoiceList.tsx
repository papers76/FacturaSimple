
import React from 'react';
import { Invoice } from '../types';
import { Icons } from './Icons';

interface InvoiceListProps {
  invoices: Invoice[];
  onExport: () => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onExport, onView, onDelete }) => {
  return (
    <div className="bg-black border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h3 className="text-lg font-bold text-white">Processed Invoices</h3>
           <p className="text-sm text-zinc-500">Ready for Calipso Import</p>
        </div>
        <button 
          onClick={onExport}
          disabled={invoices.length === 0}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-emerald-400 hover:bg-zinc-800 hover:text-emerald-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icons.Download size={16} /> Export XLS
        </button>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        {invoices.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-zinc-500">
            <Icons.FileText size={48} className="mb-4 opacity-20" />
            <p>No invoices processed yet.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500 font-medium sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="px-6 py-3 border-b border-zinc-800">Date</th>
                <th className="px-6 py-3 border-b border-zinc-800">Supplier</th>
                <th className="px-6 py-3 border-b border-zinc-800">Invoice #</th>
                <th className="px-6 py-3 border-b border-zinc-800 text-right">Net Amount</th>
                <th className="px-6 py-3 border-b border-zinc-800 text-right">VAT (IVA)</th>
                <th className="px-6 py-3 border-b border-zinc-800 text-right">Total</th>
                <th className="px-6 py-3 border-b border-zinc-800 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-zinc-800/50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-900/30 transition-colors group">
                  <td className="px-6 py-4 text-zinc-400 whitespace-nowrap">{inv.date}</td>
                  <td className="px-6 py-4 text-white font-medium">{inv.supplierName}</td>
                  <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{inv.invoiceNumber}</td>
                  <td className="px-6 py-4 text-zinc-300 text-right font-mono">${inv.subtotal.toFixed(2)}</td>
                  <td className="px-6 py-4 text-emerald-400 text-right font-mono">${inv.taxAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-white text-right font-bold font-mono">${inv.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onView(inv.id)}
                      className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white"
                      title="View Details"
                    >
                      <Icons.Search size={16} />
                    </button>
                    <button 
                       onClick={() => onDelete(inv.id)}
                       className="p-1.5 rounded-md hover:bg-rose-900/20 text-zinc-400 hover:text-rose-500"
                       title="Delete"
                    >
                      <Icons.Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
