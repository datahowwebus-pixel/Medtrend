import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, ChevronRight, Folder, 
  Sparkles, Layers, ShieldCheck, Download, Search 
} from 'lucide-react';
import { BRAND_GUIDELINES_SECTIONS } from '../data/brandData';

interface BrandGuidelinesPageProps {
  onOpenFolderGuide: () => void;
  onOpenImageManager: () => void;
}

export const BrandGuidelinesPage: React.FC<BrandGuidelinesPageProps> = ({
  onOpenFolderGuide,
  onOpenImageManager
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSections = BRAND_GUIDELINES_SECTIONS.filter((sec) => {
    if (activeCategory !== 'all' && sec.category !== activeCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = sec.title.toLowerCase().includes(q);
      const matchPoints = sec.points.some(p => p.toLowerCase().includes(q));
      return matchTitle || matchPoints;
    }
    return true;
  });

  const categories = Array.from(new Set(BRAND_GUIDELINES_SECTIONS.map(s => s.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24 text-[#0B2838] bg-[#F8FCFE] font-mono">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#B3E5FC] space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
          <FileText className="w-3.5 h-3.5 text-[#0288D1]" />
          <span>Brand Requirements & Implementation Specification</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B2838] max-w-3xl leading-tight font-sans">
          MEDTREND® 50-Point Implementation System
        </h1>

        <p className="text-xs sm:text-sm text-[#355C75] max-w-2xl leading-relaxed font-sans">
          Comprehensive documentation of all 50 structural requirements from the MEDTREND® specifications, covering dual B2B/B2C commerce, folder-driven asset hierarchies, interactive 3D video loops, and Sialkot metallurgical quality standards.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onOpenFolderGuide}
            className="px-5 py-2.5 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
          >
            <Folder className="w-4 h-4 text-[#B3E5FC]" /> Open Folder Guide
          </button>
          <button
            onClick={onOpenImageManager}
            className="px-5 py-2.5 bg-white hover:bg-[#F0F9FF] text-[#0B2838] font-semibold rounded-xl text-xs border border-[#B3E5FC] transition-colors flex items-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#0288D1]" /> Manage Hero Slides
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#B3E5FC] space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#62879F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications (e.g., folder, laser, 3D, Rockwell, B2B)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F4FAFD] focus:bg-white rounded-xl border border-[#B3E5FC] text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#0288D1] text-white'
                  : 'bg-[#F4FAFD] text-[#355C75] hover:text-[#0B2838] border border-[#B3E5FC]'
              }`}
            >
              All Sections (50)
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#0288D1] text-white'
                    : 'bg-[#F4FAFD] text-[#355C75] hover:text-[#0B2838] border border-[#B3E5FC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSections.map((sec) => (
          <div
            key={sec.sectionNumber}
            className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
                  Section {sec.sectionNumber < 10 ? `0${sec.sectionNumber}` : sec.sectionNumber}
                </span>
                <span className="text-[11px] font-medium text-[#355C75]">
                  {sec.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0B2838] font-sans">{sec.title}</h3>

              <ul className="space-y-2 text-xs text-[#355C75] font-sans">
                {sec.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#B3E5FC]/60 text-[11px] font-mono text-[#355C75] flex items-center justify-between">
              <span>Status: Fully Implemented</span>
              <span className="text-[#01579B] font-bold">100% Compliant</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
