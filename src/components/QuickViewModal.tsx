import React, { useState } from 'react';
import { ShoppingBag, FileText, Eye, Check, Star, ShieldCheck, Sparkles, Box, ChevronRight, Truck, Lock } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onOpenRFQ?: (product: Product) => void;
  onOpenDataSheet: (product: Product) => void;
  onNavigateToDetail: (productId: string) => void;
  onOpen3DStudio: (product: Product) => void;
  onOpenCart?: () => void;
  onNavigateToCheckout?: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onOpenDataSheet,
  onNavigateToDetail,
  onOpen3DStudio,
  onOpenCart,
  onNavigateToCheckout
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
    setTimeout(() => setAddedAnimation(false), 2000);
    if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleBuyNow = () => {
    onAddToCart(product, currentFinish, quantity);
    onClose();
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white text-[#195aa7] rounded-3xl shadow-2xl border-2 border-[#1ab8ec]/40 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-xl bg-gray-100 hover:bg-[#eb5d0b] text-gray-500 hover:text-white flex items-center justify-center transition-colors font-mono text-xs"
        >
          ✕
        </button>

        {/* Left: Product Image & Badges */}
        <div className="w-full md:w-1/2 p-6 bg-[#f8fbfe] flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200">
          <div>
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="px-3 py-1 rounded-lg bg-[#195aa7] text-white font-black">
                {product.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                In Stock
              </span>
            </div>

            <div className="relative aspect-square bg-white rounded-2xl p-6 flex items-center justify-center border border-gray-200 shadow-inner">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/surgical1.jpg';
                }}
              />

              {product.has3DModel && (
                <button
                  onClick={() => {
                    onClose();
                    onOpen3DStudio(product);
                  }}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#1ab8ec] hover:bg-[#149ec9] text-[#195aa7] font-mono text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  3D Inspection
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
                    className={`w-14 h-14 rounded-xl border-2 bg-white p-1 overflow-hidden transition-all ${
                      activeImageIdx === i ? 'border-[#eb5d0b] ring-2 ring-[#eb5d0b]/30' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200 mt-4 flex items-center justify-between text-xs text-gray-500 font-mono">
            <span className="flex items-center gap-1 text-[#195aa7] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#eb5d0b]" /> Autoclavable 134°C
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenDataSheet(product);
              }}
              className="text-[#195aa7] hover:text-[#eb5d0b] flex items-center gap-1 font-mono transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#1ab8ec]" /> Spec PDF
            </button>
          </div>
        </div>

        {/* Right: Details & Instant E-Commerce Actions */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4 bg-white">
          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#1ab8ec] uppercase tracking-widest">
                {product.category} • {product.subCategory}
              </div>
              <h3 className="text-lg font-black text-[#195aa7] mt-0.5 leading-snug">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-500 text-xs">
                  {'★'.repeat(Math.floor(product.rating))}
                </div>
                <span className="text-xs font-mono font-bold text-[#195aa7]">{product.rating}</span>
                <span className="text-xs text-gray-400 font-mono">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-[#f8fbfe] border border-gray-200 space-y-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black font-mono text-[#195aa7]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 line-through font-mono ml-2">
                    ${Math.round(product.price * 1.25)}.00
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">
                  Save 20% Online
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#eb5d0b]" /> Free worldwide express shipping on orders over $150
              </p>
            </div>

            {/* Finish selection */}
            <div className="space-y-1.5 font-mono">
              <label className="text-xs font-bold text-gray-700">Finish / Metallurgy:</label>
              <div className="flex flex-wrap gap-1.5">
                {product.availableFinishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      currentFinish === f
                        ? 'bg-[#195aa7] text-white border-[#195aa7]'
                        : 'bg-[#f8fbfe] text-gray-700 border-gray-200 hover:border-[#1ab8ec]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs bullets */}
            <div className="space-y-1 text-xs text-gray-600 bg-[#f8fbfe] p-3 rounded-2xl border border-gray-200 font-mono text-[11px]">
              <div><strong className="text-[#195aa7]">Material:</strong> {product.material}</div>
              <div><strong className="text-[#195aa7]">Hardness:</strong> {product.hardness}</div>
              <div><strong className="text-[#195aa7]">Size:</strong> {product.size}</div>
              <div><strong className="text-[#195aa7]">Tip / Jaw:</strong> {product.tipType}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-gray-200 space-y-2 font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded-xl bg-[#f8fbfe]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-black font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 font-mono font-bold text-xs text-[#195aa7]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-black font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 bg-[#eb5d0b] hover:bg-[#d65106] text-white rounded-xl font-bold text-xs shadow-md shadow-[#eb5d0b]/25 transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-white" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-white" /> Add to Cart (${(product.price * quantity).toFixed(2)})
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 bg-[#195aa7] hover:bg-[#12437e] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <Lock className="w-3.5 h-3.5 text-[#1ab8ec]" /> 1-Click Buy Now
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToDetail(product.id);
                }}
                className="w-full py-2.5 bg-white hover:bg-[#f4f8fc] text-[#195aa7] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 border border-gray-200"
              >
                Full Details <ChevronRight className="w-3.5 h-3.5 text-[#eb5d0b]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
