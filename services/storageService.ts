
import { Invoice } from "../types";

const STORAGE_KEY = 'obsidian_invoices_v1';

export const loadInvoices = (): Invoice[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    // Ensure dates are strings or Date objects as needed, though JSON keeps strings
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load invoices from storage:", error);
    return [];
  }
};

export const saveInvoices = (invoices: Invoice[]) => {
  try {
    const serialized = JSON.stringify(invoices);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error: any) {
    // Handle QuotaExceededError (Storage is full)
    // LocalStorage is usually limited to ~5MB. Images fill this fast.
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      console.warn("Storage full. Attempting to save without images to preserve history metadata.");
      
      // Create a copy of invoices without the base64 image string to save space
      const lightInvoices = invoices.map(inv => {
        const { originalImage, ...rest } = inv;
        return rest; // Return object without the heavy image data
      });
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lightInvoices));
        alert("Warning: Local storage is full. Invoice history saved, but images were removed to save space.");
      } catch (retryError) {
        console.error("Even lightweight save failed:", retryError);
      }
    } else {
      console.error("Failed to save invoices:", error);
    }
  }
};
