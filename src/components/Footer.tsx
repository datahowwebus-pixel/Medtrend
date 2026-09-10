import React from 'react';
import { 
  ShieldCheck, MapPin, Mail, Phone, Globe, Download, 
  ExternalLink, ArrowRight, CheckCircle2, Lock, Package, FileText, Award
} from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { CATEGORIES_TREE } from '../data/productsData';

interface FooterProps {
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  onOpenFolderGuide?: () => void;
  onOpenRFQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenRFQ
}) => {
  const { company } = useCompany();

  return (
    <footer className="bg-[#195aa7] text-white text-xs border-t-4 border-[#eb5d0b]">
      
      {/* 1. GerMedUSA & Duckworth & Kent Clinical Trust Bar (Fun Blue #195aa7 with Eastern Blue #1ab8ec & Christine #eb5d0b badges) */}
      <div className="border-b border-white/15 bg-[#12437e] py-6 px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="max-w-[1480px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#1ab8ec] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#eb5d0b] flex items-center justify-center text-white shrink-0 shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm tracking-tight">Sialkot Metallurgy</p>
              <p className="text-xs text-[#1ab8ec] font-mono">German DIN & ASTM F899</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#1ab8ec] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#1ab8ec] flex items-center justify-center text-[#195aa7] shrink-0 shadow-md">
              <Award className="w-5 h-5 font-black" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm tracking-tight">{company.isoCertification.split(' ')[0] || 'ISO 13485'}</p>
              <p className="text-xs text-white/90 font-mono">CE & FDA Registered</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#1ab8ec] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#eb5d0b] flex items-center justify-center text-white shrink-0 shadow-md">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm tracking-tight">OEM & Hospital Kits</p>
              <p className="text-xs text-[#1ab8ec] font-mono">Custom Laser Engraving</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#1ab8ec] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#1ab8ec] flex items-center justify-center text-[#195aa7] shrink-0 shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm tracking-tight">100% Autoclavable</p>
              <p className="text-xs text-white/90 font-mono">Steam Tested to 134°C</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Links & Company Details */}
      <div className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info & Live Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block bg-white px-4 py-2.5 rounded-xl shadow-md">
              <img
                src="/medtrendlogo.jpg"
                alt="MEDTREND Surgical Instruments"
                className="h-10 sm:h-12 w-auto max-w-[240px] sm:max-w-[280px] object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-sm font-sans">
              Precision surgical instruments crafted in Sialkot, Pakistan for international healthcare systems, surgical teams, hospital procurement, and global medical distributors across USA, Europe, and worldwide.
            </p>

            <div className="space-y-2 text-white/95 text-xs sm:text-sm pt-1 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#eb5d0b] shrink-0 mt-0.5" />
                <span><strong>HQ & Factory:</strong> {company.hqAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#1ab8ec] shrink-0 mt-0.5" />
                <span><strong>USA Hub:</strong> {company.internationalOffice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1ab8ec] shrink-0" />
                <span>{company.primaryEmail} (Quotes: {company.rfqEmail})</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#eb5d0b] shrink-0" />
                <span>{company.primaryPhone} • Toll-Free: {company.tollFreePhone}</span>
              </div>
            </div>
          </div>

          {/* Instrument Categories (GerMedUSA structure) */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1ab8ec]">
              Specialties & Groups
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {CATEGORIES_TREE.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate('products', undefined, cat.slug)}
                    className="text-white/85 hover:text-[#1ab8ec] hover:translate-x-1 transition-all text-left font-medium"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('showcase-3d')}
                  className="text-[#eb5d0b] hover:underline font-mono text-xs sm:text-sm flex items-center gap-1 font-bold"
                >
                  360° Inspection Lab →
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Direct Shopping */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1ab8ec]">
              Customer Care & Shopping
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/85 font-medium">
              <li>
                <button onClick={() => onNavigate('cart-checkout')} className="hover:text-white transition-colors">
                  Shopping Cart & Checkout
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('order-tracking')} className="text-[#1ab8ec] font-mono hover:underline font-bold">
                  Track Airway Bill / Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="text-[#eb5d0b] font-mono hover:underline font-bold">
                  Shop All Surgical Instruments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog-datasheets')} className="hover:text-white transition-colors">
                  Download Spec Sheets & TDS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quality-certifications')} className="hover:text-white transition-colors">
                  ISO 13485 & CE MDR Files
                </button>
              </li>
              <li>
                <span className="text-white/70">
                  Free Express Shipping on $150+
                </span>
              </li>
            </ul>
          </div>

          {/* Regulatory & System Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1ab8ec]">
              System & Literature
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/85 font-medium">
              <li>
                <button onClick={() => onNavigate('brand-guidelines')} className="hover:text-white transition-colors">
                  Brand Style Specifications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Sialkot Artisan Heritage
                </button>
              </li>
            </ul>

            {/* GerMedUSA B2B Technical Bulletin */}
            <div className="pt-2">
              <p className="text-xs text-white/80 font-mono uppercase tracking-wider mb-1.5">
                Hospital Procurement Bulletin:
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="hospital@domain.com"
                  aria-label="Hospital Procurement Bulletin Email"
                  className="w-full bg-white/10 border border-white/20 rounded-l-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#1ab8ec] font-mono"
                />
                <button 
                  aria-label="Subscribe to Hospital Procurement Bulletin"
                  className="bg-[#eb5d0b] hover:bg-[#d65106] text-white px-3.5 py-2 rounded-r-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-md">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Notice per GerMedUSA and Duckworth & Kent */}
        <div className="mt-8 pt-6 border-t border-white/15 text-xs sm:text-[13px] text-white/80 leading-relaxed">
          <p className="mb-2">
            <strong className="text-white font-bold">Regulatory & Compliance Mandate:</strong> {company.companyName} is registered under DIN EN ISO 13485:2016 for the design, drop-forging, CNC machining, passivation, and supply of reusable surgical, dental, and orthopedic instruments. Stainless steel alloys conform strictly to ASTM F899 (AISI 420A/420B/440A) and titanium products utilize biocompatible Ti-6Al-4V ELI (ASTM F136). CE Class I & IIa declarations of conformity are provided for institutional tenders.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs uppercase tracking-wider text-[#1ab8ec] font-mono">
            <div>Global Status: <span className="text-white font-bold">Operational // Active Air Freight</span></div>
            <div>© {new Date().getFullYear()} {company.companyName}</div>
            <div>Manufacturing Base: Sialkot, PK</div>
          </div>
        </div>

      </div>
    </footer>
  );
};
