import React, { useState } from 'react';
import { ShieldCheck, FileText, Send, Building, Globe, CheckCircle2, Package, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, QuoteRequest } from '../types';
import { useCompany } from '../context/CompanyContext';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

export const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose, initialProduct }) => {
  const { company } = useCompany();
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetMarket, setTargetMarket] = useState<'USA' | 'European Union' | 'GCC' | 'Worldwide' | 'Other'>('USA');
  const [businessType, setBusinessType] = useState<'Hospital / Clinic' | 'Medical Distributor' | 'Wholesale Buyer' | 'OEM / Private Label' | 'Retail Customer'>('Medical Distributor');
  
  const [quantity, setQuantity] = useState(initialProduct ? 50 : 100);
  const [selectedFinish, setSelectedFinish] = useState(initialProduct ? initialProduct.finish : 'Satin Matte');
  const [customLogoEngraving, setCustomLogoEngraving] = useState(true);
  const [customPackaging, setCustomPackaging] = useState(false);
  const [oemCustomization, setOemCustomization] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white text-[#195aa7] rounded-3xl shadow-2xl border-2 border-[#1ab8ec] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#195aa7] to-[#144988] text-white flex items-center justify-between border-b-4 border-[#eb5d0b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eb5d0b] text-white flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">{company.shortName} B2B & Hospital Quote</h3>
                <span className="text-[9px] font-mono uppercase bg-[#1ab8ec] text-[#195aa7] font-bold px-2 py-0.5 rounded">
                  Direct Factory Pricing
                </span>
              </div>
              <p className="text-xs text-[#1ab8ec]">
                Institutional pricing for hospitals, surgical importers, and private-label distributors.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#eb5d0b] flex items-center justify-center text-white font-mono text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4 font-mono bg-white">
            <div className="w-16 h-16 rounded-2xl bg-[#1ab8ec]/20 border border-[#1ab8ec] text-[#eb5d0b] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-[#eb5d0b]" />
            </div>
            <h4 className="text-xl font-bold text-[#195aa7] font-sans">Quotation Request Dispatched</h4>
            <p className="text-sm text-gray-700 max-w-md mx-auto font-sans">
              Thank you, <strong className="text-[#195aa7]">{contactPerson || 'valued partner'}</strong>. Our Export & B2B Engineering desk at <strong className="text-[#195aa7]">{company.rfqEmail}</strong> has received your request for <strong className="text-[#195aa7]">{companyName || 'your organization'}</strong>.
            </p>
            <div className="p-4 bg-[#f4f8fc] border border-[#1ab8ec]/30 rounded-xl text-xs text-gray-700 max-w-md mx-auto text-left font-mono space-y-1">
              <div>Reference: <span className="text-[#eb5d0b] font-bold">RFQ-MT-{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div>Destination Market: {targetMarket}</div>
              <div>Assigned Desk: {company.primaryPhone}</div>
              <div>Response Time: Within 4 Business Hours</div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#eb5d0b] text-white font-bold font-mono rounded-xl text-xs hover:bg-[#d65106] transition-colors uppercase tracking-wider shadow-lg shadow-[#eb5d0b]/25"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs text-gray-700 font-mono bg-white">
            {/* Target Instrument banner */}
            {initialProduct ? (
              <div className="p-3 bg-[#f4f8fc] border border-[#1ab8ec]/40 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={initialProduct.images[0]} alt={initialProduct.name} className="w-12 h-12 object-contain bg-white rounded-lg border border-gray-200" />
                  <div>
                    <span className="text-[10px] text-[#eb5d0b] font-bold">{initialProduct.code}</span>
                    <h5 className="font-bold text-[#195aa7] text-xs line-clamp-1">{initialProduct.name}</h5>
                    <span className="text-[10px] text-gray-500">{initialProduct.material}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#195aa7]">Est: ${initialProduct.price.toFixed(2)}</span>
                </div>
              </div>
            ) : null}

            {/* Organization & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Company / Hospital Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Mayo Clinic OR Dept."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Dr. / Officer Name"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Official Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="procurement@hospital.org"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Direct Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2831"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
                />
              </div>
            </div>

            {/* Target Market & Business Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Destination Market</label>
                <select
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
                >
                  <option value="USA">United States & Canada (FDA Standard)</option>
                  <option value="European Union">European Union (CE MDR 2017/745)</option>
                  <option value="GCC">GCC / Middle East (SFDA / MOH)</option>
                  <option value="Worldwide">Worldwide / Other Region</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Procurement Category</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
                >
                  <option value="Hospital / Clinic">Hospital Operating Theatre / Clinic</option>
                  <option value="Medical Distributor">Surgical & Medical Distributor</option>
                  <option value="OEM / Private Label">OEM / Private Brand Contract</option>
                  <option value="Wholesale Buyer">Wholesale Surgical Importer</option>
                </select>
              </div>
            </div>

            {/* Volume Quantity & Finish */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Estimated Units / Volume</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={10}
                    step={10}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 10)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
                  />
                  <span className="text-gray-500 text-[10px]">Pieces</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Surface Finish Specification</label>
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
                >
                  <option value="German Satin Matte">German Satin Matte (Anti-Glare)</option>
                  <option value="Mirror Polish">High-Gloss Mirror Polish</option>
                  <option value="Tungsten Carbide TC">Gold Ring Tungsten Carbide (TC)</option>
                  <option value="Blue Titanium Nitride">Blue Titanium Nitride Micro</option>
                  <option value="Black Ceramic Coated">Black SuperCut Ceramic</option>
                </select>
              </div>
            </div>

            {/* Customization Checkboxes */}
            <div className="p-3 bg-[#f4f8fc] rounded-xl space-y-2 border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-[#195aa7] tracking-wider block">Customization Options</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customLogoEngraving}
                    onChange={(e) => setCustomLogoEngraving(e.target.checked)}
                    className="rounded text-[#eb5d0b] focus:ring-[#eb5d0b]"
                  />
                  <span>Fiber Laser Logo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customPackaging}
                    onChange={(e) => setCustomPackaging(e.target.checked)}
                    className="rounded text-[#eb5d0b] focus:ring-[#eb5d0b]"
                  />
                  <span>Sterile Pouch Pack</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={oemCustomization}
                    onChange={(e) => setOemCustomization(e.target.checked)}
                    className="rounded text-[#eb5d0b] focus:ring-[#eb5d0b]"
                  />
                  <span>Bespoke Pattern</span>
                </label>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[11px] font-bold text-[#195aa7] mb-1">Additional Instrument Codes or Tender Notes</label>
              <textarea
                rows={2}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Include list of SKU codes, target hospital tender deadlines, or bespoke measurements..."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1ab8ec] text-[#195aa7]"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-[10px] text-gray-500">
                Guaranteed response via {company.rfqEmail}
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#eb5d0b]/25 flex items-center gap-2 transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Quotation Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
