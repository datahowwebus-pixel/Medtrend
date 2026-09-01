import React, { useState } from 'react';
import { 
  FileText, Download, Printer, Search, Check, 
  ExternalLink, Eye, Layers, ShieldCheck, Sparkles, Box 
} from 'lucide-react';
import { PRODUCTS, CATEGORIES_TREE } from '../data/productsData';
import { Product } from '../types';

interface CatalogDataSheetsPageProps {
  onOpenDataSheet: (product: Product) => void;
  onOpenRFQ: (product?: Product) => void;
}

export const CatalogDataSheetsPage: React.FC<CatalogDataSheetsPageProps> = ({
  onOpenDataSheet,
  onOpenRFQ
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = PRODUCTS.filter(p => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24 text-[#0B2838] bg-[#F8FCFE]">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#B3E5FC] flex flex-col md:flex-row items-center justify-between gap-8 font-mono shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
            <FileText className="w-3.5 h-3.5 text-[#0288D1]" />
            <span>Digital Library & Technical Data Sheets (TDS)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2838] leading-tight font-sans">
            Digital Catalogs & Spec Sheets
          </h1>

          <p className="text-xs sm:text-sm text-[#355C75] leading-relaxed font-sans">
            Download individual instrument technical datasheets for hospital procurement committees, or download the comprehensive MEDTREND® master catalog edition with complete dimensional tables.
          </p>
        </div>

        <div className="p-6 bg-[#F4FAFD] rounded-2xl border border-[#B3E5FC] space-y-3 shrink-0 text-center w-full md:w-auto shadow-xs">
          <div className="text-xs font-bold text-[#0288D1] uppercase">Complete Master Catalog</div>
          <div className="text-lg font-bold text-[#0B2838] font-sans">MEDTREND 2026 Edition</div>
          <div className="text-xs text-[#62879F]">PDF • 14.8 MB • 350+ SKUs</div>
          <button
            onClick={() => alert("Downloading MEDTREND Master Surgical Catalog 2026 Edition (PDF)...")}
            className="w-full py-2.5 px-4 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
          >
            <Download className="w-4 h-4 text-[#B3E5FC]" /> Download Master PDF
          </button>
        </div>
      </div>

      {/* Filter & Search TDS Database */}
      <div className="bg-white p-5 rounded-2xl border border-[#B3E5FC] space-y-4 font-mono shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#62879F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code (e.g. MT-SC-004) or instrument name..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F4FAFD] focus:bg-white rounded-xl border border-[#B3E5FC] text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="p-2.5 text-xs rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none w-full sm:w-auto font-mono"
            >
              <option value="all">All Specialties ({PRODUCTS.length})</option>
              {CATEGORIES_TREE.map(c => (
                <option key={c.slug} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* TDS Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F4FAFD] text-[#62879F] font-bold border-b border-[#B3E5FC]">
              <tr>
                <th className="p-3">SKU Code</th>
                <th className="p-3">Instrument Name</th>
                <th className="p-3">Category / Sub-Folder</th>
                <th className="p-3">Metallurgy & Hardness</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B3E5FC]/60">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#F4FAFD] transition-colors">
                  <td className="p-3 font-mono font-bold text-[#0288D1]">
                    {prod.code}
                  </td>
                  <td className="p-3 font-semibold text-[#0B2838] font-sans">
                    {prod.name}
                  </td>
                  <td className="p-3 text-[#355C75]">
                    {prod.category} • <span className="text-[11px] text-[#62879F]">{prod.subCategory}</span>
                  </td>
                  <td className="p-3 text-[#355C75] font-mono text-[11px]">
                    {prod.material} ({prod.hardness})
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => onOpenDataSheet(prod)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F0F9FF] border border-[#B3E5FC] text-[#0B2838] font-semibold inline-flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#0288D1]" /> View & Print TDS
                    </button>
                    <button
                      onClick={() => onOpenRFQ(prod)}
                      className="px-3 py-1.5 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold inline-flex items-center gap-1 text-[11px] uppercase tracking-wider shadow-xs"
                    >
                      RFQ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
