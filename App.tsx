
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { InvoiceUploader } from './components/InvoiceUploader';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoiceList } from './components/InvoiceList';
import { DashboardStats } from './components/DashboardStats';
import { Invoice, View } from './types';
import { Icons } from './components/Icons';
import { loadInvoices, saveInvoices } from './services/storageService';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  
  // Initialize state from Storage
  const [invoices, setInvoices] = useState<Invoice[]>(() => loadInvoices());
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for the "New Invoice" flow
  const [draftInvoiceData, setDraftInvoiceData] = useState<Partial<Invoice> | null>(null);
  const [draftImage, setDraftImage] = useState<string | null>(null);

  // Persistence Effect: Save whenever invoices change
  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  // Derived Metrics
  const metrics = useMemo(() => {
    return {
      totalProcessed: invoices.length,
      totalNetAmount: invoices.reduce((sum, inv) => sum + inv.subtotal, 0),
      totalVatAmount: invoices.reduce((sum, inv) => sum + inv.taxAmount, 0),
      pendingExport: invoices.filter(i => i.status !== 'Exported').length
    };
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    if (!searchQuery) return invoices;
    const lowerQ = searchQuery.toLowerCase();
    return invoices.filter(i => 
      i.supplierName.toLowerCase().includes(lowerQ) || 
      i.invoiceNumber.toLowerCase().includes(lowerQ)
    );
  }, [invoices, searchQuery]);

  const handleAnalysisComplete = (data: Partial<Invoice>, image: string) => {
    setDraftInvoiceData(data);
    setDraftImage(image);
  };

  const handleSaveInvoice = (newInvoice: Invoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
    setDraftInvoiceData(null);
    setDraftImage(null);
    setCurrentView('Invoices'); // Go to list after save
  };

  const handleDeleteInvoice = (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleExportCalipso = () => {
    // Generate XLS (Excel) File
    // We use a specific HTML/XML format that Excel recognizes natively.
    
    const tableRows = filteredInvoices.map(inv => `
      <tr>
        <td>${inv.date}</td>
        <td>${inv.supplierName}</td>
        <td style="mso-number-format:'@'">${inv.invoiceNumber}</td>
        <td style="mso-number-format:'0.00'">${inv.subtotal.toFixed(2)}</td>
        <td style="mso-number-format:'0.00'">${inv.taxAmount.toFixed(2)}</td>
        <td style="mso-number-format:'0.00'">${inv.total.toFixed(2)}</td>
      </tr>
    `).join('');

    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Invoices</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      </head>
      <body>
        <table>
          <thead>
            <tr style="background-color: #cccccc; font-weight: bold;">
              <th>Date</th>
              <th>Supplier</th>
              <th>Invoice Number</th>
              <th>Net Amount</th>
              <th>VAT Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `calipso_export_${new Date().toISOString().slice(0,10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Update status to Exported
    setInvoices(prev => prev.map(inv => ({ ...inv, status: 'Exported' })));
  };

  const renderContent = () => {
    if (currentView === 'NewInvoice') {
      if (draftInvoiceData && draftImage) {
        return (
          <InvoiceForm 
            initialData={draftInvoiceData} 
            image={draftImage} 
            onSave={handleSaveInvoice}
            onCancel={() => {
              setDraftInvoiceData(null);
              setDraftImage(null);
            }} 
          />
        );
      }
      return <InvoiceUploader onAnalysisComplete={handleAnalysisComplete} />;
    }

    if (currentView === 'Invoices') {
      return (
        <InvoiceList 
          invoices={filteredInvoices} 
          onExport={handleExportCalipso} 
          onView={(id) => {
             const inv = invoices.find(i => i.id === id);
             if (inv && inv.originalImage) {
               setDraftInvoiceData(inv);
               setDraftImage(inv.originalImage);
               setCurrentView('NewInvoice'); // Re-use form for viewing
             } else if (inv) {
                // If image was stripped due to storage limits
                setDraftInvoiceData(inv);
                setDraftImage("https://placehold.co/600x800/111/444?text=Image+Not+Available");
                setCurrentView('NewInvoice');
             }
          }}
          onDelete={handleDeleteInvoice}
        />
      );
    }

    // Dashboard View
    return (
      <div className="space-y-6">
        <DashboardStats metrics={metrics} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
             <div className="p-4 bg-zinc-900 rounded-full">
               <Icons.Plus size={32} className="text-emerald-500" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-white">Process New Invoice</h3>
               <p className="text-zinc-500 max-w-xs mx-auto mt-2">Upload or scan a new invoice to extract data automatically using Gemini AI.</p>
             </div>
             <button 
               onClick={() => setCurrentView('NewInvoice')}
               className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
             >
               Start Scanning
             </button>
          </div>

          <div className="bg-zinc-900/20 border border-zinc-800 rounded-xl p-6">
             <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
             {invoices.length === 0 ? (
               <p className="text-zinc-500 text-sm">No activity recorded yet.</p>
             ) : (
               <div className="space-y-4">
                 {invoices.slice(0, 5).map(inv => (
                   <div key={inv.id} className="flex items-center justify-between border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <Icons.FileText size={14} />
                       </div>
                       <div>
                         <p className="text-sm font-medium text-white">{inv.supplierName}</p>
                         <p className="text-xs text-zinc-500">{inv.date}</p>
                       </div>
                     </div>
                     <span className="text-sm font-mono text-emerald-400">${inv.total.toFixed(2)}</span>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans flex overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          // Reset draft state when navigating away manually
          if (view !== 'NewInvoice') {
            setDraftInvoiceData(null);
            setDraftImage(null);
          }
        }}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar 
          onMenuClick={() => setSidebarOpen(true)} 
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {currentView === 'NewInvoice' && draftInvoiceData ? 'Edit Details' : 
                   currentView === 'NewInvoice' ? 'Upload Invoice' :
                   currentView === 'Invoices' ? 'All Invoices' : 'Dashboard'}
                </h1>
                <p className="text-zinc-400 mt-1">
                  {currentView === 'Dashboard' && 'Overview of your invoice processing.'}
                  {currentView === 'NewInvoice' && 'AI-powered extraction and verification.'}
                  {currentView === 'Invoices' && 'Manage and export processed documents.'}
                </p>
              </div>
            </div>

            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
