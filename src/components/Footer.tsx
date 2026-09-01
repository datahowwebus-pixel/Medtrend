import React from 'react';
import { 
  ShieldCheck, MapPin, Mail, Phone, Globe, Download, 
  ExternalLink, ArrowRight, CheckCircle2, Lock, Package, FileText 
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';
import { CATEGORIES_TREE } from '../data/productsData';

interface FooterProps {
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  onOpenFolderGuide: () => void;
  onOpenRFQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenFolderGuide,
  onOpenRFQ
}) => {
  return (
    <footer className="bg-[#F4FAFD] text-[#355C75] border-t border-[#B3E5FC] text-xs">
      {/* Trust & Certifications Space Bar */}
      <div className="border-b border-[#B3E5FC] bg-[#E1F5FE] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#81D4FA] flex items-center justify-center text-[#0288D1] shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0B2838] text-xs tracking-tight">Sialkot Metallurgy</p>
              <p className="text-[10px] text-[#355C75] font-mono">German DIN 1.4021 / 1.4117</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#81D4FA] flex items-center justify-center text-[#0288D1] shrink-0 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0B2838] text-xs tracking-tight">Global Direct Supply</p>
              <p className="text-[10px] text-[#355C75] font-mono">USA • EU • GCC • Worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#81D4FA] flex items-center justify-center text-[#0288D1] shrink-0 shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0B2838] text-xs tracking-tight">OEM & Private Label</p>
              <p className="text-[10px] text-[#355C75] font-mono">Custom Laser Etching & Kits</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#81D4FA] flex items-center justify-center text-[#0288D1] shrink-0 shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0B2838] text-xs tracking-tight">100% Autoclavable</p>
              <p className="text-[10px] text-[#355C75] font-mono">Tested to 134°C (273°F)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info & Origin */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0288D1] to-[#29B6F6] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#0288D1]/30">
                M
              </div>
              <span className="text-xl font-black text-[#0B2838] tracking-tight">MEDTREND®</span>
            </div>

            <p className="text-xs text-[#355C75] leading-relaxed max-w-sm">
              {BRAND_CONFIG.positioningStatement}
            </p>

            <div className="space-y-2 text-[#355C75] text-xs pt-1 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                <span>Manufacturing HQ: Small Industrial Estate, Sialkot 51310, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0288D1] shrink-0" />
                <span>export@medtrendinstruments.com / info@medtrend.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0288D1] shrink-0" />
                <span>+92 (52) 429-1800 • B2B Direct Desk</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#01579B]">Categories</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_TREE.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate('products', undefined, cat.slug)}
                    className="text-[#355C75] hover:text-[#0288D1] hover:translate-x-1 transition-all text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('showcase-3d')}
                  className="text-[#0288D1] hover:underline font-mono text-xs flex items-center gap-1 font-bold"
                >
                  3D Interactive Models →
                </button>
              </li>
            </ul>
          </div>

          {/* Commercial & B2B Portals */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#01579B]">B2B & Trade</h4>
            <ul className="space-y-2 text-xs text-[#355C75]">
              <li>
                <button onClick={() => onNavigate('b2b-wholesale')} className="hover:text-[#0288D1] transition-colors">
                  Distributor Application
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('b2b-wholesale')} className="hover:text-[#0288D1] transition-colors">
                  OEM & Private Labeling
                </button>
              </li>
              <li>
                <button onClick={onOpenRFQ} className="text-[#0288D1] font-mono hover:underline font-bold">
                  Request Volume Quote (RFQ)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog-datasheets')} className="hover:text-[#0288D1] transition-colors">
                  Digital PDF Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quality-certifications')} className="hover:text-[#0288D1] transition-colors">
                  ISO 13485 & CE Space
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('order-tracking')} className="hover:text-[#0288D1] transition-colors">
                  Global Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Developer & Asset System */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#01579B]">System Architecture</h4>
            <ul className="space-y-2 text-xs text-[#355C75]">
              <li>
                <button onClick={onOpenFolderGuide} className="hover:text-[#0288D1] transition-colors text-[#0288D1] font-mono text-[11px] flex items-center gap-1 font-bold">
                  Folder Structure Specs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brand-guidelines')} className="hover:text-[#0288D1] transition-colors">
                  Brand Guidelines Manual
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#0288D1] transition-colors">
                  Sialkot Artisan Heritage
                </button>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[10px] text-[#355C75] font-mono uppercase tracking-wider mb-1.5">B2B Technical Bulletin:</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="hospital@domain.com"
                  className="w-full bg-white border border-[#B3E5FC] rounded-l-xl px-2.5 py-1.5 text-xs text-[#0B2838] focus:outline-none focus:border-[#0288D1] font-mono placeholder-[#62879F]"
                />
                <button className="bg-[#0288D1] hover:bg-[#0277BD] text-white px-3 py-1.5 rounded-r-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Notice */}
        <div className="mt-8 pt-6 border-t border-[#B3E5FC] text-[11px] text-[#62879F] leading-relaxed">
          <p className="mb-2">
            <strong className="text-[#0B2838]">Legal & Regulatory Compliance Space:</strong> MEDTREND® is a registered brand of Medtrend Pvt. Ltd. (Sialkot, Pakistan). All surgical instruments are manufactured in accordance with strict international metallurgy (ASTM / DIN standards) and facility quality management system provisions (ISO 13485). CE declaration of conformity and FDA establishment registrations are provided per applicable regional jurisdiction.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#B3E5FC]/70 text-[9px] uppercase tracking-[0.2em] text-[#355C75] font-mono">
            <div>System Status: <span className="text-[#0288D1] font-bold">Nominal // Active</span></div>
            <div>© {new Date().getFullYear()} MEDTREND® SURGICAL TECHNOLOGIES</div>
            <div>Localized: Sialkot // PK</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
