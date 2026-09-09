import React, { useState } from 'react';
import { 
  X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, 
  Truck, CheckCircle2, Tag, Lock, CreditCard, Sparkles 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? subtotal * appliedDiscount : 0;
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = subtotal >= freeShippingThreshold || cartItems.length === 0 ? 0 : 15.0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'SURGEON15' || clean === 'MEDTREND15') {
      setAppliedDiscount(0.15); // 15% off
      setPromoError(null);
    } else if (clean === 'FREESHIP') {
      setAppliedDiscount(0.1);
      setPromoError(null);
    } else {
      setPromoError('Invalid coupon code. Try code "SURGEON15" for 15% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in" 
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between border-l-4 border-[#195aa7] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 bg-[#195aa7] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-[#1ab8ec]">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <span>Shopping Cart</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#eb5d0b] text-white font-mono font-bold">
                    {totalItemsCount}
                  </span>
                </h2>
                <p className="text-xs text-[#1ab8ec] font-mono">100% Autoclave Tested • Fast Worldwide Dispatch</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-[#eb5d0b] text-white transition-colors"
              title="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#f4f8fc] px-6 py-3 border-b border-[#195aa7]/15">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#195aa7] font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#eb5d0b]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-bold">✓ Congratulations! You unlocked Free Worldwide Shipping!</span>
                ) : (
                  <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> for FREE Shipping</span>
                )}
              </span>
              <span className="text-[#eb5d0b] font-bold font-mono">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  progressToFreeShipping >= 100 ? 'bg-emerald-500' : 'bg-[#eb5d0b]'
                }`}
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-[#f4f8fc] text-[#195aa7] flex items-center justify-center mx-auto border-2 border-[#195aa7]/20">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-lg font-black text-[#195aa7]">Your Cart is Empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Browse our catalog of precision surgical instruments and add instruments to your clinical order.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#195aa7] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#12437e] transition-all shadow-md"
                >
                  Start Shopping Now
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#1ab8ec] transition-all shadow-xs flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-[#f4f8fc] p-1.5 shrink-0 border border-gray-100 flex items-center justify-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/surgical1.jpg';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black text-[#eb5d0b] uppercase">
                        {item.product.code}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-[#195aa7] truncate">
                      {item.product.name}
                    </h4>

                    <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                      Finish: {item.selectedFinish}
                    </div>

                    {item.customEngraving && (
                      <div className="text-[10px] text-[#1ab8ec] font-mono">
                        Marking: "{item.customEngraving}"
                      </div>
                    )}

                    {/* Quantity modifier and price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-[#f4f8fc]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-gray-600 hover:bg-gray-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-mono font-bold text-[#195aa7]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-gray-600 hover:bg-gray-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black font-mono text-[#195aa7]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#f8fbfe] border-t border-[#195aa7]/15 space-y-4">
              
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. SURGEON15)"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#195aa7] focus:outline-none font-mono uppercase bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#195aa7] hover:bg-[#12437e] text-white text-xs font-mono font-bold uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </div>

                {appliedDiscount && (
                  <p className="text-[11px] text-emerald-600 font-bold font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 15% Surgeon VIP Discount Applied!
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-500 font-mono">
                    {promoError}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono border-t border-gray-200 pt-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount (15%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tracked Air Express Shipping:</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-base font-black text-[#195aa7] pt-2 border-t border-gray-200 font-mono">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="w-full py-4 rounded-2xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-sm uppercase tracking-wider shadow-xl shadow-[#eb5d0b]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <Lock className="w-4 h-4" />
                  <span>Secure Direct Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-[#195aa7] hover:underline font-bold text-center"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Trust Footer */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 pt-2 border-t border-gray-200 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1ab8ec]" /> 256-Bit SSL
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#eb5d0b]" /> 24h Dispatch
                </span>
                <span>•</span>
                <span>30-Day Returns</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
