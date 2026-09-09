import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Folder, Sparkles, Layers, 
  Menu, X, ChevronDown, ShieldCheck, Globe, Phone, Mail, FileText, ArrowRight, Settings, Clock
} from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';

interface NavbarProps {
  activeTab?: string;
  currentTab?: string;
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  cartCount: number;
  onOpenFolderGuide: () => void;
  onOpenImageManager: () => void;
  onOpenCart?: () => void;
  onOpenRFQ?: () => void;
  selectedCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  currentTab,
  onNavigate,
  cartCount,
  onOpenFolderGuide,
  onOpenImageManager,
  onOpenCart,
  onOpenRFQ,
  selectedCurrency = 'USD',
  onCurrencyChange
}) => {
  const { company, setIsDevModalOpen } = useCompany();
  const current = activeTab || currentTab || 'home';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const filteredProducts = searchQuery.trim() === ''
    ? []
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Shop All Instruments', hasMegaMenu: true },
    { id: 'showcase-3d', label: '360° Inspection Lab', isSpecial: true },
    { id: 'about', label: 'Sialkot Craftsmanship' },
    { id: 'quality-certifications', label: 'ISO 13485 Quality' },
    { id: 'order-tracking', label: 'Track My Order' },
    { id: 'catalog-datasheets', label: 'Spec Sheets & TDS' },
    { id: 'brand-guidelines', label: 'Asset Specs' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#195aa7]/15 shadow-sm transition-colors">
      
      {/* 1. GerMedUSA + Duckworth & Kent Top Clinical Utility Bar (Fun Blue #195aa7) */}
      <div className="bg-[#195aa7] text-white text-[11px] py-2 px-6 sm:px-10 lg:px-14 xl:px-16 border-b border-[#1ab8ec]/30 transition-colors">
        <div className="max-w-[1480px] mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: E-Commerce Free Shipping & VIP Discount Notice */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-bold tracking-tight text-[#ffffff]">
              <span className="w-2 h-2 rounded-full bg-[#eb5d0b] animate-ping" />
              <span>FREE Worldwide Express Shipping on Orders $150+ • 24-48h Tracked Dispatch</span>
            </span>
            <span className="hidden lg:inline text-[#1ab8ec]">|</span>
            <div className="hidden sm:flex items-center gap-1 text-[#1ab8ec] font-mono text-xs">
              <span className="text-[#eb5d0b] font-bold">VIP CODE:</span>
              <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded">SURGEON15 (15% OFF)</span>
            </div>
            <span className="hidden xl:inline text-[#1ab8ec]">|</span>
            <div className="hidden xl:flex items-center gap-1 text-white/90 text-xs">
              <Mail className="w-3.5 h-3.5 text-[#1ab8ec]" />
              <span>{company.primaryEmail}</span>
            </div>
          </div>

          {/* Right: Quick Tools, Developer Settings & Currency */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Developer Mode Quick Trigger (Requested by user) */}
            <button
              onClick={() => setIsDevModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm transition-all hover:scale-105"
              title="Click to edit Company Name, Contacts, and Addresses live across the entire website!"
            >
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Developer Mode</span>
            </button>

            {/* Folder & Asset Architecture Trigger */}
            <button
              onClick={onOpenFolderGuide}
              className="hidden md:flex items-center gap-1 text-[#1ab8ec] hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-[10px] font-mono transition-colors"
            >
              <Folder className="w-3 h-3 text-[#1ab8ec]" />
              <span>Folders</span>
            </button>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded border border-white/20">
              <Globe className="w-3 h-3 text-[#1ab8ec]" />
              <select
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange?.(e.target.value)}
                aria-label="Select Currency"
                className="bg-transparent text-white text-[10px] focus:outline-none cursor-pointer font-mono font-bold"
              >
                <option value="USD" className="text-[#195aa7]">USD ($)</option>
                <option value="EUR" className="text-[#195aa7]">EUR (€)</option>
                <option value="GBP" className="text-[#195aa7]">GBP (£)</option>
                <option value="AED" className="text-[#195aa7]">AED (د.إ)</option>
                <option value="PKR" className="text-[#195aa7]">PKR (Rs)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & SKU Lookup Bar (Sterile White #ffffff with Fun Blue #195aa7 accents) */}
      <div className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Official Brand Logo (medtrendlogo.jpg) */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left group shrink-0 focus:outline-none py-1"
            title="MEDTREND Home"
          >
            <img
              src="/medtrendlogo.jpg"
              alt="MEDTREND Surgical Instruments"
              className="h-9 sm:h-11 md:h-12 w-auto max-w-[190px] sm:max-w-[240px] md:max-w-[280px] object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* GerMedUSA Style Search Bar with Instant SKU & Name Autocomplete */}
          <div className="hidden md:block relative flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1ab8ec]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search by SKU (e.g. MT-HF-001, MT-SC-004) or specialty..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#f4f8fc] hover:bg-white focus:bg-white border-2 border-[#1ab8ec]/40 rounded-xl focus:outline-none focus:border-[#195aa7] text-[#195aa7] placeholder-[#62879F] font-medium transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#eb5d0b] text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchOpen && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-[#1ab8ec] shadow-2xl overflow-hidden z-50 animate-in fade-in divide-y divide-[#f4f8fc]">
                <div className="p-3 bg-[#195aa7] text-white text-[11px] font-mono uppercase tracking-wider flex justify-between items-center">
                  <span className="font-bold">Catalog SKU Match:</span>
                  <span className="text-[#1ab8ec] font-black">{filteredProducts.length} Instruments Found</span>
                </div>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      onNavigate('product-detail', p.id);
                    }}
                    className="p-3 hover:bg-[#f4f8fc] cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-11 h-11 object-contain rounded-lg bg-white border border-gray-200 group-hover:border-[#1ab8ec]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-black text-[#eb5d0b]">{p.code}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1ab8ec]/15 text-[#195aa7] font-bold uppercase">{p.category}</span>
                        </div>
                        <p className="text-xs font-bold text-[#195aa7] line-clamp-1">{p.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-[#195aa7]">${p.price.toFixed(2)}</div>
                      <span className="text-[10px] text-[#eb5d0b] font-bold group-hover:underline">View Specs →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs: E-Commerce Cart in Christine (#eb5d0b) + Fast Checkout */}
          <div className="flex items-center gap-3">
            {/* Quick Track Order Link */}
            <button
              onClick={() => onNavigate('order-tracking')}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#195aa7] hover:text-[#eb5d0b] transition-colors"
            >
              <span>Track Order</span>
            </button>

            {/* Prominent Direct E-Commerce Cart Button */}
            <button
              id="nav-btn-cart"
              onClick={onOpenCart || (() => onNavigate('cart-checkout'))}
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#eb5d0b] hover:bg-[#d65106] text-white shadow-lg shadow-[#eb5d0b]/30 transition-all font-mono active:scale-95 group"
              title="Open Shopping Cart Drawer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-white text-[#eb5d0b] font-black text-[9px] flex items-center justify-center ring-1 ring-[#eb5d0b]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              <span className="px-2 py-0.5 rounded-full bg-black/20 text-white font-mono text-[10px]">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-[#195aa7]/30 text-[#195aa7] hover:bg-[#f4f8fc]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. Primary Specialty Navigation Bar (Duckworth & Kent Instrument Groups + GerMedUSA Menus) */}
        <nav className="hidden lg:flex items-center space-x-1 py-2 border-t border-[#195aa7]/10">
          {navLinks.map((link) => {
            if (link.hasMegaMenu) {
              return (
                <div
                  key={link.id}
                  className="relative group"
                  onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                  onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
                >
                  <button
                    onClick={() => onNavigate('products')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all ${
                      current === 'products'
                        ? 'text-[#eb5d0b] bg-[#eb5d0b]/10 font-black'
                        : 'text-[#195aa7] hover:text-[#eb5d0b] hover:bg-[#f4f8fc]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#1ab8ec] group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Mega Dropdown Menu (GerMedUSA Specialty Hierarchy) */}
                  {isCategoriesDropdownOpen && (
                    <div className="absolute top-full left-0 w-[720px] p-6 bg-white rounded-3xl border-2 border-[#1ab8ec] shadow-2xl grid grid-cols-2 gap-6 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="col-span-2 pb-3 border-b border-[#1ab8ec]/20 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest text-[#195aa7]">
                            Surgical Instrument Groups
                          </span>
                          <p className="text-[11px] text-gray-500">German-Forged Stainless Steel & Grade-5 Medical Titanium</p>
                        </div>
                        <button
                          onClick={() => {
                            setIsCategoriesDropdownOpen(false);
                            onNavigate('products');
                          }}
                          className="text-xs font-bold text-[#eb5d0b] hover:underline flex items-center gap-1"
                        >
                          <span>Full Instrument Index</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {CATEGORIES_TREE.map((cat) => (
                        <div key={cat.slug} className="space-y-2">
                          <button
                            onClick={() => {
                              setIsCategoriesDropdownOpen(false);
                              onNavigate('products', undefined, cat.slug);
                            }}
                            className="font-bold text-xs text-[#195aa7] hover:text-[#eb5d0b] flex items-center justify-between w-full group/btn pb-1 border-b border-gray-100"
                          >
                            <span className="tracking-tight">{cat.name}</span>
                            <span className="text-[10px] font-mono text-[#1ab8ec] group-hover/btn:translate-x-1 transition-transform">
                              Explore →
                            </span>
                          </button>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.subCategories.slice(0, 4).map((sub) => (
                              <button
                                key={sub.slug}
                                onClick={() => {
                                  setIsCategoriesDropdownOpen(false);
                                  onNavigate('products', undefined, sub.slug);
                                }}
                                className="text-[10px] px-2 py-1 bg-[#f4f8fc] hover:bg-[#1ab8ec]/15 text-[#195aa7] rounded-md transition-colors"
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Bottom Banner inside Mega Menu */}
                      <div className="col-span-2 p-3 bg-gradient-to-r from-[#195aa7] to-[#144988] rounded-xl text-white flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#1ab8ec]" />
                          <span className="font-bold">Titanium & Ophthalmic Micro-Instruments (Duckworth & Kent Series)</span>
                        </div>
                        <button
                          onClick={() => {
                            setIsCategoriesDropdownOpen(false);
                            onNavigate('showcase-3d');
                          }}
                          className="px-3 py-1 bg-[#eb5d0b] text-white font-bold rounded-lg text-[10px] uppercase hover:bg-[#d65106] transition-colors"
                        >
                          Launch 360° Viewer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all ${
                  link.isSpecial
                    ? 'text-[#eb5d0b] bg-[#eb5d0b]/10 border border-[#eb5d0b]/30 hover:bg-[#eb5d0b] hover:text-white'
                    : current === link.id
                    ? 'text-[#195aa7] bg-[#1ab8ec]/15 font-black border-b-2 border-[#195aa7]'
                    : 'text-[#195aa7]/80 hover:text-[#195aa7] hover:bg-[#f4f8fc]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white p-4 space-y-3 animate-in slide-in-from-top-2 shadow-2xl">
          <div className="p-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDevModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#eb5d0b] text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider mb-2"
            >
              <Settings className="w-4 h-4" />
              <span>Developer Mode (Edit Company Info)</span>
            </button>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate(link.id);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  current === link.id
                    ? 'bg-[#195aa7] text-white'
                    : 'text-[#195aa7] hover:bg-[#f4f8fc]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
