import React, { useState, useMemo } from 'react';
import { 
  Folder, Layers, ChevronRight, ArrowLeft, ArrowRight, Eye, 
  ShoppingBag, Sparkles, Search, Check, Filter, Box, Shield,
  ExternalLink, ZoomIn, CheckCircle2, ChevronDown, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryTree, Product } from '../types';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';

interface HierarchicalCategoryExplorerProps {
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenRFQ: (product?: Product) => void;
  onOpen3DStudio: (product: Product) => void;
}

export const HierarchicalCategoryExplorer: React.FC<HierarchicalCategoryExplorerProps> = ({
  onNavigate,
  onOpenQuickView,
  onOpenRFQ,
  onOpen3DStudio
}) => {
  // Navigation drill-down state
  // null = Level 1 (All Main Categories)
  // string (category slug) = Level 2 (Sub-categories of selected category)
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);

  // null = Level 2 view
  // string (subcategory slug) = Level 3 (Products inside selected subcategory)
  const [activeSubCategorySlug, setActiveSubCategorySlug] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Category Object
  const activeCategory = useMemo(() => {
    if (!activeCategorySlug) return null;
    return CATEGORIES_TREE.find(c => c.slug === activeCategorySlug) || null;
  }, [activeCategorySlug]);

  // Selected SubCategory Object
  const activeSubCategory = useMemo(() => {
    if (!activeCategory || !activeSubCategorySlug) return null;
    return activeCategory.subCategories.find(s => s.slug === activeSubCategorySlug) || null;
  }, [activeCategory, activeSubCategorySlug]);

  // Products belonging to the selected category/subcategory
  const categoryProducts = useMemo(() => {
    if (!activeCategory) return [];
    
    return PRODUCTS.filter(p => {
      const matchCat = p.category.toLowerCase() === activeCategory.name.toLowerCase() ||
                       (activeCategory.name === 'General Surgery' && p.category.includes('Surgery')) ||
                       (activeCategory.name.includes('Dental') && p.category.includes('Dental')) ||
                       (activeCategory.name.includes('Orthopedic') && p.category.includes('Orthopedic')) ||
                       (activeCategory.name.includes('Gynecology') && p.category.includes('Gynecology')) ||
                       (activeCategory.name.includes('ENT') && p.category.includes('ENT')) ||
                       (activeCategory.name.includes('Sets') && p.category.includes('Sets')) ||
                       (activeCategory.name.includes('Cardio') && p.category.includes('Cardio')) ||
                       (activeCategory.name.includes('Plastic') && p.category.includes('Plastic'));

      if (!activeSubCategory) return matchCat;

      const matchSub = p.subCategory.toLowerCase() === activeSubCategory.name.toLowerCase() ||
                       p.subCategory.toLowerCase().includes(activeSubCategory.name.toLowerCase().split(' ')[0]);

      return matchCat && matchSub;
    });
  }, [activeCategory, activeSubCategory]);

  // Filtered Main Categories for search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES_TREE;
    const query = searchQuery.toLowerCase();
    return CATEGORIES_TREE.filter(cat => 
      cat.name.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query) ||
      cat.subCategories.some(s => s.name.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Reset drill-down
  const handleResetToAll = () => {
    setActiveCategorySlug(null);
    setActiveSubCategorySlug(null);
  };

  const handleSelectCategory = (catSlug: string) => {
    setActiveCategorySlug(catSlug);
    setActiveSubCategorySlug(null);
  };

  const handleSelectSubCategory = (subSlug: string) => {
    setActiveSubCategorySlug(subSlug);
  };

  // Helper to count total products in a category
  const getCategoryProductCount = (cat: CategoryTree) => {
    const prods = PRODUCTS.filter(p => 
      p.category.toLowerCase() === cat.name.toLowerCase() ||
      (cat.name === 'General Surgery' && p.category.includes('Surgery')) ||
      (cat.name.includes('Dental') && p.category.includes('Dental')) ||
      (cat.name.includes('Orthopedic') && p.category.includes('Orthopedic')) ||
      (cat.name.includes('Gynecology') && p.category.includes('Gynecology')) ||
      (cat.name.includes('ENT') && p.category.includes('ENT')) ||
      (cat.name.includes('Sets') && p.category.includes('Sets')) ||
      (cat.name.includes('Cardio') && p.category.includes('Cardio')) ||
      (cat.name.includes('Plastic') && p.category.includes('Plastic'))
    );
    return Math.max(prods.length, cat.itemCount || cat.subCategories.length * 2);
  };

  // Helper to get fallback or first product image for a category
  const getCategoryDisplayImage = (cat: CategoryTree) => {
    if (cat.imageUrl) return cat.imageUrl;
    const prod = PRODUCTS.find(p => p.category === cat.name);
    return prod?.images[0] || '/surgical1.jpg';
  };

  // Helper to get image for subcategory
  const getSubCategoryDisplayImage = (cat: CategoryTree, sub: { name: string; imageUrl?: string; slug: string }) => {
    if (sub.imageUrl) return sub.imageUrl;
    const prod = PRODUCTS.find(p => p.subCategory.toLowerCase() === sub.name.toLowerCase());
    return prod?.images[0] || cat.imageUrl || '/surgical2.jpg';
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* HEADER WITH REAL-TIME BREADCRUMBS & FAST CONTROLS */}
      <div className="bg-white rounded-3xl border border-[#B3E5FC] p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#B3E5FC]/60 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[#0288D1] text-xs font-bold uppercase tracking-[0.15em] font-mono">
              <Folder className="w-4 h-4 text-[#0288D1]" />
              <span>Hierarchical Category Navigation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2838] tracking-tight mt-1">
              Instrument Categories & Sub-Directories
            </h2>
            <p className="text-xs sm:text-sm text-[#355C75] mt-1 font-mono">
              Click any Main Category to reveal Sub-Categories, then click to view actual Product Models.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-[#355C75] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories or SKUs..."
                className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] text-[#0B2838] placeholder-[#355C75]/60 focus:outline-none focus:border-[#0288D1]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#355C75] hover:text-[#0288D1]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Complete Catalog Direct Link */}
            <button
              onClick={() => onNavigate('products')}
              className="px-4 py-2 rounded-xl bg-[#0288D1] hover:bg-[#01579B] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>Full Catalog ({PRODUCTS.length} SKUs)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BREADCRUMB TRAIL */}
        <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
          <button
            onClick={handleResetToAll}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              !activeCategorySlug 
                ? 'bg-[#0288D1] text-white font-bold shadow-xs' 
                : 'bg-[#F4FAFD] text-[#0288D1] hover:bg-[#E1F5FE] border border-[#B3E5FC]'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>All Categories ({CATEGORIES_TREE.length})</span>
          </button>

          {activeCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#355C75]" />
              <button
                onClick={() => setActiveSubCategorySlug(null)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  !activeSubCategorySlug 
                    ? 'bg-[#0288D1] text-white font-bold shadow-xs' 
                    : 'bg-[#F4FAFD] text-[#0288D1] hover:bg-[#E1F5FE] border border-[#B3E5FC]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{activeCategory.name}</span>
              </button>
            </>
          )}

          {activeSubCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#355C75]" />
              <span className="px-3 py-1.5 rounded-lg bg-[#01579B] text-white font-bold shadow-xs flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5" />
                <span>{activeSubCategory.name} ({categoryProducts.length} Items)</span>
              </span>
            </>
          )}

          {/* Quick Back Button if drilled down */}
          {(activeCategorySlug || activeSubCategorySlug) && (
            <button
              onClick={() => {
                if (activeSubCategorySlug) {
                  setActiveSubCategorySlug(null);
                } else {
                  setActiveCategorySlug(null);
                }
              }}
              className="ml-auto px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4FAFD] text-[#0288D1] border border-[#0288D1] text-xs font-mono font-bold flex items-center gap-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{activeSubCategorySlug ? `Back to ${activeCategory?.name}` : 'Back to All Categories'}</span>
            </button>
          )}
        </div>

        {/* QUICK CATEGORY TABS BAR */}
        <div className="mt-4 pt-3 border-t border-[#B3E5FC]/40 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[11px] font-mono text-[#355C75] whitespace-nowrap mr-1 font-bold">
            Quick Jump:
          </span>
          {CATEGORIES_TREE.map(cat => {
            const isSelected = activeCategorySlug === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => handleSelectCategory(cat.slug)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#0288D1] text-white font-bold'
                    : 'bg-[#F4FAFD] text-[#355C75] hover:bg-[#E1F5FE] hover:text-[#0288D1] border border-[#B3E5FC]/80'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[9px] px-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-[#E1F5FE] text-[#0288D1]'}`}>
                  {cat.subCategories.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <AnimatePresence mode="wait">
        {/* =========================================================================
            TIER 1: ALL MAIN CATEGORIES (DEFAULT VIEW WITH VISUAL IMAGES + DETAILS)
           ========================================================================= */}
        {!activeCategorySlug && (
          <motion.div
            key="tier-1-main-categories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-[#355C75] flex items-center gap-2">
                <span className="font-bold text-[#0B2838]">Showing {filteredCategories.length} Main Categories</span>
                <span>• Each card displays representative instrument imagery</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCategories.map((cat) => {
                const imgUrl = getCategoryDisplayImage(cat);
                const totalSkus = getCategoryProductCount(cat);

                return (
                  <div
                    key={cat.slug}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="bg-white rounded-2xl border border-[#B3E5FC] hover:border-[#0288D1] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-1"
                  >
                    {/* Category Image Header */}
                    <div className="relative aspect-4/3 bg-[#F4FAFD] overflow-hidden border-b border-[#B3E5FC]/60">
                      <img
                        src={imgUrl}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2838]/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#0288D1] text-white shadow-xs">
                          {cat.subCategories.length} Sub-Folders
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/95 text-[#01579B] backdrop-blur-xs border border-[#81D4FA] shadow-xs">
                          {totalSkus}+ SKUs
                        </span>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <h3 className="text-base font-extrabold text-white leading-tight drop-shadow-xs group-hover:text-[#81D4FA] transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-[10px] font-mono text-[#E1F5FE] truncate mt-0.5 opacity-90">
                          {cat.folderPath}
                        </p>
                      </div>
                    </div>

                    {/* Category Card Body */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-[#355C75] line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>

                      {/* Sub-Category Pills Preview */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono font-bold text-[#62879F] uppercase tracking-wider block">
                          Included Sub-Categories:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {cat.subCategories.slice(0, 3).map((sub) => (
                            <span
                              key={sub.slug}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4FAFD] text-[#355C75] border border-[#B3E5FC]/70 group-hover:border-[#0288D1]/40"
                            >
                              {sub.name}
                            </span>
                          ))}
                          {cat.subCategories.length > 3 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E1F5FE] text-[#0288D1] font-bold">
                              +{cat.subCategories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-3 border-t border-[#B3E5FC]/50 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#0288D1] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Explore Sub-Categories <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="w-6 h-6 rounded-full bg-[#E1F5FE] group-hover:bg-[#0288D1] text-[#0288D1] group-hover:text-white flex items-center justify-center transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TIER 2: SUBCATEGORIES (WHEN A MAIN CATEGORY IS CLICKED)
           ========================================================================= */}
        {activeCategory && !activeSubCategorySlug && (
          <motion.div
            key={`tier-2-${activeCategory.slug}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Category Banner Hero Card */}
            <div className="bg-gradient-to-r from-[#0B2838] to-[#01579B] rounded-3xl p-6 text-white relative overflow-hidden shadow-md">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden md:block">
                <img
                  src={getCategoryDisplayImage(activeCategory)}
                  alt={activeCategory.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-mono border border-white/20">
                  <Folder className="w-3.5 h-3.5 text-[#81D4FA]" />
                  <span>{activeCategory.folderPath}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeCategory.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#B3E5FC] leading-relaxed">
                  {activeCategory.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1 text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#81D4FA]" />
                    <span>{activeCategory.subCategories.length} Specialized Sub-Categories</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#81D4FA]">
                    <Box className="w-4 h-4" />
                    <span>Click any sub-category card below to inspect product models</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Categories Grid with Visual Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#0B2838] flex items-center gap-2">
                  <span>Sub-Categories in {activeCategory.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#E1F5FE] text-[#0288D1] font-bold border border-[#81D4FA]">
                    {activeCategory.subCategories.length} Sections
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCategory.subCategories.map((sub) => {
                  const subImg = getSubCategoryDisplayImage(activeCategory, sub);
                  const matchingProductsCount = PRODUCTS.filter(p => 
                    p.subCategory.toLowerCase() === sub.name.toLowerCase() ||
                    p.subCategory.toLowerCase().includes(sub.name.toLowerCase().split(' ')[0])
                  ).length;

                  return (
                    <div
                      key={sub.slug}
                      onClick={() => handleSelectSubCategory(sub.slug)}
                      className="bg-white rounded-2xl border border-[#B3E5FC] hover:border-[#0288D1] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-1"
                    >
                      {/* Image header */}
                      <div className="relative aspect-16/9 bg-[#F4FAFD] overflow-hidden border-b border-[#B3E5FC]/60">
                        <img
                          src={subImg}
                          alt={sub.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2838]/80 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0288D1] text-white shadow-xs">
                            {Math.max(matchingProductsCount, sub.itemCount)} Products
                          </span>
                        </div>

                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <h4 className="text-base font-extrabold text-white leading-tight drop-shadow-xs group-hover:text-[#81D4FA] transition-colors">
                            {sub.name}
                          </h4>
                          <span className="text-[10px] font-mono text-[#E1F5FE] truncate block opacity-90">
                            {sub.folderPath}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <p className="text-xs text-[#355C75] leading-relaxed line-clamp-2">
                          {sub.description || `High-precision surgical grade ${sub.name.toLowerCase()} manufactured in Sialkot.`}
                        </p>

                        <div className="pt-3 border-t border-[#B3E5FC]/50 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-[#0288D1] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            View Product Models <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                          <span className="w-6 h-6 rounded-full bg-[#E1F5FE] group-hover:bg-[#0288D1] text-[#0288D1] group-hover:text-white flex items-center justify-center transition-colors">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TIER 3: PRODUCT IMAGES & SKUs (WHEN A SUB-CATEGORY IS CLICKED)
           ========================================================================= */}
        {activeCategory && activeSubCategory && (
          <motion.div
            key={`tier-3-${activeSubCategory.slug}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Subcategory Header */}
            <div className="bg-white rounded-2xl border border-[#B3E5FC] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#0288D1]">
                  <span>{activeCategory.name}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="font-bold text-[#0B2838]">{activeSubCategory.name}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2838] mt-1">
                  {activeSubCategory.name} Instruments
                </h3>
                <p className="text-xs text-[#355C75] font-mono mt-0.5">
                  Directory: <code className="text-[#0288D1]">{activeSubCategory.folderPath}</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSubCategorySlug(null)}
                  className="px-3 py-1.5 rounded-xl bg-[#F4FAFD] hover:bg-[#E1F5FE] text-[#0288D1] border border-[#B3E5FC] text-xs font-mono font-bold flex items-center gap-1 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sub-Categories</span>
                </button>
                <button
                  onClick={() => onNavigate('products', undefined, activeSubCategory.slug)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0288D1] hover:bg-[#01579B] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <span>Open in Catalog</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl border border-[#B3E5FC] hover:border-[#0288D1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Product Image Stage */}
                      <div className="relative aspect-square bg-[#F4FAFD] p-5 flex items-center justify-center overflow-hidden border-b border-[#B3E5FC]/60">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-[#01579B] border border-[#81D4FA] shadow-xs">
                            {prod.code}
                          </span>
                          {prod.finish && prod.finish.includes('Gold') && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                              TC Gold
                            </span>
                          )}
                        </div>

                        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1">
                          {prod.has3DModel && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#0288D1] text-white flex items-center gap-1 shadow-xs">
                              <Box className="w-2.5 h-2.5" /> 3D CAD
                            </span>
                          )}
                          {prod.isBestSeller && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-600 text-white shadow-xs">
                              Top Rated
                            </span>
                          )}
                        </div>

                        {/* Quick View Floating Overlay on Hover */}
                        <div className="absolute inset-0 bg-[#0B2838]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                          <button
                            onClick={() => onOpenQuickView(prod)}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4FAFD] text-[#0B2838] text-xs font-mono font-bold flex items-center gap-1 shadow-md transition-transform hover:scale-105"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#0288D1]" />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-2">
                        <div className="text-[11px] font-mono text-[#0288D1] font-semibold">
                          {prod.subCategory}
                        </div>
                        <h4 className="text-sm font-bold text-[#0B2838] group-hover:text-[#0288D1] transition-colors leading-snug line-clamp-2">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-[#355C75] line-clamp-2">
                          {prod.shortDesc}
                        </p>

                        <div className="pt-2 text-[11px] font-mono text-[#62879F] space-y-0.5">
                          <div className="flex justify-between">
                            <span>Material:</span>
                            <span className="text-[#0B2838] font-medium truncate max-w-[130px]">{prod.material}</span>
                          </div>
                          {prod.size && (
                            <div className="flex justify-between">
                              <span>Size:</span>
                              <span className="text-[#0B2838] font-medium">{prod.size}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* B2B Action Buttons */}
                    <div className="p-4 pt-2 border-t border-[#B3E5FC]/60 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-[#355C75] flex items-center gap-1 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          ISO 13485 Certified
                        </span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                          Direct OEM Supply
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => onOpenQuickView(prod)}
                          className="w-full py-2 rounded-xl bg-[#F4FAFD] hover:bg-[#E1F5FE] text-[#0288D1] text-xs font-mono font-bold border border-[#B3E5FC] flex items-center justify-center gap-1 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => onOpenRFQ(prod)}
                          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-[#01579B] text-white text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quote</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#F4FAFD] rounded-2xl border border-dashed border-[#B3E5FC] p-12 text-center space-y-3">
                <Box className="w-12 h-12 text-[#0288D1]/40 mx-auto" />
                <h4 className="text-base font-bold text-[#0B2838]">
                  Instruments Ready in Master Catalog
                </h4>
                <p className="text-xs text-[#355C75] max-w-md mx-auto">
                  Multiple precision SKUs are available for <span className="font-bold text-[#0B2838]">{activeSubCategory.name}</span> in our complete Sialkot export registry.
                </p>
                <button
                  onClick={() => onNavigate('products', undefined, activeSubCategory.slug)}
                  className="px-4 py-2 rounded-xl bg-[#0288D1] hover:bg-[#01579B] text-white text-xs font-mono font-bold inline-flex items-center gap-2 transition-all shadow-xs"
                >
                  <span>Explore Full {activeSubCategory.name} Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
