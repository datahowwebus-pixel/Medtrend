import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Grid, List, Sparkles, FileText, 
  ShoppingBag, Eye, Check, ChevronRight, Folder, RefreshCw, Layers 
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';

interface ProductsPageProps {
  initialCategorySlug?: string;
  onNavigateToDetail: (productId: string) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenRFQ: (product: Product) => void;
  onOpenDataSheet: (product: Product) => void;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onOpen3DStudio: (product: Product) => void;
  onOpenFolderGuide: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategorySlug,
  onNavigateToDetail,
  onOpenQuickView,
  onOpenRFQ,
  onOpenDataSheet,
  onAddToCart,
  onOpen3DStudio,
  onOpenFolderGuide
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [only3D, setOnly3D] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'code'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = CATEGORIES_TREE.find(c => c.slug === selectedCategory);
        if (cat && product.category !== cat.name) {
          return false;
        }
      }

      // Sub Category filter
      if (selectedSubCategory !== 'all') {
        const matchingSub = CATEGORIES_TREE
          .flatMap(c => c.subCategories)
          .find(s => s.slug === selectedSubCategory);
        if (matchingSub && product.subCategory !== matchingSub.name) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCode = product.code.toLowerCase().includes(q);
        const matchesDesc = product.shortDesc.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // Finish filter
      if (selectedFinish !== 'all' && !product.availableFinishes.includes(selectedFinish)) {
        return false;
      }

      // 3D filter
      if (only3D && !product.has3DModel) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'code') return a.code.localeCompare(b.code);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, selectedSubCategory, searchQuery, selectedFinish, only3D, sortBy]);

  const activeCategoryObj = CATEGORIES_TREE.find(c => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 bg-white text-[#0B2838]">
      {/* Header & Folder Breadcrumb */}
      <div className="bg-[#E1F5FE] text-[#0B2838] rounded-2xl p-6 sm:p-8 border border-[#81D4FA] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0288D1]">
            <Folder className="w-3.5 h-3.5 text-[#0288D1]" />
            <span>Root: public/images/products/Our Products/</span>
            {activeCategoryObj && (
              <>
                <span className="text-[#355C75]">/</span>
                <span className="text-[#0B2838] font-bold">{activeCategoryObj.name}</span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B2838]">
            {activeCategoryObj ? activeCategoryObj.name : 'All Surgical & Medical Instruments'}
          </h1>
          <p className="text-xs sm:text-sm text-[#355C75] max-w-2xl">
            Browse our complete catalog of German-forged surgical instruments manufactured in Sialkot, Pakistan. Both single-unit retail orders and volume institutional container supplies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenFolderGuide}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F0F9FF] text-xs font-mono text-[#0288D1] border border-[#81D4FA] transition-colors flex items-center gap-2 font-bold shadow-xs"
          >
            <Folder className="w-3.5 h-3.5 text-[#0288D1]" />
            <span>Folder Structure Guide</span>
          </button>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-[#B3E5FC] shadow-sm">
          <div className="flex items-center justify-between border-b border-[#B3E5FC] pb-3">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#0B2838]">
              <Filter className="w-4 h-4 text-[#0288D1]" />
              <span>Catalog Filters</span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubCategory('all');
                setSearchQuery('');
                setSelectedFinish('all');
                setOnly3D(false);
              }}
              className="text-[11px] font-mono text-[#355C75] hover:text-[#0288D1] flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Main Category Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#355C75] font-mono uppercase tracking-wider">
              Main Category (Folder)
            </label>
            <div className="space-y-1 font-mono">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubCategory('all');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#0288D1] text-white font-bold shadow-sm'
                    : 'text-[#355C75] hover:bg-[#F4FAFD] hover:text-[#0B2838]'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] opacity-80">({PRODUCTS.length})</span>
              </button>

              {CATEGORIES_TREE.map((cat) => {
                const count = PRODUCTS.filter(p => p.category === cat.name).length;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setSelectedSubCategory('all');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-[#0288D1] text-white font-bold shadow-sm'
                        : 'text-[#355C75] hover:bg-[#F4FAFD] hover:text-[#0B2838]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] ${selectedCategory === cat.slug ? 'text-white/80' : 'text-[#355C75]'}`}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Category Selector (if a category is active) */}
          {activeCategoryObj && (
            <div className="space-y-2 pt-2 border-t border-[#B3E5FC]">
              <label className="block text-xs font-bold text-[#355C75] font-mono uppercase tracking-wider">
                Sub-Folder Group
              </label>
              <div className="space-y-1 pl-2 border-l-2 border-[#0288D1] font-mono">
                <button
                  onClick={() => setSelectedSubCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${
                    selectedSubCategory === 'all' ? 'text-[#0288D1] font-bold bg-[#E1F5FE]' : 'text-[#355C75] hover:text-[#0B2838]'
                  }`}
                >
                  • All {activeCategoryObj.name}
                </button>
                {activeCategoryObj.subCategories.map((sub) => (
                  <button
                    key={sub.slug}
                    onClick={() => setSelectedSubCategory(sub.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${
                      selectedSubCategory === sub.slug ? 'text-[#0288D1] font-bold bg-[#E1F5FE]' : 'text-[#355C75] hover:text-[#0B2838]'
                    }`}
                  >
                    • {sub.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Surface Metallurgy / Finish */}
          <div className="space-y-2 pt-3 border-t border-[#B3E5FC]">
            <label className="block text-xs font-bold text-[#355C75] font-mono uppercase tracking-wider">
              Surface Metallurgy
            </label>
            <select
              value={selectedFinish}
              onChange={(e) => setSelectedFinish(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-mono focus:border-[#0288D1] focus:outline-none"
            >
              <option value="all">All Finishes</option>
              <option value="Satin Matte">German Satin Matte</option>
              <option value="Mirror Polish">High-Gloss Mirror</option>
              <option value="Tungsten Carbide Gold">Tungsten Carbide (TC Gold)</option>
              <option value="Blue Titanium">Blue Titanium Nitride</option>
              <option value="Black Ceramic">Tactical Black Ceramic</option>
            </select>
          </div>

          {/* 3D Model Toggle */}
          <div className="pt-3 border-t border-[#B3E5FC]">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={only3D}
                onChange={(e) => setOnly3D(e.target.checked)}
                className="w-4 h-4 rounded accent-[#0288D1] bg-white border-[#B3E5FC]"
              />
              <span className="text-xs font-mono text-[#0B2838] flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#0288D1]" />
                Only 3D & Video Loop SKUs
              </span>
            </label>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Search, Sorting & View Toggle Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#B3E5FC] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#29B6F6]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by product name, code (e.g. MT-HF-001), size..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#F4FAFD] focus:bg-white rounded-xl border border-[#B3E5FC] focus:outline-none focus:border-[#0288D1] text-[#0B2838] font-mono"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#355C75] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-2 text-xs rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
                >
                  <option value="featured">Best Sellers First</option>
                  <option value="code">Product Code (MT-A-Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Grid / List Mode */}
              <div className="flex items-center bg-[#E1F5FE] rounded-xl p-1 border border-[#81D4FA]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#0288D1] text-white font-bold shadow-xs' : 'text-[#355C75] hover:text-[#0B2838]'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#0288D1] text-white font-bold shadow-xs' : 'text-[#355C75] hover:text-[#0B2838]'
                  }`}
                  title="B2B List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-[#355C75] px-1 font-mono">
            <span>Showing <strong className="text-[#0B2838]">{filteredProducts.length}</strong> matching medical instruments</span>
            <span className="text-[11px] text-[#0288D1] font-bold">Sialkot Manufacturing • CE / ISO Space</span>
          </div>

          {/* Product Grid / List */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#B3E5FC] space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center mx-auto border border-[#81D4FA]">
                <Search className="w-6 h-6 text-[#0288D1]" />
              </div>
              <h3 className="text-base font-bold text-[#0B2838]">No Instruments Found</h3>
              <p className="text-xs text-[#355C75] max-w-sm mx-auto">
                No surgical tools matched your active filters. Try resetting the category or search keyword.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubCategory('all');
                  setSearchQuery('');
                  setSelectedFinish('all');
                }}
                className="px-4 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold font-mono rounded-xl text-xs uppercase transition-colors shadow-md shadow-[#0288D1]/25"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-[#B3E5FC] overflow-hidden hover:border-[#0288D1] transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-square bg-[#F4FAFD] p-6 flex items-center justify-center border-b border-[#B3E5FC]/60 overflow-hidden">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />

                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white text-[#01579B] border border-[#81D4FA]">
                          {prod.code}
                        </span>
                        {prod.isBestSeller && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#0288D1] text-white">
                            BEST SELLER
                          </span>
                        )}
                      </div>

                      {/* 3D button */}
                      {prod.has3DModel && (
                        <button
                          onClick={() => onOpen3DStudio(prod)}
                          className="absolute bottom-3 right-3 p-2 rounded-xl bg-white hover:bg-[#0288D1] text-[#0288D1] hover:text-white border border-[#81D4FA] transition-colors shadow-sm"
                          title="Interactive 3D Turntable"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-2">
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#62879F] font-mono">
                        {prod.category} • {prod.subCategory}
                      </div>

                      <h3
                        onClick={() => onNavigateToDetail(prod.id)}
                        className="text-sm font-bold text-[#0B2838] hover:text-[#0288D1] cursor-pointer line-clamp-2 transition-colors"
                      >
                        {prod.name}
                      </h3>

                      <p className="text-xs text-[#355C75] line-clamp-2">
                        {prod.shortDesc}
                      </p>

                      <div className="text-[10px] text-[#0B2838] font-mono bg-[#F4FAFD] p-2 rounded-xl border border-[#B3E5FC]">
                        {prod.material} • {prod.size}
                      </div>
                    </div>
                  </div>

                  {/* Actions & B2B Inquiry */}
                  <div className="p-5 pt-0 space-y-3">
                    <div className="flex items-center justify-between border-t border-[#B3E5FC]/60 pt-3 text-[10px] font-mono">
                      <span className="text-[#355C75] flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        In Stock & OEM
                      </span>
                      <span className="text-[#0288D1] font-semibold bg-[#E1F5FE] px-2 py-0.5 rounded border border-[#81D4FA]">
                        Volume Pricing on RFQ
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono">
                      <button
                        onClick={() => onOpenQuickView(prod)}
                        className="w-full py-2 bg-white hover:bg-[#F0F9FF] text-[#0B2838] rounded-xl text-xs transition-colors flex items-center justify-center gap-1 border border-[#B3E5FC]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#0288D1]" /> Quick View
                      </button>
                      <button
                        onClick={() => onOpenRFQ(prod)}
                        className="w-full py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#B3E5FC]" /> B2B Quote
                      </button>
                    </div>

                    <button
                      onClick={() => onNavigateToDetail(prod.id)}
                      className="w-full py-2 border border-[#B3E5FC] hover:border-[#0288D1] hover:text-[#0288D1] text-[#355C75] rounded-xl text-xs font-mono transition-colors flex items-center justify-center gap-1"
                    >
                      Specifications <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* B2B List View */
            <div className="space-y-3">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 bg-white rounded-2xl border border-[#B3E5FC] hover:border-[#0288D1] transition-all flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-16 h-16 object-contain bg-[#F4FAFD] rounded-xl border border-[#B3E5FC] p-1 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#01579B] bg-[#E1F5FE] px-2 py-0.5 rounded-lg border border-[#81D4FA]">
                          {prod.code}
                        </span>
                        <span className="text-[10px] text-[#62879F] font-mono">{prod.folderPath}</span>
                      </div>
                      <h3
                        onClick={() => onNavigateToDetail(prod.id)}
                        className="text-sm font-bold text-[#0B2838] hover:text-[#0288D1] cursor-pointer mt-0.5"
                      >
                        {prod.name}
                      </h3>
                      <div className="text-xs text-[#355C75] font-mono flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        <span><strong>Material:</strong> {prod.material}</span>
                        <span><strong>Hardness:</strong> {prod.hardness}</span>
                        <span><strong>Size:</strong> {prod.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[#B3E5FC]/60">
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-[#0288D1] bg-[#E1F5FE] px-2.5 py-1 rounded-md border border-[#81D4FA]">
                        B2B Factory Supply
                      </div>
                      <div className="text-[10px] text-[#62879F] mt-0.5">
                        Volume Tier on RFQ
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      <button
                        onClick={() => onOpenQuickView(prod)}
                        className="p-2 rounded-xl bg-white hover:bg-[#F0F9FF] text-[#355C75] hover:text-[#0288D1] border border-[#B3E5FC]"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4 text-[#0288D1]" />
                      </button>
                      <button
                        onClick={() => onOpenDataSheet(prod)}
                        className="p-2 rounded-xl bg-white hover:bg-[#F0F9FF] text-[#355C75] hover:text-[#0288D1] border border-[#B3E5FC]"
                        title="Download Technical Spec Sheet"
                      >
                        <FileText className="w-4 h-4 text-[#0288D1]" />
                      </button>
                      <button
                        onClick={() => onOpenRFQ(prod)}
                        className="px-3.5 py-2 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs shadow-md shadow-[#0288D1]/25"
                      >
                        RFQ Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
