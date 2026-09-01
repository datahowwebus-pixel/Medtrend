import React, { useState } from 'react';
import { ShieldCheck, FileText, Send, Building, Globe, CheckCircle2, Package, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, QuoteRequest } from '../types';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

export const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose, initialProduct }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2838]/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white text-[#0B2838] rounded-2xl shadow-2xl border border-[#B3E5FC] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-[#F8FCFE] text-[#0B2838] flex items-center justify-between border-b border-[#B3E5FC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E1F5FE] text-[#0288D1] border border-[#81D4FA] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#0288D1]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#0B2838]">MEDTREND® B2B & Wholesale Quote</h3>
                <span className="text-[9px] font-mono uppercase bg-[#E1F5FE] text-[#01579B] px-2 py-0.5 rounded-md border border-[#81D4FA]">
                  Direct Sialkot Supply
                </span>
              </div>
              <p className="text-xs text-[#355C75]">
                Institutional pricing for hospitals, importers, and private-label surgical distributors.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#E1F5FE] flex items-center justify-center text-[#62879F] hover:text-[#0B2838] border border-[#B3E5FC] font-mono text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4 font-mono bg-white">
            <div className="w-16 h-16 rounded-2xl bg-[#E1F5FE] border border-[#81D4FA] text-[#0288D1] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-[#0288D1]" />
            </div>
            <h4 className="text-xl font-bold text-[#0B2838] font-sans">Quotation Request Dispatched</h4>
            <p className="text-sm text-[#355C75] max-w-md mx-auto font-sans">
              Thank you, <strong className="text-[#0B2838]">{contactPerson || 'valued partner'}</strong>. Our Sialkot Export & B2B Engineering desk has received your request for <strong className="text-[#0B2838]">{companyName || 'your organization'}</strong>.
            </p>
            <div className="p-4 bg-[#F8FCFE] border border-[#B3E5FC] rounded-xl text-xs text-[#355C75] max-w-md mx-auto text-left font-mono space-y-1">
              <div>Reference: <span className="text-[#0288D1] font-bold">RFQ-MT-{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div>Destination Market: {targetMarket}</div>
              <div>Estimated Response Time: Within 4 Business Hours</div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#0288D1] text-white font-bold font-mono rounded-xl text-xs hover:bg-[#0277BD] transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs text-[#355C75] font-mono bg-white">
            {/* Target Instrument banner */}
            {initialProduct ? (
              <div className="p-3.5 rounded-xl bg-[#F8FCFE] border border-[#B3E5FC] flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <img src={initialProduct.images[0]} alt={initialProduct.name} className="w-12 h-12 object-contain bg-white rounded-lg border border-[#B3E5FC]" />
                  <div>
                    <span className="font-mono text-[10px] text-[#01579B] font-bold">{initialProduct.code}</span>
                    <p className="font-bold text-[#0B2838] text-xs font-sans">{initialProduct.name}</p>
                    <p className="text-[10px] text-[#62879F]">{initialProduct.material} • {initialProduct.size}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-[#62879F] uppercase">Tier Pricing:</div>
                  <div className="text-xs font-bold text-[#0288D1]">
                    ${initialProduct.wholesalePriceTiers[1]?.price || 18.50}/pc (50+ pcs)
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#E1F5FE] border border-[#81D4FA] rounded-xl text-[#01579B] flex items-center gap-2 text-[11px]">
                <Sparkles className="w-4 h-4 text-[#0288D1] shrink-0" />
                <span>General Wholesale / Multi-SKU procurement inquiry</span>
              </div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Company / Hospital Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Health Systems LLC"
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] focus:bg-white text-[#0B2838] text-xs focus:border-[#0288D1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Contact Person & Title *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Dr. Arthur Bennett (Procurement Dir.)"
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] focus:bg-white text-[#0B2838] text-xs focus:border-[#0288D1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Official Business Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="procurement@hospital.org"
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] focus:bg-white text-[#0B2838] text-xs focus:border-[#0288D1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] focus:bg-white text-[#0B2838] text-xs focus:border-[#0288D1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Target Market / Destination *</label>
                <select
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] focus:bg-white text-[#0B2838] text-xs focus:border-[#0288D1] focus:outline-none"
                >
                  <option value="USA">United States (FDA Compliant Port)</option>
                  <option value="European Union">European Union (CE / MDR Space)</option>
                  <option value="GCC">GCC Countries (Saudi, UAE, Qatar, Kuwait)</option>
                  <option value="Worldwide">Worldwide / Other International</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Business Type *</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] focus:bg-white text-[#0B2838] text-xs focus:border-[#0288D1] focus:outline-none"
                >
                  <option value="Medical Distributor">Medical Distributor / Importer</option>
                  <option value="Hospital / Clinic">Hospital / Surgical Center</option>
                  <option value="OEM / Private Label">OEM / Private Label Brand</option>
                  <option value="Wholesale Buyer">Wholesale Stockist</option>
                </select>
              </div>
            </div>

            {/* Quantity & Finish */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-[#F8FCFE] border border-[#B3E5FC] rounded-xl">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Required Quantity (Units)</label>
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 10)}
                  className="w-full p-2 rounded-xl border border-[#B3E5FC] text-xs font-mono font-bold text-[#0288D1] bg-white focus:border-[#0288D1] focus:outline-none"
                />
                <span className="text-[9px] text-[#62879F]">Minimum B2B order: 10 units</span>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Surface Finish Specification</label>
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#B3E5FC] text-xs bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
                >
                  <option value="Satin Matte">German Satin Matte (Non-Glare)</option>
                  <option value="Mirror Polish">High-Gloss Mirror Polish</option>
                  <option value="Tungsten Carbide Gold">Tungsten Carbide Gold (TC Insert)</option>
                  <option value="Blue Titanium">Blue Titanium Nitride (Micro-Hardness)</option>
                  <option value="Black Ceramic">Tactical Black Ceramic</option>
                </select>
              </div>
            </div>

            {/* Value Added OEM Services */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-2">Value-Added OEM & Supply Requirements:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] cursor-pointer hover:border-[#0288D1]">
                  <input
                    type="checkbox"
                    checked={customLogoEngraving}
                    onChange={(e) => setCustomLogoEngraving(e.target.checked)}
                    className="rounded accent-[#0288D1] bg-white border-[#B3E5FC]"
                  />
                  <span className="text-[10px] text-[#0B2838]">Free Custom Laser Logo</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] cursor-pointer hover:border-[#0288D1]">
                  <input
                    type="checkbox"
                    checked={customPackaging}
                    onChange={(e) => setCustomPackaging(e.target.checked)}
                    className="rounded accent-[#0288D1] bg-white border-[#B3E5FC]"
                  />
                  <span className="text-[10px] text-[#0B2838]">Custom Barcoded Box</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] cursor-pointer hover:border-[#0288D1]">
                  <input
                    type="checkbox"
                    checked={oemCustomization}
                    onChange={(e) => setOemCustomization(e.target.checked)}
                    className="rounded accent-[#0288D1] bg-white border-[#B3E5FC]"
                  />
                  <span className="text-[10px] text-[#0B2838]">OEM Custom Design / CAD</span>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Additional Specifications / Target Port</label>
              <textarea
                rows={2}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Specify target delivery date, custom surgical set requirements, or CIF/FOB terms..."
                className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] focus:bg-white text-[#0B2838] text-xs focus:border-[#0288D1] focus:outline-none"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-[#B3E5FC]">
              <div className="text-[10px] text-[#62879F] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0288D1]" />
                <span>NDA & Confidentiality Guaranteed</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-[#B3E5FC] hover:bg-[#F0F9FF] text-[#355C75] hover:text-[#0B2838] rounded-xl font-mono text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white rounded-xl font-bold font-mono text-xs shadow-md shadow-[#0288D1]/25 transition-all flex items-center gap-2 uppercase tracking-wider"
                >
                  <Send className="w-3.5 h-3.5 text-[#B3E5FC]" />
                  Submit RFQ
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
