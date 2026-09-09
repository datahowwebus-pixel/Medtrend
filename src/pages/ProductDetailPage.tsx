import React, { useState } from 'react';
import { 
  ShoppingBag, FileText, Sparkles, ShieldCheck, CheckCircle2, 
  RotateCw, ArrowLeft, Heart, Share2, Layers, Check, Box, ChevronRight, Download, Eye,
  Truck, Lock, Tag, Award, Star, Clock, AlertCircle
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/productsData';
import { Interactive3DViewer } from '../components/Interactive3DViewer';

interface ProductDetailPageProps {
  productId: string;
  onNavigateBack: () => void;
  onNavigateToProduct: (productId: string) => void;
  onAddToCart: (product: Product, finish: string, quantity: number, customEngraving?: string) => void;
  onOpenRFQ?: (product: Product) => void;
  onOpenDataSheet: (product: Product) => void;
  onOpen3DStudio: (product: Product) => void;
  onOpenCart?: () => void;
  onNavigateToCheckout?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigateBack,
  onNavigateToProduct,
  onAddToCart,
  onOpenDataSheet,
  onOpen3DStudio,
  onOpenCart,
  onNavigateToCheckout
}) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  
  const [selectedFinish, setSelectedFinish] = useState<string>(product.finish);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [activeViewMode, setActiveViewMode] = useState<'photos' | '3d-turntable'>('photos');
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'metallurgy' | 'reviews'>('specs');

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const originalPrice = Math.round(product.price * 1.25);

  const handleAddToCart = () => {
    onAddToCart(product, selectedFinish, quantity, customEngraving);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
    if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleBuyNow = () => {
    onAddToCart(product, selectedFinish, quantity, customEngraving);
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    }
  };

  return (
    <div className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-10 space-y-12 pb-28 text-[#195aa7] bg-[#f8fbfe]">
      
      {/* Back Button & Category Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <button
          onClick={onNavigateBack}
          className="inline-flex items-center gap-2 font-bold text-[#195aa7] hover:text-[#eb5d0b] transition-colors bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#eb5d0b]" /> Back to Products
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Shop</span>
          <span>/</span>
          <span className="text-[#195aa7] font-bold">{product.category}</span>
          <span>/</span>
          <span className="text-[#eb5d0b] font-mono font-bold">{product.code}</span>
        </div>
      </div>

      {/* Main Two-Column E-Commerce Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Visual Gallery & 3D Interactive Turntable */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Mode Switcher: 2D Photography vs 3D Turntable */}
          <div className="flex items-center bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm font-mono text-xs">
            <button
              onClick={() => setActiveViewMode('photos')}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                activeViewMode === 'photos'
                  ? 'bg-[#195aa7] text-white shadow-sm'
                  : 'text-gray-500 hover:text-[#195aa7]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Standard Photography</span>
            </button>

            <button
              onClick={() => setActiveViewMode('3d-turntable')}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                activeViewMode === '3d-turntable'
                  ? 'bg-[#195aa7] text-white shadow-sm'
                  : 'text-gray-500 hover:text-[#195aa7]'
              }`}
            >
              <RotateCw className="w-4 h-4 text-[#1ab8ec]" />
              <span>360° Inspection Video</span>
            </button>
          </div>

          {/* Visual Canvas */}
          {activeViewMode === 'photos' ? (
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center p-10 group">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/surgical1.jpg';
                  }}
                />

                <div className="absolute top-5 left-5 flex flex-col gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-lg font-black bg-[#195aa7] text-white shadow-sm">
                    {product.code}
                  </span>
                  <span className="px-3 py-1 rounded-lg font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Autoclavable 134°C
                  </span>
                </div>

                <div className="absolute bottom-5 right-5 text-[11px] font-mono text-gray-400 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-gray-200">
                  Folder: {product.imageFolder}
                </div>
              </div>

              {/* Multi-angle Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-square rounded-2xl bg-white border-2 p-2 overflow-hidden transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#eb5d0b] ring-2 ring-[#eb5d0b]/30 shadow-md'
                        : 'border-gray-200 hover:border-[#1ab8ec]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                    <span className="block text-[10px] text-gray-400 font-mono text-center mt-1">
                      Angle 0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Interactive3DViewer
                modelType={product.model3DType || 'forceps'}
                productName={product.name}
                productCode={product.code}
                initialFinish={selectedFinish}
                heightClass="h-96 sm:h-[480px]"
                videoLoopUrl={product.videoLoopUrl || '/3dslide1.mp4'}
              />
              <p className="text-xs text-gray-500 text-center font-mono">
                Real 360° video loop inspection with angle scrubbing and CAD wireframe overlay.
              </p>
            </div>
          )}

          {/* Quick Technical Links */}
          <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
            <button
              onClick={() => onOpenDataSheet(product)}
              className="py-3 px-4 rounded-2xl bg-white hover:bg-[#f4f8fc] border border-gray-200 text-[#195aa7] text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#1ab8ec]" />
              <span>Download Technical TDS</span>
            </button>

            <button
              onClick={() => onOpen3DStudio(product)}
              className="py-3 px-4 rounded-2xl bg-[#195aa7]/10 hover:bg-[#195aa7]/20 text-[#195aa7] text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#eb5d0b]" />
              <span>Full 3D Inspection Lab</span>
            </button>
          </div>
        </div>

        {/* Right Column: Pricing, Options & E-Commerce Buy Box */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header Title & Rating */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="font-bold uppercase tracking-wider text-[#eb5d0b] bg-[#eb5d0b]/10 px-3 py-1 rounded-lg">
                {product.category}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600 font-medium">{product.subCategory}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#195aa7] tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex text-amber-500 text-sm">
                {'★'.repeat(Math.floor(product.rating))}
              </div>
              <span className="text-xs font-mono font-bold text-[#195aa7]">{product.rating} / 5.0</span>
              <span className="text-xs text-gray-500 font-mono">({product.reviewCount} verified clinic reviews)</span>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-1">
              {product.shortDesc}
            </p>
          </div>

          {/* E-Commerce Buy Box */}
          <div className="p-7 rounded-3xl bg-white border-2 border-[#1ab8ec]/40 space-y-6 shadow-sm">
            
            {/* Price section with direct discount */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <span className="text-xs font-mono text-gray-400 font-bold block mb-1">Direct Factory Price:</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black font-mono text-[#195aa7]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-base text-gray-400 line-through font-mono">
                    ${originalPrice}.00
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eb5d0b]/10 text-[#eb5d0b] font-mono text-xs font-bold">
                    Save 20%
                  </span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> In Stock - Ships Within 24h
                </span>
                <div className="text-[11px] text-gray-500 mt-1">Free delivery on orders $150+</div>
              </div>
            </div>

            {/* 1. Finish & Metallurgy Selector */}
            <div className="space-y-2 font-mono">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                1. Select Surface Finish: <span className="text-[#eb5d0b] font-black">{selectedFinish}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.availableFinishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                      selectedFinish === f
                        ? 'bg-[#195aa7] text-white border-[#195aa7] shadow-md'
                        : 'bg-[#f8fbfe] text-gray-700 border-gray-200 hover:border-[#1ab8ec]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedFinish === f ? 'bg-[#eb5d0b]' : 'bg-gray-400'}`} />
                    <span>{f}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Optional Laser Marking / Clinic Name */}
            <div className="p-4 rounded-2xl bg-[#f8fbfe] border border-gray-200 space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#195aa7]">
                  2. Optional Laser Engraving (Free Clinic Personalization)
                </label>
                <span className="text-[10px] text-gray-400">Max 22 chars</span>
              </div>
              <input
                type="text"
                value={customEngraving}
                onChange={(e) => setCustomEngraving(e.target.value)}
                placeholder="e.g. ST. JUDE OR-4 / DR. VANCE"
                maxLength={22}
                className="w-full p-3 text-xs rounded-xl border border-gray-300 bg-white focus:bg-white text-[#195aa7] font-mono uppercase focus:border-[#195aa7] focus:outline-none"
              />
            </div>

            {/* 3. Quantity & Instant Purchasing Buttons */}
            <div className="space-y-4 pt-2 font-mono">
              <div className="flex items-center gap-3">
                {/* Quantity Counter */}
                <div className="flex items-center border-2 border-gray-200 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3.5 text-gray-600 hover:bg-[#f4f8fc] font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-5 py-3.5 font-mono font-black text-sm text-[#195aa7]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3.5 text-gray-600 hover:bg-[#f4f8fc] font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-xl shadow-[#eb5d0b]/30 active:scale-95"
                >
                  {addedToast ? (
                    <>
                      <Check className="w-5 h-5 text-white" /> Added to Shopping Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-white" /> Add to Cart (${(product.price * quantity).toFixed(2)})
                    </>
                  )}
                </button>
              </div>

              {/* Express 1-Click Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#195aa7] hover:bg-[#12437e] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <Lock className="w-4 h-4 text-[#1ab8ec]" />
                <span>Buy Now (Instant Express Checkout)</span>
              </button>
            </div>

            {/* Guarantees & Shipping Badges */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-gray-500">
              <div className="space-y-1">
                <Truck className="w-4 h-4 text-[#1ab8ec] mx-auto" />
                <p className="font-bold text-[#195aa7]">DHL Express</p>
                <p className="text-[10px]">Tracked Air Dispatch</p>
              </div>

              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#eb5d0b] mx-auto" />
                <p className="font-bold text-[#195aa7]">30-Day Return</p>
                <p className="text-[10px]">Money-Back Trial</p>
              </div>

              <div className="space-y-1">
                <Award className="w-4 h-4 text-[#1ab8ec] mx-auto" />
                <p className="font-bold text-[#195aa7]">Autoclavable</p>
                <p className="text-[10px]">DIN EN ISO 13485</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Technical Specifications & Verified Reviews Tabs */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-8">
        
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 gap-8 font-mono text-sm">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 font-bold border-b-2 transition-all ${
              activeTab === 'specs'
                ? 'border-[#eb5d0b] text-[#eb5d0b]'
                : 'border-transparent text-gray-500 hover:text-[#195aa7]'
            }`}
          >
            Clinical Specifications
          </button>

          <button
            onClick={() => setActiveTab('metallurgy')}
            className={`pb-4 font-bold border-b-2 transition-all ${
              activeTab === 'metallurgy'
                ? 'border-[#eb5d0b] text-[#eb5d0b]'
                : 'border-transparent text-gray-500 hover:text-[#195aa7]'
            }`}
          >
            German Steel Metallurgy & Heat Treat
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-bold border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-[#eb5d0b] text-[#eb5d0b]'
                : 'border-transparent text-gray-500 hover:text-[#195aa7]'
            }`}
          >
            Verified Practitioner Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Catalog SKU / Code:</span>
                <span className="font-bold text-[#195aa7]">{product.code}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Specialty Category:</span>
                <span className="font-bold text-[#195aa7]">{product.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Sub-Specialty:</span>
                <span className="font-bold text-[#195aa7]">{product.subCategory}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Overall Length / Size:</span>
                <span className="font-bold text-[#195aa7]">{product.size}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Tip / Jaw Geometry:</span>
                <span className="font-bold text-[#195aa7]">{product.tipType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Jaw Pattern:</span>
                <span className="font-bold text-[#195aa7]">{product.jawType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Autoclave Sterilization:</span>
                <span className="font-bold text-emerald-600">100% Steam up to 134°C (273°F)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Country of Manufacture:</span>
                <span className="font-bold text-[#195aa7]">Sialkot, Pakistan (Master Forged)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Metallurgy */}
        {activeTab === 'metallurgy' && (
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed font-mono">
            <div className="p-5 rounded-2xl bg-[#f8fbfe] border border-gray-200">
              <h4 className="font-bold text-[#195aa7] mb-2">Alloy Composition: {product.material}</h4>
              <p className="text-xs text-gray-600">
                Conforms strictly to ASTM F899-20 and DIN EN ISO 7153-1 (Surgical Instruments - Metallic Materials). Tempered in controlled vacuum furnaces to achieve hardness ratings of {product.hardness}.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-gray-200">
                <span className="text-gray-400 block mb-1">Hardness (Rockwell C):</span>
                <span className="font-black text-[#195aa7] text-base">{product.hardness}</span>
              </div>
              <div className="p-4 rounded-xl border border-gray-200">
                <span className="text-gray-400 block mb-1">Corrosion Resistance:</span>
                <span className="font-black text-emerald-600 text-base">Passivated Boil-Tested</span>
              </div>
              <div className="p-4 rounded-xl border border-gray-200">
                <span className="text-gray-400 block mb-1">Biocompatibility:</span>
                <span className="font-black text-[#195aa7] text-base">ISO 10993-1 Verified</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#195aa7] font-mono">{product.rating}</span>
                <div>
                  <div className="flex text-amber-500 text-sm">{'★★★★★'}</div>
                  <span className="text-xs text-gray-500 font-mono">Based on {product.reviewCount} surgeon reviews</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="p-5 rounded-2xl bg-[#f8fbfe] border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#195aa7]">Dr. Raymond S. • Chief of Surgery</span>
                  <span className="text-emerald-600 font-bold">Verified Buyer</span>
                </div>
                <div className="flex text-amber-500 text-xs">{'★★★★★'}</div>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  "Superb weight and balance. The spring tension is consistent and the box-lock operates with zero wobble. Excellent online ordering experience with prompt DHL delivery."
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8fbfe] border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#195aa7]">Dr. Sarah K. • Ambulatory Surgical Center</span>
                  <span className="text-emerald-600 font-bold">Verified Buyer</span>
                </div>
                <div className="flex text-amber-500 text-xs">{'★★★★★'}</div>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  "We purchased 12 units for our outpatient clinic. Tested through 40+ autoclave cycles at 134°C with zero staining. Will certainly order again."
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Related Surgical Tools */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-[#195aa7] tracking-tight">
            Frequently Bought Together
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigateToProduct(rel.id)}
                className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#1ab8ec] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square rounded-2xl bg-[#f8fbfe] p-4 flex items-center justify-center mb-4">
                    <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#eb5d0b]">{rel.code}</span>
                  <h4 className="text-sm font-bold text-[#195aa7] group-hover:text-[#eb5d0b] line-clamp-1 mt-1">
                    {rel.name}
                  </h4>
                </div>

                <div className="flex items-baseline justify-between pt-4 mt-4 border-t border-gray-100 font-mono">
                  <span className="text-base font-black text-[#195aa7]">${rel.price.toFixed(2)}</span>
                  <span className="text-xs text-[#eb5d0b] font-bold">View Specs →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
