import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Sparkles, Layers, 
  Menu, X, ChevronDown, ShieldCheck, Globe, Phone, Mail, FileText, ArrowRight, Clock
} from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';

interface NavbarProps {
  activeTab?: string;
  currentTab?: string;
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  cartCount: number;
  onOpenFolderGuide?: () => void;
  onOpenImageManager?: () => void;
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
  onOpenCart,
  selectedCurrency = 'USD',
  onCurrencyChange
}) => {
  const { company } = useCompany();
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

  interface NavItem {
    id: string;
    label: string;
    hasMegaMenu?: boolean;
    isSpecial?: boolean;
  }

  const navLinks: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Shop All Instruments', hasMegaMenu: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#195aa7]/15 shadow-sm transition-colors">
      
      {/* 1. GerMedUSA + Duckworth & Kent Top Clinical Utility Bar (Fun Blue #195aa7) */}
      <div className="bg-[#195aa7] text-white text-xs sm:text-sm py-2.5 px-6 sm:px-10 lg:px-14 xl:px-16 border-b border-[#1ab8ec]/30 transition-colors">
        <div className="max-w-[1480px] mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: E-Commerce Free Shipping & VIP Discount Notice */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-2 font-bold tracking-tight text-[#ffffff]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb5d0b] animate-ping" />
              <span>FREE Worldwide Express Shipping on Orders $150+ • 24-48h Tracked Dispatch</span>
            </span>
            <span className="hidden lg:inline text-[#1ab8ec]">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-[#1ab8ec] font-mono text-xs sm:text-sm">
              <span className="text-[#eb5d0b] font-bold">VIP CODE:</span>
              <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">SURGEON15 (15% OFF)</span>
            </div>
            <span className="hidden xl:inline text-[#1ab8ec]">|</span>
            <div className="hidden xl:flex items-center gap-1.5 text-white/90 text-xs sm:text-sm">
              <Mail className="w-4 h-4 text-[#1ab8ec]" />
              <span>{company.primaryEmail}</span>
            </div>
          </div>

          {/* Right: Currency Selector & Quick Utility */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 ml-auto">
            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded border border-white/20">
              <Globe className="w-3.5 h-3.5 text-[#1ab8ec]" />
              <select
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange?.(e.target.value)}
                aria-label="Select Currency"
                className="bg-transparent text-white text-xs focus:outline-none cursor-pointer font-mono font-bold"
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
        <div className="flex items-center justify-between min-h-[84px] sm:min-h-[92px] py-2 gap-4">
          
          {/* Official Brand Logo (medtrendlogo.jpg) */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left group shrink-0 focus:outline-none py-1"
            title="MEDTREND Home"
          >
            <img
              src="/medtrendlogo.jpg"
              alt="MEDTREND Surgical Instruments"
              className="h-11 sm:h-14 md:h-16 lg:h-[68px] w-auto max-w-[220px] sm:max-w-[290px] md:max-w-[360px] object-contain transition-transform group-hover:scale-105"
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
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f4f8fc] hover:bg-white focus:bg-white border-2 border-[#1ab8ec]/40 rounded-xl focus:outline-none focus:border-[#195aa7] text-[#195aa7] placeholder-[#62879F] font-medium transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#eb5d0b] text-sm font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchOpen && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-[#1ab8ec] shadow-2xl overflow-hidden z-50 animate-in fade-in divide-y divide-[#f4f8fc]">
                <div className="p-3 bg-[#195aa7] text-white text-xs font-mono uppercase tracking-wider flex justify-between items-center">
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
                      <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-contain rounded-lg bg-white border border-gray-200 group-hover:border-[#1ab8ec]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-[#eb5d0b]">{p.code}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#1ab8ec]/15 text-[#195aa7] font-bold uppercase">{p.category}</span>
                        </div>
                        <p className="text-sm font-bold text-[#195aa7] line-clamp-1">{p.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-[#195aa7]">${p.price.toFixed(2)}</div>
                      <span className="text-xs text-[#eb5d0b] font-bold group-hover:underline">View Specs →</span>
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
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-[#195aa7] hover:text-[#eb5d0b] transition-colors"
            >
              <span>Track Order</span>
            </button>

            {/* Prominent Direct E-Commerce Cart Button */}
            <button
              id="nav-btn-cart"
              onClick={onOpenCart || (() => onNavigate('cart-checkout'))}
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#eb5d0b] hover:bg-[#d65106] text-white shadow-lg shadow-[#eb5d0b]/30 transition-all font-mono active:scale-95 group"
              title="Open Shopping Cart Drawer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-white text-[#eb5d0b] font-black text-[10px] flex items-center justify-center ring-1 ring-[#eb5d0b]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              <span className="px-2 py-0.5 rounded-full bg-black/20 text-white font-mono text-xs">
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
        <nav className="hidden lg:flex items-center space-x-1.5 py-2 border-t border-[#195aa7]/10">
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-[13px] uppercase tracking-wider font-bold transition-all ${
                      current === 'products'
                        ? 'text-[#eb5d0b] bg-[#eb5d0b]/10 font-black'
                        : 'text-[#195aa7] hover:text-[#eb5d0b] hover:bg-[#f4f8fc]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-4 h-4 text-[#1ab8ec] group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Mega Dropdown Menu (GerMedUSA Specialty Hierarchy) */}
                  {isCategoriesDropdownOpen && (
                    <div className="absolute top-full left-0 w-[740px] p-6 bg-white rounded-3xl border-2 border-[#1ab8ec] shadow-2xl grid grid-cols-2 gap-6 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="col-span-2 pb-3 border-b border-[#1ab8ec]/20 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-black uppercase tracking-wider text-[#195aa7]">
                            Surgical Instrument Groups
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">German-Forged Stainless Steel & Grade-5 Medical Titanium</p>
                        </div>
                        <button
                          onClick={() => {
                            setIsCategoriesDropdownOpen(false);
                            onNavigate('products');
                          }}
                          className="text-sm font-bold text-[#eb5d0b] hover:underline flex items-center gap-1"
                        >
                          <span>Full Instrument Index</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {CATEGORIES_TREE.map((cat) => (
                        <div key={cat.slug} className="space-y-2">
                          <button
                            onClick={() => {
                              setIsCategoriesDropdownOpen(false);
                              onNavigate('products', undefined, cat.slug);
                            }}
                            className="font-bold text-sm text-[#195aa7] hover:text-[#eb5d0b] flex items-center justify-between w-full group/btn pb-1 border-b border-gray-100"
                          >
                            <span className="tracking-tight">{cat.name}</span>
                            <span className="text-xs font-mono text-[#1ab8ec] group-hover/btn:translate-x-1 transition-transform">
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
                                className="text-xs px-2.5 py-1 bg-[#f4f8fc] hover:bg-[#1ab8ec]/15 text-[#195aa7] rounded-md transition-colors font-medium"
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Bottom Banner inside Mega Menu */}
                      <div className="col-span-2 p-3.5 bg-gradient-to-r from-[#195aa7] to-[#144988] rounded-xl text-white flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#1ab8ec]" />
                          <span className="font-bold">Titanium & Ophthalmic Micro-Instruments (Duckworth & Kent Series)</span>
                        </div>
                        <button
                          onClick={() => {
                            setIsCategoriesDropdownOpen(false);
                            onNavigate('showcase-3d');
                          }}
                          className="px-3 py-1.5 bg-[#eb5d0b] text-white font-bold rounded-lg text-xs uppercase hover:bg-[#d65106] transition-colors"
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
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-[13px] uppercase tracking-wider font-bold transition-all ${
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
