import React, { useState } from 'react';
import { ShoppingBag, FileText, Eye, Check, Star, ShieldCheck, Sparkles, Box, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onOpenRFQ: (product: Product) => void;
  onOpenDataSheet: (product: Product) => void;
  onNavigateToDetail: (productId: string) => void;
  onOpen3DStudio: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onOpenRFQ,
  onOpenDataSheet,
  onNavigateToDetail,
  onOpen3DStudio
}) => {
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const currentFinish = selectedFinish || product.finish;

  const handleAdd = () => {
    onAddToCart(product, currentFinish, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2838]/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white text-[#0B2838] rounded-2xl shadow-2xl border border-[#B3E5FC] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-xl bg-[#F4FAFD] hover:bg-[#E1F5FE] text-[#62879F] hover:text-[#0B2838] border border-[#B3E5FC] flex items-center justify-center transition-colors font-mono text-xs"
        >
          ✕
        </button>

        {/* Left: Product Images & 3D button */}
        <div className="w-full md:w-1/2 p-6 bg-[#F8FCFE] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#B3E5FC]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold text-[#01579B] bg-[#E1F5FE] border border-[#81D4FA] px-2.5 py-0.5 rounded-lg">
                {product.code}
              </span>
              <span className="text-[10px] text-[#62879F] font-mono">
                {product.folderPath}
              </span>
            </div>

            <div className="relative aspect-square w-full rounded-2xl bg-white border border-[#B3E5FC] overflow-hidden flex items-center justify-center p-4">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {/* 3D Showcase Quick Badge */}
              {product.has3DModel && (
                <button
                  onClick={() => {
                    onClose();
                    onOpen3DStudio(product);
                  }}
                  className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-[#0288D1]/95 border border-[#81D4FA] text-white hover:bg-[#0277BD] text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B3E5FC]" />
                  3D CAD Inspection
                </button>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-14 h-14 rounded-xl border bg-white p-1 overflow-hidden transition-all ${
                      activeImageIdx === i ? 'border-[#0288D1] ring-2 ring-[#0288D1]/30' : 'border-[#B3E5FC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#B3E5FC]/60 mt-4 flex items-center justify-between text-[10px] text-[#355C75] font-mono">
            <span className="flex items-center gap-1 text-[#01579B]">
              <ShieldCheck className="w-4 h-4 text-[#0288D1]" /> Sialkot Certified
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenDataSheet(product);
              }}
              className="text-[#355C75] hover:text-[#0288D1] flex items-center gap-1 font-mono transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> Spec Sheet PDF
            </button>
          </div>
        </div>

        {/* Right: Specifications & Purchasing Options */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4 bg-white">
          <div className="space-y-3">
            <div>
              <div className="text-[9px] font-mono font-bold text-[#62879F] uppercase tracking-widest">
                {product.category} • {product.subCategory}
              </div>
              <h3 className="text-lg font-bold text-[#0B2838] mt-0.5 leading-snug font-sans">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-500 text-xs">
                  {'★'.repeat(Math.floor(product.rating))}
                </div>
                <span className="text-xs font-mono font-bold text-[#0B2838]">{product.rating}</span>
                <span className="text-xs text-[#62879F] font-mono">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price section with wholesale tiers */}
            <div className="p-3.5 rounded-xl bg-[#F8FCFE] border border-[#B3E5FC] space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-[#62879F] font-mono uppercase">Retail Direct:</span>
                  <div className="text-2xl font-black text-[#0B2838] font-mono">${product.price.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
                    In Stock ({product.leadTimeDays}d dispatch)
                  </span>
                </div>
              </div>

              {/* B2B Wholesale Volume Pricing table */}
              <div className="pt-2 border-t border-[#B3E5FC]/60">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#62879F] mb-1">Wholesale Tiers:</div>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
                  {product.wholesalePriceTiers.map((tier, idx) => (
                    <div key={idx} className="p-1.5 rounded-lg bg-white border border-[#B3E5FC]">
                      <div className="text-[#62879F]">{tier.minQty}+ pcs</div>
                      <div className="font-bold text-[#0288D1]">${tier.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Finish selection */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#355C75] mb-1.5 uppercase tracking-wider text-[10px]">
                Finish Metallurgy: <span className="text-[#0288D1]">{currentFinish}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableFinishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                      currentFinish === f
                        ? 'bg-[#0288D1] text-white border-[#0288D1] font-bold shadow-xs'
                        : 'bg-white text-[#355C75] border-[#B3E5FC] hover:border-[#0288D1]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs bullets */}
            <div className="space-y-1 text-xs text-[#355C75] bg-[#F8FCFE] p-3 rounded-xl border border-[#B3E5FC] font-mono text-[11px]">
              <div><strong className="text-[#0B2838]">Material:</strong> {product.material}</div>
              <div><strong className="text-[#0B2838]">Hardness:</strong> {product.hardness}</div>
              <div><strong className="text-[#0B2838]">Size:</strong> {product.size}</div>
              <div><strong className="text-[#0B2838]">Tip / Jaw:</strong> {product.tipType}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-[#B3E5FC] space-y-2 font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-[#B3E5FC] rounded-xl bg-[#F8FCFE]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[#355C75] hover:text-[#0B2838] font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 font-mono font-bold text-xs text-[#0B2838]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[#355C75] hover:text-[#0B2838] font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-2.5 bg-[#0288D1] hover:bg-[#0277BD] text-white rounded-xl font-bold text-xs shadow-md shadow-[#0288D1]/25 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#B3E5FC]" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#B3E5FC]" /> Add to Cart (${(product.price * quantity).toFixed(2)})
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenRFQ(product);
                }}
                className="w-full py-2 bg-white hover:bg-[#F0F9FF] text-[#0B2838] rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#B3E5FC]"
              >
                <Box className="w-3.5 h-3.5 text-[#0288D1]" />
                Request B2B Quote
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToDetail(product.id);
                }}
                className="w-full py-2 border border-[#B3E5FC] hover:border-[#0288D1] text-[#355C75] hover:text-[#0288D1] rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
              >
                Full Spec Page <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
