import React, { useState } from 'react';
import { 
  Building, Globe, ShieldCheck, FileText, CheckCircle2, 
  Package, Award, Send, Sliders, ChevronRight, Lock, Sparkles, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_CONFIG } from '../data/brandData';
import { PRODUCTS } from '../data/productsData';

interface B2BWholesalePageProps {
  onOpenRFQ: () => void;
  onNavigateToProducts: () => void;
}

export const B2BWholesalePage: React.FC<B2BWholesalePageProps> = ({
  onOpenRFQ,
  onNavigateToProducts
}) => {
  const [activeTab, setActiveTab] = useState<'oem' | 'distributor' | 'tiers' | 'calculator'>('oem');
  
  // Instant Wholesale Calculator State
  const [calcQuantity, setCalcQuantity] = useState<number>(500);
  const [calcTierType, setCalcTierType] = useState<'standard' | 'tungsten_carbide' | 'titanium'>('standard');
  const [includeLaser, setIncludeLaser] = useState(true);
  const [includeCustomBox, setIncludeCustomBox] = useState(true);
  const [calcSubmitted, setCalcSubmitted] = useState(false);

  const getBaseUnitPrice = () => {
    if (calcTierType === 'tungsten_carbide') return 28.0;
    if (calcTierType === 'titanium') return 34.0;
    return 16.0; // standard
  };

  const getVolumeDiscountPct = (qty: number) => {
    if (qty >= 5000) return 0.45; // 45% off
    if (qty >= 1000) return 0.35; // 35% off
    if (qty >= 500) return 0.25;  // 25% off
    if (qty >= 100) return 0.15;  // 15% off
    return 0;
  };

  const basePrice = getBaseUnitPrice();
  const discountPct = getVolumeDiscountPct(calcQuantity);
  const discountedUnitPrice = basePrice * (1 - discountPct);
  const totalCost = discountedUnitPrice * calcQuantity;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 text-[#0B2838] bg-[#F8FCFE]">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#B3E5FC] relative overflow-hidden font-mono shadow-sm">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
            <Globe className="w-3.5 h-3.5 text-[#0288D1]" />
            <span>International B2B Supply & Institutional Trade</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#0B2838] font-sans">
            OEM, Private Label & Bulk Wholesale
          </h1>

          <p className="text-xs sm:text-sm text-[#355C75] leading-relaxed font-sans">
            Direct from our Sialkot manufacturing facilities to medical distributors, hospital chains, and private-label brands across the United States, European Union, GCC, and worldwide.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenRFQ}
              className="px-6 py-3 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
            >
              <FileText className="w-4 h-4 text-[#B3E5FC]" />
              Request Formal Institutional RFQ
            </button>
            <button
              onClick={onNavigateToProducts}
              className="px-5 py-3 rounded-xl bg-white hover:bg-[#F0F9FF] text-[#0B2838] font-semibold text-xs sm:text-sm border border-[#B3E5FC] transition-colors"
            >
              Explore Wholesale Catalog
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#B3E5FC] gap-2 overflow-x-auto font-mono">
        {[
          { id: 'oem', label: 'OEM & Private Label Services' },
          { id: 'distributor', label: 'Become a Regional Distributor' },
          { id: 'calculator', label: 'Instant Volume Price Estimator' },
          { id: 'tiers', label: 'Export Logistics & Compliance' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-5 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === tab.id
                ? 'border-[#0288D1] text-[#01579B] bg-[#E1F5FE] rounded-t-xl font-bold'
                : 'border-transparent text-[#355C75] hover:text-[#0B2838]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: OEM & Private Label */}
      {activeTab === 'oem' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="p-8 rounded-2xl bg-white border border-[#B3E5FC] flex flex-col md:flex-row items-center justify-between gap-6 font-mono shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0288D1]">
                Core OEM Proposition
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B2838] font-sans">
                "Your Brand. Our Manufacturing."
              </h2>
              <p className="text-xs sm:text-sm text-[#355C75] max-w-xl font-sans">
                We manufacture complete surgical lines under your proprietary brand identity with turnkey private labeling, custom laser etching, customized catalog codes, and sterile medical packaging.
              </p>
            </div>
            <button
              onClick={onOpenRFQ}
              className="px-6 py-3 rounded-xl bg-[#0288D1] text-white font-bold text-xs sm:text-sm shrink-0 hover:bg-[#0277BD] transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
            >
              Start Private Label Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center font-bold border border-[#81D4FA]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2838] font-sans">Custom Fiber Laser Marking</h3>
              <p className="text-xs text-[#355C75] leading-relaxed font-sans">
                Precision laser engraving of your company logo, proprietary product codes (e.g. YOUR-BRAND-001), UDI barcodes, and lot numbers on instrument shanks with zero corrosion vulnerability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center font-bold border border-[#81D4FA]">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2838] font-sans">Custom Branded Packaging</h3>
              <p className="text-xs text-[#355C75] leading-relaxed font-sans">
                Custom color blister packs, rigid magnetic gift boxes, sterile peel-pouches, and master corrugated cartons fully customized with your brand logo, barcodes, and regulatory text.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center font-bold border border-[#81D4FA]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2838] font-sans">Bespoke Surgical Set Kits</h3>
              <p className="text-xs text-[#355C75] leading-relaxed font-sans">
                Custom laser-cut sterilization cassettes with custom instrument combinations for specialty surgeons, military hospitals, and international tender bids.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Distributor Application */}
      {activeTab === 'distributor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2 font-mono">
              <h2 className="text-2xl font-bold text-[#0B2838] font-sans">Join MEDTREND® Global Distributor Network</h2>
              <p className="text-xs sm:text-sm text-[#355C75] leading-relaxed font-sans">
                We are actively recruiting authorized regional distributors, surgical stockists, and hospital procurement partners in North America, Western Europe, and GCC territories.
              </p>
            </div>

            <div className="space-y-3 font-mono">
              {[
                { title: 'Exclusive Territory Protection', desc: 'Secure authorized sales rights in your assigned state, country, or healthcare network.' },
                { title: 'Subsidized Demonstration Samples', desc: 'Complimentary sample sets for clinical evaluations by chief surgeons.' },
                { title: 'Digital & Print Marketing Kits', desc: 'Unbranded or co-branded high-res catalogs, 3D CAD loops, and technical spec sheets.' },
                { title: 'Direct Factory Technical Support', desc: 'Metallurgical test reports, material certs (ASTM A967), and rapid batch replacement guarantees.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#B3E5FC] flex items-start gap-3 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#0288D1] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2838] font-sans">{item.title}</h4>
                    <p className="text-xs text-[#355C75] mt-0.5 font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-4 font-mono shadow-sm">
            <h3 className="text-base font-bold text-[#0B2838] border-b border-[#B3E5FC] pb-2 font-sans">
              Distributor Application Form
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#355C75] mb-1">Company Legal Entity *</label>
                <input type="text" placeholder="e.g. MedSupply Gulf FZ-LLC" className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#355C75] mb-1">Country / Territory *</label>
                  <input type="text" placeholder="e.g. United Arab Emirates" className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none font-mono" />
                </div>
                <div>
                  <label className="block font-bold text-[#355C75] mb-1">Annual Turnover (USD) *</label>
                  <select className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none font-mono">
                    <option>$100k - $500k</option>
                    <option>$500k - $2M</option>
                    <option>$2M - $10M+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#355C75] mb-1">Existing Customer Base</label>
                <textarea rows={2} placeholder="Hospitals, dental clinics, veterinary networks you currently supply..." className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none font-mono" />
              </div>

              <button
                onClick={onOpenRFQ}
                className="w-full py-3 bg-[#0288D1] hover:bg-[#0277BD] text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
              >
                <Send className="w-3.5 h-3.5 text-[#B3E5FC]" />
                Submit Distributor Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Instant Volume Price Estimator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in">
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-5 font-mono shadow-sm">
            <h3 className="text-base font-bold text-[#0B2838] border-b border-[#B3E5FC] pb-2 font-sans">
              Instant B2B Order Cost Estimator
            </h3>

            <div className="space-y-4 text-xs text-[#355C75]">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-[#0B2838]">Required Quantity (Units):</label>
                  <span className="font-mono text-[#0288D1] font-bold text-sm">{calcQuantity} Units</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#E1F5FE] rounded appearance-none cursor-pointer accent-[#0288D1]"
                />
                <div className="flex justify-between text-[10px] text-[#62879F] font-mono mt-1">
                  <span>50 pcs</span>
                  <span>500 pcs (25% off)</span>
                  <span>1,000 pcs (35% off)</span>
                  <span>5,000+ pcs (45% off)</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0B2838] mb-1.5">Instrument Grade / Metallurgy:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', label: 'Standard AISI 420', sub: 'German Forged' },
                    { id: 'tungsten_carbide', label: 'TC Gold Inserts', sub: 'Tungsten Carbide' },
                    { id: 'titanium', label: 'Blue Titanium', sub: 'Micro-Hardness' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setCalcTierType(t.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        calcTierType === t.id
                          ? 'bg-[#E1F5FE] border-[#0288D1] text-[#01579B] font-bold'
                          : 'bg-[#F4FAFD] border-[#B3E5FC] text-[#355C75]'
                      }`}
                    >
                      <div className="text-xs">{t.label}</div>
                      <div className="text-[10px] text-[#62879F] font-normal">{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#B3E5FC]">
                <label className="block font-bold text-[#0B2838]">Included Value-Add Services:</label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={includeLaser} onChange={(e) => setIncludeLaser(e.target.checked)} className="rounded accent-[#0288D1]" />
                    <span>Free Custom Shank Laser Marking & UDI Data Matrix</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={includeCustomBox} onChange={(e) => setIncludeCustomBox(e.target.checked)} className="rounded accent-[#0288D1]" />
                    <span>Export-Grade Barcoded Anti-Corrosion VCI Packaging</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-5 font-mono shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0288D1]">
              Estimated Pricing Summary
            </h3>

            <div className="space-y-3 text-xs text-[#355C75]">
              <div className="flex justify-between">
                <span>Base Catalog Unit Price:</span>
                <span className="text-[#0B2838] font-bold">${basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#0288D1]">
                <span>Volume Discount Applied:</span>
                <span className="font-bold">-{(discountPct * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Effective Unit Price:</span>
                <span className="font-bold text-[#0B2838]">${discountedUnitPrice.toFixed(2)} / pc</span>
              </div>
              <div className="flex justify-between border-t border-[#B3E5FC] pt-3 text-sm">
                <span className="font-bold text-[#0B2838]">Estimated Subtotal (FOB):</span>
                <span className="font-bold text-[#0288D1]">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="p-3 bg-[#F4FAFD] rounded-xl border border-[#B3E5FC] text-[11px] text-[#62879F] space-y-1">
              <p>• Incoterms: FOB Sialkot / CIF USA / EU / GCC Port</p>
              <p>• Lead Time: 12-18 days production & passivated finishing</p>
            </div>

            <button
              onClick={onOpenRFQ}
              className="w-full py-3 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs rounded-xl transition-all uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
            >
              Lock-In This Quotation (Official RFQ)
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Export Logistics */}
      {activeTab === 'tiers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in font-mono">
          <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-3 shadow-sm">
            <span className="text-xs font-bold text-[#0288D1] uppercase">Primary Route 01</span>
            <h3 className="text-lg font-bold text-[#0B2838] font-sans">United States Market</h3>
            <ul className="text-xs text-[#355C75] space-y-1.5 leading-relaxed font-sans">
              <li>• FDA Establishment space readiness</li>
              <li>• Air Express: 3-5 days delivery to JFK, ORD, LAX via DHL</li>
              <li>• Sea Freight: 22-26 days to Houston / NY Ports</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-3 shadow-sm">
            <span className="text-xs font-bold text-[#0288D1] uppercase">Primary Route 02</span>
            <h3 className="text-lg font-bold text-[#0B2838] font-sans">European Union & UK</h3>
            <ul className="text-xs text-[#355C75] space-y-1.5 leading-relaxed font-sans">
              <li>• CE Declaration & DIN EN ISO 7153-1 metallurgical standards</li>
              <li>• Rapid air cargo to Frankfurt, London Heathrow & Amsterdam</li>
              <li>• Certificate of Origin & EUR-1 documentation</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-3 shadow-sm">
            <span className="text-xs font-bold text-[#0288D1] uppercase">Primary Route 03</span>
            <h3 className="text-lg font-bold text-[#0B2838] font-sans">GCC & Middle East</h3>
            <ul className="text-xs text-[#355C75] space-y-1.5 leading-relaxed font-sans">
              <li>• Fast direct air connection to Dubai (DXB), Riyadh, Doha</li>
              <li>• MoH institutional tender packaging & Arabic/English labeling</li>
              <li>• Attested Embassy invoices and chamber certificates</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
