import React, { useCallback, useState, useRef } from 'react';
import { Icons } from './Icons';
import { analyzeInvoiceImage } from '../services/geminiService';
import { Invoice } from '../types';

interface InvoiceUploaderProps {
  onAnalysisComplete: (data: Partial<Invoice>, image: string) => void;
}

export const InvoiceUploader: React.FC<InvoiceUploaderProps> = ({ onAnalysisComplete }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for direct input manipulation
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG).');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const analyzedData = await analyzeInvoiceImage(base64String);
        onAnalysisComplete(analyzedData, base64String);
      } catch (err) {
        setError('Failed to analyze invoice. Please try again or enter details manually.');
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
    // Reset value to allow selecting the same file again if needed
    if (e.target) {
      e.target.value = '';
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <div 
        className={`
          w-full max-w-2xl min-h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 transition-all
          ${isDragOver 
            ? 'border-emerald-500 bg-emerald-500/10 scale-[1.02]' 
            : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700'}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        {isAnalyzing ? (
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin"></div>
              <Icons.FileText className="absolute inset-0 m-auto text-emerald-500" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Analyzing Invoice...</h3>
              <p className="text-zinc-400">Gemini is extracting supplier, date, and tax details.</p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6 w-full max-w-md">
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-zinc-800 shadow-xl">
              <Icons.Upload size={40} className="text-zinc-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Upload or Scan Invoice</h3>
              <p className="text-zinc-400">
                Drag and drop your invoice image, or use the buttons below.
              </p>
            </div>
            
            {/* Hidden Inputs */}
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileInput} 
            />
            <input 
              ref={cameraInputRef}
              type="file" 
              className="hidden" 
              accept="image/*"
              capture="environment" 
              onChange={handleFileInput} 
            />

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              {/* Standard File Select Button */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-colors border border-zinc-700 flex items-center justify-center gap-2 group"
              >
                <Icons.Image size={18} className="text-zinc-400 group-hover:text-white" />
                Select File
              </button>

              {/* Camera Scan Button (Mobile Optimized) */}
              <button 
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
              >
                <Icons.Camera size={18} />
                Scan Invoice
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2 text-rose-400 justify-center">
                <Icons.Alert size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};