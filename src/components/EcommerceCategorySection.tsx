import React from 'react';
import { ChevronRight } from 'lucide-react';
import { EcommerceCategoryGroup } from '../data/ecommerceCatalogData';
import { EcommerceProductCard } from './EcommerceProductCard';
import { Product } from '../types';

interface EcommerceCategorySectionProps {
  group: EcommerceCategoryGroup;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onOpenQuickView: (product: Product) => void;
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
}

export const EcommerceCategorySection: React.FC<EcommerceCategorySectionProps> = ({
  group,
  onAddToCart,
  onOpenQuickView,
  onNavigate
}) => {
  return (
    <section className="mb-14 sm:mb-20">
      
      {/* Category Section Header (Exact Replica of User's Screenshot) */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 mb-6 sm:mb-8">
        
        {/* Left: Boxed Border Category Title */}
        <div className="border-2 border-slate-700 hover:border-[#195aa7] transition-colors px-4 sm:px-5 py-1.5 sm:py-2 bg-white shadow-xs">
          <h3 className="font-black text-slate-900 tracking-wider text-sm sm:text-base md:text-lg uppercase font-sans">
            {group.title}
          </h3>
        </div>

        {/* Right: "View Full Product list >" Link */}
        <button
          onClick={() => onNavigate('products', undefined, group.categorySlug)}
          className="text-sm sm:text-base text-slate-600 hover:text-[#195aa7] flex items-center gap-1.5 font-bold transition-colors group"
        >
          <span className="group-hover:underline">View Full Product list</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#eb5d0b]" />
        </button>
      </div>

      {/* 4-Columns x 2-Rows (8 Products) E-Commerce Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {group.products.map((item) => (
          <EcommerceProductCard
            key={item.id}
            product={item}
            onAddToCart={onAddToCart}
            onOpenQuickView={onOpenQuickView}
            onNavigate={onNavigate}
          />
        ))}
      </div>

    </section>
  );
};
