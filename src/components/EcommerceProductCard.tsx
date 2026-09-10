import React from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { EcommerceProductItem } from '../data/ecommerceCatalogData';
import { Product } from '../types';

interface EcommerceProductCardProps {
  product: EcommerceProductItem;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onOpenQuickView: (product: Product) => void;
  onNavigate: (tab: string, productId?: string) => void;
}

export const EcommerceProductCard: React.FC<EcommerceProductCardProps> = ({
  product,
  onAddToCart,
  onOpenQuickView,
  onNavigate
}) => {
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.availableFinishes[0] || 'Satin Matte', 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200/90 hover:border-[#1ab8ec] hover:shadow-xl transition-all duration-300 p-3 sm:p-4 rounded-md flex flex-col justify-between group relative select-none">
      
      {/* Top Image Stage with Inset Badges */}
      <div className="relative">
        
        {/* Discount Circle Badge (-45%) */}
        <div 
          className="absolute top-1.5 left-1.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#3fa844] text-white font-black text-[11px] sm:text-xs flex items-center justify-center shadow-sm tracking-tight"
          title={`${product.discountPercent}% Instant E-Commerce Discount`}
        >
          -{product.discountPercent}%
        </div>

        {/* Circular Inset Detail / Tip Closeup (Exact replica of screenshot's circular detail inset) */}
        {product.secondaryThumb && (
          <div 
            className="absolute top-1.5 left-10 sm:left-12 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-slate-300 bg-white p-0.5 overflow-hidden shadow-xs hidden xs:flex items-center justify-center group-hover:scale-110 transition-transform"
            title="Tip / Profile Detail Inset"
          >
            <img 
              src={product.secondaryThumb} 
              alt="Tip detail" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}

        {/* Quick View Eye Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView(product);
          }}
          className="absolute top-1.5 right-1.5 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-[#195aa7] text-slate-700 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xs"
          title="Quick Specs & Zoom"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Central Clean Image Container */}
        <div 
          onClick={() => onNavigate('product-detail', product.id)}
          className="relative aspect-square w-full bg-white flex items-center justify-center p-3 sm:p-4 overflow-hidden cursor-pointer"
        >
          {/* Watermark effect similar to surgical mart screenshot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06]">
            <span className="font-mono font-black text-slate-900 tracking-widest text-lg uppercase">
              MEDTREND
            </span>
          </div>

          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain max-h-[170px] sm:max-h-[190px] group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/surgical1.jpg';
            }}
          />

          {/* Pack Size Round Badge (e.g. 12 PCS, 4 PCS, 20 PCS, 1 PC) */}
          {product.packSize && (
            <div 
              className="absolute bottom-1.5 right-1.5 z-10 px-2 py-0.5 min-w-[32px] sm:min-w-[36px] h-6 sm:h-7 rounded-full bg-[#1ab8ec] text-white font-mono font-bold text-[10px] sm:text-xs flex items-center justify-center gap-0.5 leading-none shadow-xs"
              title={`Package quantity: ${product.packSize}`}
            >
              <span>{product.packSize}</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Information & Pricing */}
      <div className="pt-2.5 text-center flex flex-col flex-1 justify-between">
        <div>
          {/* Subcategory / Type */}
          <p className="text-[11px] sm:text-xs font-mono font-semibold uppercase text-slate-500 tracking-wider truncate mb-1">
            {product.subCategory}
          </p>

          {/* Title */}
          <h4 
            onClick={() => onNavigate('product-detail', product.id)}
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#eb5d0b] transition-colors line-clamp-2 leading-snug cursor-pointer min-h-[36px]"
            title={product.name}
          >
            {product.name}
          </h4>
        </div>

        {/* Pricing & Add To Cart Button */}
        <div className="pt-2.5">
          {/* Price Line (Strikethrough Original + Green Sale Price) */}
          <div className="flex items-baseline justify-center gap-2 font-mono">
            <span className="text-xs sm:text-sm text-red-500/80 line-through font-medium">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-700">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* ADD TO CART Action Button */}
          <button
            onClick={handleAdd}
            className={`mt-2.5 w-full py-2 sm:py-2.5 px-3 border-2 font-mono font-bold text-xs sm:text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 rounded-sm active:scale-95 shadow-2xs ${
              justAdded
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-slate-800 hover:border-[#eb5d0b] hover:bg-[#eb5d0b] text-slate-800 hover:text-white bg-white group-hover:border-[#195aa7]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>ADDED TO CART!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
