import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Grid, List, Sparkles, FileText, 
  ShoppingBag, Eye, Check, ChevronRight, Folder, RefreshCw, Layers, CheckCircle2, RotateCw, Truck
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';

interface ProductsPageProps {
  initialCategorySlug?: string;
  onNavigateToDetail: (productId: string) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenRFQ?: (product: Product) => void;
  onOpenDataSheet: (product: Product) => void;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onOpen3DStudio: (product: Product) => void;
  onOpenFolderGuide: () => void;
  onOpenCart?: () => void;
  onNavigateToCheckout?: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategorySlug,
  onNavigateToDetail,
  onOpenQuickView,
  onOpenDataSheet,
  onAddToCart,
  onOpen3DStudio,
  onOpenFolderGuide,
  onOpenCart,
  onNavigateToCheckout
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [only3D, setOnly3D] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'code'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedToastId, setAddedToastId] = useState<string | null>(null);

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

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onAddToCart(product, product.availableFinishes[0] || 'Satin Matte', 1);
    setAddedToastId(product.id);
    setTimeout(() => setAddedToastId(null), 2500);
    if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleQuickBuy = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onAddToCart(product, product.availableFinishes[0] || 'Satin Matte', 1);
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    }
  };

  return (
    <div className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-10 space-y-10 pb-28 bg-[#f8fbfe] text-[#195aa7]">
      
      {/* Header & Breadcrumbs */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#1ab8ec]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#eb5d0b] font-bold">
            <ShoppingBag className="w-4 h-4 text-[#eb5d0b]" />
            <span>Direct Clinical Store</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#195aa7]">{activeCategoryObj ? activeCategoryObj.name : 'All Precision Instruments'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#195aa7]">
            {activeCategoryObj ? activeCategoryObj.name : 'Shop Surgical & Medical Instruments'}
          </h1>
          <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
            Order single instruments or clinic sets online with verified German DIN steel metallurgy, instant dispatch via DHL Express, and 30-day clinical satisfaction guarantees.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenFolderGuide}
            className="px-5 py-3 rounded-xl bg-[#f4f8fc] hover:bg-[#1ab8ec]/15 text-xs font-mono text-[#195aa7] border border-[#195aa7]/20 transition-all flex items-center gap-2 font-bold shadow-xs"
          >
            <Folder className="w-4 h-4 text-[#1ab8ec]" />
            <span>Asset Directory Guide</span>
          </button>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-3 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-black font-mono uppercase tracking-wider text-[#195aa7]">
              <Filter className="w-4 h-4 text-[#eb5d0b]" />
              <span>Store Filters</span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubCategory('all');
                setSearchQuery('');
                setSelectedFinish('all');
                setOnly3D(false);
                setSortBy('featured');
              }}
              className="text-[11px] font-mono text-gray-400 hover:text-[#eb5d0b] transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#195aa7]">
              Search SKU / Name
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. MT-HF-001, Kelly, TC..."
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 bg-[#f8fbfe] focus:bg-white text-[#195aa7] font-medium focus:border-[#195aa7] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Categories list */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#195aa7]">
              Surgical Departments
            </label>
            <div className="space-y-1 font-mono text-xs">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubCategory('all');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#195aa7] text-white font-bold'
                    : 'text-gray-700 hover:bg-[#f4f8fc]'
                }`}
              >
                <span>All Departments</span>
                <span className="text-[10px] opacity-75">{PRODUCTS.length}</span>
              </button>

              {CATEGORIES_TREE.map((cat) => {
                const count = PRODUCTS.filter(p => p.category === cat.name).length;
                const isSelected = selectedCategory === cat.slug;
                return (
                  <div key={cat.slug} className="space-y-0.5">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setSelectedSubCategory('all');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#195aa7] text-white font-bold'
                          : 'text-gray-700 hover:bg-[#f4f8fc]'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[10px] opacity-75">{count}</span>
                    </button>

                    {/* Subcategories */}
                    {isSelected && (
                      <div className="pl-4 py-1 space-y-0.5 border-l-2 border-[#1ab8ec] ml-2">
                        {cat.subCategories.map((sub) => (
                          <button
                            key={sub.slug}
                            onClick={() => setSelectedSubCategory(sub.slug)}
                            className={`w-full text-left px-2 py-1 rounded-lg text-[11px] transition-colors ${
                              selectedSubCategory === sub.slug
                                ? 'text-[#eb5d0b] font-bold bg-[#eb5d0b]/10'
                                : 'text-gray-500 hover:text-[#195aa7]'
                            }`}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Finish & Metallurgy Selector */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#195aa7]">
              Metallurgy / Finish
            </label>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
              {['all', 'Satin Matte', 'Mirror Polish', 'Tungsten Carbide', 'Titanium Blue'].map((fin) => (
                <button
                  key={fin}
                  onClick={() => setSelectedFinish(fin)}
                  className={`p-2 rounded-xl text-left truncate text-[11px] border transition-all ${
                    selectedFinish === fin
                      ? 'bg-[#195aa7] text-white border-[#195aa7] font-bold'
                      : 'bg-[#f8fbfe] text-gray-700 border-gray-200 hover:border-[#1ab8ec]'
                  }`}
                >
                  {fin === 'all' ? 'All Finishes' : fin}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Model Filter */}
          <div className="pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-[#195aa7]">
              <input
                type="checkbox"
                checked={only3D}
                onChange={(e) => setOnly3D(e.target.checked)}
                className="w-4 h-4 rounded text-[#195aa7] border-gray-300 focus:ring-[#195aa7]"
              />
              <span className="flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-[#eb5d0b]" /> Only 360° Studio Models
              </span>
            </label>
          </div>

          {/* Free Shipping Badge in Sidebar */}
          <div className="p-4 rounded-2xl bg-[#eb5d0b]/10 border border-[#eb5d0b]/30 space-y-1.5 font-mono text-xs text-[#195aa7]">
            <div className="font-bold flex items-center gap-1.5 text-[#eb5d0b]">
              <Truck className="w-4 h-4" /> Free Shipping On $150+
            </div>
            <p className="text-[11px] text-gray-600">
              Orders ship within 24 hours with tracked DHL Express air delivery.
            </p>
          </div>

        </div>

        {/* Right Product Grid/List Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Sort & View Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="text-gray-600">
              Showing <strong className="text-[#195aa7]">{filteredProducts.length}</strong> surgical instruments
            </div>

            <div className="flex items-center gap-4">
              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#f8fbfe] border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-[#195aa7] font-bold focus:outline-none focus:border-[#195aa7]"
                >
                  <option value="featured">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="code">Product Code (SKU)</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center bg-[#f8fbfe] p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#195aa7] text-white shadow-xs' : 'text-gray-400 hover:text-gray-700'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#195aa7] text-white shadow-xs' : 'text-gray-400 hover:text-gray-700'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Container */}
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-gray-200 space-y-4">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-xl font-bold text-[#195aa7]">No Instruments Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No instruments match your current filter selection. Try adjusting your search term or clearing filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubCategory('all');
                  setSearchQuery('');
                  setSelectedFinish('all');
                  setOnly3D(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#195aa7] text-white text-xs font-mono font-bold uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* E-Commerce Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl p-6 border border-gray-200/90 hover:border-[#1ab8ec] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Thumbnail Image Area */}
                    <div className="relative aspect-square rounded-2xl bg-[#f8fbfe] p-6 flex items-center justify-center overflow-hidden mb-5 border border-slate-100 group-hover:bg-white transition-colors">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/surgical1.jpg';
                        }}
                      />

                      {/* Top Left SKU Code */}
                      <span className="absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded-lg bg-[#195aa7] text-white font-mono text-[11px] font-black">
                        {prod.code}
                      </span>

                      {/* 3D button */}
                      {prod.has3DModel && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpen3DStudio(prod);
                          }}
                          className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-[#1ab8ec] hover:bg-[#149ec9] text-[#195aa7] font-mono text-[10px] font-bold flex items-center gap-1 shadow-sm transition-transform hover:scale-105"
                          title="Interactive 360° Turntable"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>360°</span>
                        </button>
                      )}

                      <span className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                        In Stock
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1ab8ec]">
                        {prod.category} • {prod.subCategory}
                      </div>

                      <h3
                        onClick={() => onNavigateToDetail(prod.id)}
                        className="text-base font-black text-[#195aa7] hover:text-[#eb5d0b] cursor-pointer line-clamp-2 transition-colors leading-snug"
                      >
                        {prod.name}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {prod.shortDesc}
                      </p>

                      <div className="text-[11px] text-gray-600 font-mono bg-[#f8fbfe] p-2 rounded-xl border border-gray-200/60">
                        {prod.material} • {prod.size}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Add to Cart */}
                  <div className="pt-5 mt-5 border-t border-gray-100 space-y-3 font-mono">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-black text-[#195aa7]">
                          ${prod.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ${Math.round(prod.price * 1.25)}.00
                        </span>
                      </div>

                      <button
                        onClick={() => onOpenQuickView(prod)}
                        className="p-2 rounded-xl bg-[#f4f8fc] hover:bg-[#1ab8ec]/20 text-[#195aa7] transition-all"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Pure E-Commerce Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => handleAddToCart(prod, e)}
                        className="w-full py-2.5 rounded-xl bg-[#195aa7] hover:bg-[#12437e] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>

                      <button
                        onClick={(e) => handleQuickBuy(prod, e)}
                        className="w-full py-2.5 rounded-xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#eb5d0b]/30 active:scale-95"
                      >
                        <span>Buy Now</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onNavigateToDetail(prod.id)}
                      className="w-full py-1.5 text-center text-xs text-gray-400 hover:text-[#195aa7] transition-colors"
                    >
                      View Full Specs →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* E-Commerce List View */
            <div className="space-y-4 font-mono">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 bg-white rounded-3xl border border-gray-200 hover:border-[#1ab8ec] transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm group"
                >
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-20 h-20 object-contain bg-[#f8fbfe] rounded-2xl border border-gray-200 p-2 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/surgical1.jpg';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#195aa7] bg-[#f4f8fc] px-2.5 py-0.5 rounded-lg border border-gray-200">
                          {prod.code}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          In Stock
                        </span>
                      </div>

                      <h3
                        onClick={() => onNavigateToDetail(prod.id)}
                        className="text-base font-bold text-[#195aa7] hover:text-[#eb5d0b] cursor-pointer mt-1 font-sans"
                      >
                        {prod.name}
                      </h3>

                      <div className="text-xs text-gray-500 flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        <span><strong>Material:</strong> {prod.material}</span>
                        <span>•</span>
                        <span><strong>Finish:</strong> {prod.finish}</span>
                        <span>•</span>
                        <span><strong>Size:</strong> {prod.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#195aa7]">
                        ${prod.price.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold uppercase">
                        24h Express Dispatch
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenQuickView(prod)}
                        className="p-3 rounded-xl bg-[#f4f8fc] hover:bg-[#1ab8ec]/20 text-[#195aa7] border border-gray-200 transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => handleAddToCart(prod, e)}
                        className="px-5 py-3 rounded-xl bg-[#195aa7] hover:bg-[#12437e] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add</span>
                      </button>

                      <button
                        onClick={(e) => handleQuickBuy(prod, e)}
                        className="px-5 py-3 rounded-xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#eb5d0b]/30 transition-all active:scale-95"
                      >
                        Buy Now
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
