import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Folder, Sparkles, Layers, 
  Menu, X, ChevronDown, ShieldCheck, Globe, Phone, FileText, ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';

interface NavbarProps {
  activeTab?: string;
  currentTab?: string;
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  cartCount: number;
  onOpenFolderGuide: () => void;
  onOpenImageManager: () => void;
  onOpenRFQ: () => void;
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
  onOpenRFQ,
  selectedCurrency = 'USD',
  onCurrencyChange
}) => {
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
    { id: 'products', label: 'Our Products', hasMegaMenu: true },
    { id: 'showcase-3d', label: '3D & 360° Inspection', isSpecial: true },
    { id: 'b2b-wholesale', label: 'B2B & Wholesale' },
    { id: 'about', label: 'Sialkot Heritage' },
    { id: 'quality-certifications', label: 'Quality & Docs' },
    { id: 'catalog-datasheets', label: 'Digital Catalog' },
    { id: 'order-tracking', label: 'Track Order' },
    { id: 'brand-guidelines', label: 'Brand Book' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#B3E5FC] transition-colors shadow-xs">
      {/* Top Professional B2B Utility Bar */}
      <div className="bg-[#E1F5FE] text-[#01579B] text-[10px] uppercase tracking-[0.12em] py-1.5 px-4 sm:px-8 border-b border-[#B3E5FC] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[#0288D1] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#0288D1] animate-pulse" />
              Sialkot Manufacturing HQ • Direct Clinical Supply
            </span>
            <span className="hidden md:inline text-[#81D4FA]">|</span>
            <span className="hidden md:inline text-[#355C75] font-mono text-[10px]">
              Markets: <strong className="text-[#0B2838] font-bold">USA • EU • GCC • Worldwide</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Folder Structure & Asset Guide Quick Trigger */}
            <button
              onClick={onOpenFolderGuide}
              className="flex items-center gap-1.5 text-[#0288D1] hover:text-[#01579B] bg-white px-2.5 py-0.5 rounded-md border border-[#81D4FA] transition-colors font-mono text-[10px] shadow-xs"
            >
              <Folder className="w-3 h-3 text-[#0288D1]" />
              <span>Asset & Folder Guide</span>
            </button>

            {/* Currency Selector */}
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#0288D1]" />
              <select
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange?.(e.target.value)}
                className="bg-white text-[#0B2838] text-[10px] focus:outline-none cursor-pointer border border-[#81D4FA] px-1.5 py-0.5 rounded font-mono"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="PKR">PKR (Rs)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo Branding with Medical Clinical Crest */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group shrink-0 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0288D1] to-[#29B6F6] flex items-center justify-center text-white shadow-md shadow-[#0288D1]/30 group-hover:scale-105 transition-all">
              <span className="font-black text-xl tracking-tighter text-white">
                M
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tighter text-[#0B2838]">MEDTREND</span>
                <span className="text-[10px] font-mono font-bold bg-[#B3E5FC] text-[#01579B] border border-[#81D4FA] px-1 rounded">®</span>
              </div>
              <p className="text-[9px] font-mono text-[#355C75] uppercase tracking-[0.18em] leading-none mt-0.5">
                Surgical & Medical Instruments
              </p>
            </div>
          </button>

          {/* Search Bar with live autocomplete */}
          <div className="hidden lg:block relative flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#29B6F6]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search instrument code (e.g. MT-HF-001) or name..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#F4FAFD] hover:bg-[#E1F5FE] focus:bg-white border border-[#B3E5FC] rounded-xl focus:outline-none focus:border-[#0288D1] text-[#0B2838] placeholder-[#62879F] font-mono transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#62879F] hover:text-[#0B2838] text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchOpen && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#B3E5FC] shadow-xl overflow-hidden z-50 animate-in fade-in divide-y divide-[#E1F5FE]">
                <div className="p-2.5 bg-[#F0F9FF] text-[10px] font-mono uppercase tracking-wider text-[#355C75] flex justify-between">
                  <span>Matching Instruments:</span>
                  <span className="text-[#0288D1] font-bold">{filteredProducts.length} results</span>
                </div>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      onNavigate('product-detail', p.id);
                    }}
                    className="p-3 hover:bg-[#F0F9FF] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-[#E1F5FE] border border-[#B3E5FC]" />
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#0288D1]">{p.code}</span>
                        <p className="text-xs font-bold text-[#0B2838] line-clamp-1">{p.name}</p>
                        <p className="text-[10px] text-[#355C75] font-mono">{p.category} • {p.subCategory}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-[#0B2838]">${p.price.toFixed(2)}</div>
                      <span className="text-[10px] text-[#0288D1] font-mono font-bold">View specs →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* RFQ Instant Trigger */}
            <button
              id="nav-btn-rfq"
              onClick={onOpenRFQ}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] bg-[#0288D1] hover:bg-[#0277BD] text-white shadow-md shadow-[#0288D1]/25 transition-all font-mono"
            >
              <FileText className="w-3.5 h-3.5 text-[#B3E5FC]" />
              <span>Request Quote</span>
            </button>

            {/* Cart Button */}
            <button
              id="nav-btn-cart"
              onClick={() => onNavigate('cart-checkout')}
              className="relative p-2.5 rounded-xl border border-[#B3E5FC] hover:border-[#0288D1] text-[#0B2838] hover:text-[#0288D1] transition-colors flex items-center gap-1 bg-[#F4FAFD] hover:bg-[#E1F5FE] shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-[#0288D1]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0288D1] text-white font-black text-[10px] flex items-center justify-center ring-2 ring-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-[#B3E5FC] text-[#0B2838] hover:bg-[#E1F5FE]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Primary Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center space-x-1 py-2 border-t border-[#B3E5FC]/70">
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
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-[0.12em] font-semibold transition-all ${
                      current === 'products'
                        ? 'text-[#0288D1] bg-[#E1F5FE] font-bold border-b-2 border-[#0288D1]'
                        : 'text-[#355C75] hover:text-[#0288D1] hover:bg-[#F0F9FF]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#29B6F6] group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {isCategoriesDropdownOpen && (
                    <div className="absolute top-full left-0 w-[680px] p-5 bg-white rounded-2xl border border-[#B3E5FC] shadow-2xl grid grid-cols-2 gap-4 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="col-span-2 pb-2 border-b border-[#B3E5FC] flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0B2838]">
                            Folder-Driven Product Categories
                          </span>
                          <p className="text-[10px] text-[#355C75] font-mono mt-0.5">
                            Root: <code className="text-[#0288D1]">public/images/products/Our Products/</code>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setIsCategoriesDropdownOpen(false);
                            onNavigate('products');
                          }}
                          className="text-[11px] font-mono uppercase tracking-wider text-[#0288D1] hover:underline flex items-center gap-1 font-bold"
                        >
                          View All Instruments <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {CATEGORIES_TREE.map((cat) => (
                        <div key={cat.slug} className="space-y-1 p-3 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] hover:border-[#29B6F6] transition-colors">
                          <button
                            onClick={() => {
                              setIsCategoriesDropdownOpen(false);
                              onNavigate('products', undefined, cat.slug);
                            }}
                            className="text-xs font-bold text-[#0B2838] hover:text-[#0288D1] flex items-center gap-1.5 text-left w-full"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#0288D1]" />
                            {cat.name}
                          </button>
                          <div className="pl-3 space-y-0.5">
                            {cat.subCategories.map((sub) => (
                              <button
                                key={sub.slug}
                                onClick={() => {
                                  setIsCategoriesDropdownOpen(false);
                                  onNavigate('products', undefined, sub.slug);
                                }}
                                className="block text-[10px] font-mono text-[#355C75] hover:text-[#0288D1] transition-colors text-left"
                              >
                                └─ {sub.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-[0.12em] font-semibold transition-all flex items-center gap-1.5 ${
                  current === link.id
                    ? 'text-[#0288D1] bg-[#E1F5FE] font-bold border-b-2 border-[#0288D1]'
                    : 'text-[#355C75] hover:text-[#0288D1] hover:bg-[#F0F9FF]'
                } ${link.isSpecial ? 'text-[#01579B] bg-[#B3E5FC]/50 border border-[#81D4FA]' : ''}`}
              >
                {link.isSpecial && <Sparkles className="w-3 h-3 text-[#0288D1]" />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#B3E5FC] bg-[#F4FAFD] p-4 space-y-3 animate-in slide-in-from-top">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#29B6F6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code MT-*"
              className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#B3E5FC] text-[#0B2838] font-mono"
            />
          </div>

          <div className="space-y-1 divide-y divide-[#B3E5FC]/60">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate(link.id);
                }}
                className={`w-full text-left px-3 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center justify-between ${
                  current === link.id ? 'text-[#0288D1] bg-[#E1F5FE] rounded-xl font-bold' : 'text-[#355C75]'
                }`}
              >
                <span>{link.label}</span>
                {link.isSpecial && <Sparkles className="w-3.5 h-3.5 text-[#0288D1]" />}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#B3E5FC] flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenFolderGuide();
              }}
              className="w-full py-2 bg-white text-[#0B2838] hover:text-[#0288D1] rounded-xl border border-[#B3E5FC] text-xs font-mono flex items-center justify-center gap-1.5"
            >
              <Folder className="w-3.5 h-3.5 text-[#0288D1]" />
              Folder Structure Guide
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenRFQ();
              }}
              className="w-full py-2.5 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold uppercase tracking-wider rounded-xl text-xs font-mono shadow-md shadow-[#0288D1]/25"
            >
              Request B2B Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
