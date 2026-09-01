import React, { useState } from 'react';
import { 
  ShoppingBag, FileText, Sparkles, ShieldCheck, CheckCircle2, 
  RotateCw, ArrowLeft, Heart, Share2, Layers, Check, Box, ChevronRight, Download, Eye
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/productsData';
import { Interactive3DViewer } from '../components/Interactive3DViewer';

interface ProductDetailPageProps {
  productId: string;
  onNavigateBack: () => void;
  onNavigateToProduct: (productId: string) => void;
  onAddToCart: (product: Product, finish: string, quantity: number, customEngraving?: string) => void;
  onOpenRFQ: (product: Product) => void;
  onOpenDataSheet: (product: Product) => void;
  onOpen3DStudio: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigateBack,
  onNavigateToProduct,
  onAddToCart,
  onOpenRFQ,
  onOpenDataSheet,
  onOpen3DStudio
}) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  
  const [selectedFinish, setSelectedFinish] = useState<string>(product.finish);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [activeViewMode, setActiveViewMode] = useState<'photos' | '3d-turntable'>('photos');
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart(product, selectedFinish, quantity, customEngraving);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 text-[#0B2838] bg-white">
      {/* Back Button & Category Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#355C75]">
        <button
          onClick={onNavigateBack}
          className="inline-flex items-center gap-1.5 font-bold text-[#0B2838] hover:text-[#0288D1] transition-colors bg-white px-3.5 py-2 rounded-xl border border-[#B3E5FC] shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#0288D1]" /> Back to Catalog
        </button>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-[#62879F]">Our Products</span>
          <span className="text-[#B3E5FC]">/</span>
          <span className="text-[#355C75]">{product.category}</span>
          <span className="text-[#B3E5FC]">/</span>
          <span className="text-[#355C75]">{product.subCategory}</span>
          <span className="text-[#B3E5FC]">/</span>
          <span className="text-[#0288D1] font-bold">{product.code}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left 6 Cols: Photo Gallery & 3D Interactive Turntable */}
        <div className="lg:col-span-6 space-y-4">
          {/* Mode Switcher: 2D Photography vs 3D Turntable Simulator */}
          <div className="flex items-center justify-between bg-[#E1F5FE] p-1.5 rounded-2xl border border-[#81D4FA] font-mono shadow-xs">
            <button
              onClick={() => setActiveViewMode('photos')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeViewMode === 'photos'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Standard Photography</span>
            </button>

            <button
              onClick={() => setActiveViewMode('3d-turntable')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeViewMode === '3d-turntable'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Interactive 3D / Video Loop</span>
            </button>
          </div>

          {/* Visual Display */}
          {activeViewMode === 'photos' ? (
            <div className="space-y-3">
              <div className="relative aspect-square w-full rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] overflow-hidden flex items-center justify-center p-8 shadow-sm">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

                <div className="absolute top-4 left-4 flex flex-col gap-1.5 font-mono">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-[#01579B] border border-[#81D4FA]">
                    {product.code}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#E1F5FE] text-[#0288D1] border border-[#B3E5FC]">
                    Autoclavable 134°C
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#62879F] bg-white px-2.5 py-1 rounded-lg border border-[#B3E5FC]">
                  Folder: {product.imageFolder}
                </div>
              </div>

              {/* Multi-angle Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-square rounded-xl bg-[#F4FAFD] border p-2 overflow-hidden transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#0288D1] ring-2 ring-[#0288D1]/30 bg-white'
                        : 'border-[#B3E5FC] opacity-75 hover:opacity-100 hover:bg-white'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                    <span className="block text-[9px] text-[#62879F] font-mono text-center mt-1">
                      Angle 0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Interactive3DViewer
                modelType={product.model3DType || 'forceps'}
                productName={product.name}
                productCode={product.code}
                initialFinish={selectedFinish}
                heightClass="h-96 sm:h-[480px]"
                videoLoopUrl={product.videoLoopUrl || '/images/3d-models/MT-HF-002-loop.mp4'}
              />
              <p className="text-[11px] text-[#355C75] text-center font-mono">
                Supports real 360° studio video loops, mouse scrubbing, CAD wireframes, and live shank laser engraving preview.
              </p>
            </div>
          )}

          {/* Quick Action Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
            <button
              onClick={() => onOpenDataSheet(product)}
              className="py-3 px-4 rounded-xl bg-white hover:bg-[#F0F9FF] border border-[#B3E5FC] text-[#0B2838] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#0288D1]" />
              <span>Download Technical TDS</span>
            </button>

            <button
              onClick={() => onOpen3DStudio(product)}
              className="py-3 px-4 rounded-xl bg-[#E1F5FE] hover:bg-[#B3E5FC] border border-[#81D4FA] text-[#01579B] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#0288D1]" />
              <span>3D CAD Inspection</span>
            </button>
          </div>
        </div>

        {/* Right 6 Cols: Commercial Pricing, Finish Selection & Specifications */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-xs font-bold uppercase tracking-wider text-[#01579B] bg-[#E1F5FE] px-2.5 py-0.5 rounded-lg border border-[#81D4FA]">
                {product.category}
              </span>
              <span className="text-xs text-[#B3E5FC]">•</span>
              <span className="text-xs text-[#355C75] font-medium">{product.subCategory}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2838] tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#355C75] leading-relaxed">
              {product.shortDesc}
            </p>
          </div>

          {/* Dual Pricing Box (Retail Direct vs B2B Wholesale Tiers) */}
          <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-4 shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#B3E5FC]/60 pb-3">
              <div>
                <span className="text-xs font-mono text-[#62879F] font-medium">Direct Retail E-Commerce:</span>
                <div className="text-3xl font-black font-mono text-[#0288D1]">${product.price.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#01579B] bg-[#E1F5FE] border border-[#81D4FA] px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0288D1]" /> In Stock for Fast Dispatch
                </span>
              </div>
            </div>

            {/* Wholesale Tier Pricing Matrix */}
            <div className="font-mono">
              <div className="text-xs font-bold text-[#0B2838] mb-2 flex items-center justify-between">
                <span>B2B Institutional Volume Tiers:</span>
                <span className="text-[11px] text-[#0288D1] font-bold">Direct Sialkot Port CIF/FOB</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {product.wholesalePriceTiers.map((tier, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC]">
                    <div className="text-[11px] text-[#62879F] font-medium">{tier.minQty}+ units</div>
                    <div className="text-xs font-bold text-[#0288D1]">${tier.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Finish & Metallurgy Selector */}
          <div className="space-y-2 font-mono">
            <label className="block text-xs font-bold text-[#355C75] uppercase tracking-wider">
              1. Choose Metallurgy Finish: <span className="text-[#0288D1] font-bold">{selectedFinish}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.availableFinishes.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFinish(f)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left flex items-center gap-2 ${
                    selectedFinish === f
                      ? 'bg-[#E1F5FE] text-[#01579B] border-[#0288D1] font-bold shadow-xs'
                      : 'bg-white text-[#355C75] border-[#B3E5FC] hover:border-[#29B6F6]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#0288D1]" />
                  <span>{f}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Laser Marking Customizer */}
          <div className="p-4 rounded-2xl bg-white border border-[#B3E5FC] space-y-2 font-mono shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0B2838]">
                2. Custom Laser Marking (Free for Clinics & Importers)
              </label>
              <span className="text-[10px] text-[#62879F]">Max 20 chars</span>
            </div>
            <input
              type="text"
              value={customEngraving}
              onChange={(e) => setCustomEngraving(e.target.value)}
              placeholder="e.g. ST. MARY HOSPITAL / OR-ROOM 4"
              maxLength={20}
              className="w-full p-2.5 text-xs rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] font-mono uppercase focus:border-[#0288D1] focus:outline-none"
            />
          </div>

          {/* Quantity & Purchasing CTA Buttons */}
          <div className="space-y-3 pt-2 font-mono">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#B3E5FC] rounded-xl bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-[#355C75] hover:bg-[#F0F9FF] font-bold rounded-l-xl"
                >
                  -
                </button>
                <span className="px-4 py-3 font-mono font-bold text-xs text-[#0B2838]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-[#355C75] hover:bg-[#F0F9FF] font-bold rounded-r-xl"
                >
                  +
                </button>
              </div>

              {/* Add to Cart (B2C) */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-[#B3E5FC]" /> Added to Shopping Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#B3E5FC]" /> Add to Cart (${(product.price * quantity).toFixed(2)})
                  </>
                )}
              </button>
            </div>

            {/* B2B Institutional Quote Button */}
            <button
              onClick={() => onOpenRFQ(product)}
              className="w-full py-3 px-6 rounded-xl bg-white hover:bg-[#F0F9FF] border border-[#B3E5FC] text-[#0B2838] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 uppercase tracking-wider shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#0288D1]" />
              Request B2B Bulk Order Quote (Tier Discounts)
            </button>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="space-y-3 pt-4 border-t border-[#B3E5FC] font-mono">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#355C75]">
              Technical Specifications Table
            </h3>

            <div className="overflow-hidden border border-[#B3E5FC] rounded-2xl bg-white shadow-xs">
              <table className="w-full text-xs">
                <tbody className="divide-y divide-[#B3E5FC]/60">
                  <tr className="bg-[#F4FAFD]">
                    <td className="p-2.5 font-bold text-[#62879F] w-1/3">Standard Code</td>
                    <td className="p-2.5 font-mono text-[#0288D1] font-bold">{product.code}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-[#62879F]">Material Grade</td>
                    <td className="p-2.5 text-[#0B2838]">{product.material}</td>
                  </tr>
                  <tr className="bg-[#F4FAFD]">
                    <td className="p-2.5 font-bold text-[#62879F]">Rockwell Hardness</td>
                    <td className="p-2.5 font-mono text-[#0B2838]">{product.hardness}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-[#62879F]">Total Length</td>
                    <td className="p-2.5 text-[#0B2838]">{product.size}</td>
                  </tr>
                  <tr className="bg-[#F4FAFD]">
                    <td className="p-2.5 font-bold text-[#62879F]">Tip / Jaw Geometry</td>
                    <td className="p-2.5 text-[#0B2838]">{product.tipType}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-[#62879F]">Autoclave Sterility</td>
                    <td className="p-2.5 text-[#355C75]">134°C (273°F) for 1,000+ cycles</td>
                  </tr>
                  <tr className="bg-[#F4FAFD]">
                    <td className="p-2.5 font-bold text-[#62879F]">Manufacturing Origin</td>
                    <td className="p-2.5 text-[#0B2838]">Sialkot, Pakistan (ISO 13485 Space)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#B3E5FC] space-y-6">
          <div className="flex items-center justify-between font-mono">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#0B2838]">
              Related Instruments in {product.category}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigateToProduct(rel.id)}
                className="p-4 rounded-2xl bg-white border border-[#B3E5FC] hover:border-[#0288D1] cursor-pointer transition-all flex items-center gap-4 group shadow-sm hover:shadow-md"
              >
                <img
                  src={rel.images[0]}
                  alt={rel.name}
                  className="w-16 h-16 object-contain bg-[#F4FAFD] rounded-xl border border-[#B3E5FC] p-1 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="font-mono">
                  <span className="text-[10px] font-bold text-[#01579B] bg-[#E1F5FE] px-2 py-0.5 rounded-md border border-[#81D4FA]">
                    {rel.code}
                  </span>
                  <h4 className="text-xs font-bold text-[#0B2838] group-hover:text-[#0288D1] transition-colors line-clamp-1 mt-1 font-sans">
                    {rel.name}
                  </h4>
                  <div className="text-xs font-bold text-[#0288D1] mt-1">${rel.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
