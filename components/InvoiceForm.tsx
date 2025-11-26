import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceItem } from '../types';
import { Icons } from './Icons';

interface InvoiceFormProps {
  initialData: Partial<Invoice>;
  image: string;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ initialData, image, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Invoice>>({
    items: [],
    subtotal: 0,
    taxAmount: 0,
    total: 0,
    ...initialData
  });

  // Auto-calculate VAT if missing but Subtotal exists (Standard 21%)
  useEffect(() => {
    if (formData.subtotal && !formData.taxAmount) {
      const estimatedVat = parseFloat((formData.subtotal * 0.21).toFixed(2));
      const estimatedTotal = formData.subtotal + estimatedVat;
      setFormData(prev => ({
        ...prev,
        taxAmount: estimatedVat,
        total: estimatedTotal
      }));
    }
  }, [formData.subtotal]);

  const handleChange = (field: keyof Invoice, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.supplierName || !formData.date || !formData.total) {
      alert("Please fill in required fields (Supplier, Date, Total)");
      return;
    }

    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      invoiceNumber: formData.invoiceNumber || 'INV-' + Date.now(),
      supplierName: formData.supplierName,
      date: formData.date,
      items: formData.items || [],
      subtotal: Number(formData.subtotal) || 0,
      taxRate: 0.21, // Default assumption
      taxAmount: Number(formData.taxAmount) || 0,
      total: Number(formData.total) || 0,
      status: 'Processed',
      originalImage: image
    };

    onSave(newInvoice);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Left: Image Preview */}
      <div className="bg-black border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[600px] lg:h-auto sticky top-4">
        <div className="p-3 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
          <h3 className="text-sm font-medium text-zinc-300">Original Invoice</h3>
          <button className="text-emerald-400 text-xs hover:underline">View Full Size</button>
        </div>
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-zinc-900/20">
          <img src={image} alt="Invoice Scan" className="max-w-full h-auto rounded shadow-lg" />
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col gap-6 overflow-y-auto pr-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Invoice Details</h2>
          <div className="flex gap-2">
             <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800">
               Cancel
             </button>
             <button onClick={handleSave} className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 flex items-center gap-2">
               <Icons.Save size={16} /> Save Invoice
             </button>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-500 mb-1">Supplier Name</label>
              <input 
                type="text" 
                value={formData.supplierName} 
                onChange={(e) => handleChange('supplierName', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Invoice Number</label>
              <input 
                type="text" 
                value={formData.invoiceNumber} 
                onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Date</label>
              <input 
                type="date" 
                value={formData.date} 
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h4 className="text-sm font-medium text-zinc-300 mb-4 flex items-center gap-2">
              <Icons.DollarSign size={14} /> Financials
            </h4>
            <div className="grid grid-cols-3 gap-4">
               <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Net Subtotal</label>
                <input 
                  type="number" 
                  value={formData.subtotal} 
                  onChange={(e) => handleChange('subtotal', parseFloat(e.target.value))}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-emerald-500 mb-1">VAT Amount (21%)</label>
                <input 
                  type="number" 
                  value={formData.taxAmount} 
                  onChange={(e) => handleChange('taxAmount', parseFloat(e.target.value))}
                  className="w-full bg-emerald-950/30 border border-emerald-900/50 rounded-lg px-3 py-2 text-emerald-400 focus:border-emerald-500 focus:outline-none font-mono"
                />
                <p className="text-[10px] text-zinc-500 mt-1">*Exported to Calipso separately</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Total</label>
                <input 
                  type="number" 
                  value={formData.total} 
                  onChange={(e) => handleChange('total', parseFloat(e.target.value))}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h4 className="text-sm font-medium text-zinc-300 mb-4">Line Items Detected</h4>
            <div className="space-y-2">
              {formData.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-sm bg-zinc-950 p-2 rounded border border-zinc-800/50">
                  <span className="w-8 text-zinc-500 text-xs">x{item.quantity}</span>
                  <span className="flex-1 text-zinc-300">{item.description}</span>
                  <span className="text-white font-mono">${item.total.toFixed(2)}</span>
                </div>
              ))}
              {(!formData.items || formData.items.length === 0) && (
                 <div className="text-xs text-zinc-500 italic text-center py-2">No individual line items detected. Summary only.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};