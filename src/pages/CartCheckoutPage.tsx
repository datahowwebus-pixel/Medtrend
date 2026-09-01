import React, { useState } from 'react';
import { 
  ShoppingBag, Trash2, ArrowLeft, ShieldCheck, CheckCircle2, 
  CreditCard, Truck, Lock, ArrowRight, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartCheckoutPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigateToProducts: () => void;
  onNavigateToTracking: (trackingCode: string) => void;
}

export const CartCheckoutPage: React.FC<CartCheckoutPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToProducts,
  onNavigateToTracking
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [shippingMethod, setShippingMethod] = useState<'dhl_express' | 'fedex_priority'>('dhl_express');
  
  // Checkout Form State
  const [fullName, setFullName] = useState('Dr. Marcus Vance');
  const [hospitalClinic, setHospitalClinic] = useState('Metro Surgical Clinic LLC');
  const [email, setEmail] = useState('m.vance@metrosurgical.com');
  const [address, setAddress] = useState('450 Lexington Ave, Suite 1200');
  const [city, setCity] = useState('New York');
  const [country, setCountry] = useState('United States');
  const [orderTrackingCode, setOrderTrackingCode] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = cartItems.length === 0 ? 0 : shippingMethod === 'dhl_express' ? 35.0 : 45.0;
  const tax = subtotal * 0.05; // 5%
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = 'MT-EXP-' + Math.floor(100000 + Math.random() * 900000);
    setOrderTrackingCode(generatedCode);
    setStep('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 text-[#0B2838] bg-[#F8FCFE] font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#B3E5FC] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2838] tracking-tight font-sans">
            {step === 'cart' ? 'Shopping Cart' : step === 'checkout' ? 'Secure Clinical Checkout' : 'Order Confirmed'}
          </h1>
          <p className="text-xs text-[#355C75] mt-0.5 font-sans">
            Direct online store with DHL/FedEx worldwide tracked dispatch from Sialkot factory
          </p>
        </div>

        {step !== 'cart' && step !== 'success' && (
          <button
            onClick={() => setStep('cart')}
            className="text-xs font-bold text-[#0288D1] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>
        )}
      </div>

      {step === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#B3E5FC] space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center mx-auto border border-[#81D4FA]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#0B2838] font-sans">Your Cart is Currently Empty</h3>
                <p className="text-xs text-[#355C75] max-w-sm mx-auto font-sans">
                  Browse our catalog of German-forged surgical instruments and add items to your clinical order.
                </p>
                <button
                  onClick={onNavigateToProducts}
                  className="px-6 py-2.5 bg-[#0288D1] hover:bg-[#0277BD] text-white rounded-xl text-xs font-bold transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
                >
                  Browse Surgical Instruments
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#B3E5FC] overflow-hidden divide-y divide-[#B3E5FC]/60 shadow-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-contain bg-[#F4FAFD] rounded-xl border border-[#B3E5FC] p-2 shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] font-bold text-[#01579B] bg-[#E1F5FE] px-2 py-0.5 rounded border border-[#81D4FA]">
                          {item.product.code}
                        </span>
                        <h4 className="text-sm font-bold text-[#0B2838] font-sans">{item.product.name}</h4>
                        <div className="text-xs text-[#355C75]">
                          Finish: <strong className="text-[#0B2838]">{item.selectedFinish}</strong> • Size: {item.product.size}
                        </div>
                        {item.customEngraving && (
                          <div className="text-[11px] font-mono text-[#01579B] bg-[#E1F5FE] px-2 py-0.5 rounded border border-[#81D4FA] inline-block">
                            Laser: "{item.customEngraving}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity counter */}
                      <div className="flex items-center border border-[#B3E5FC] bg-[#F4FAFD] rounded-xl overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1.5 text-[#355C75] hover:text-[#0B2838] font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 py-1.5 font-mono text-xs font-bold text-[#0B2838]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-[#355C75] hover:text-[#0B2838] font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black text-[#0B2838]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-[#62879F]">
                          (${item.product.price.toFixed(2)} ea)
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-[#62879F] hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-5 font-mono shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#01579B]">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-[#355C75]">
                <div className="flex justify-between">
                  <span>Instruments Subtotal:</span>
                  <span className="font-mono text-[#0B2838] font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. International Shipping (DHL):</span>
                  <span className="font-mono text-[#0B2838] font-bold">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling & Passivation Cert:</span>
                  <span className="font-mono text-[#0288D1] font-bold">Free ($0.00)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (5%):</span>
                  <span className="font-mono text-[#0B2838] font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-[#B3E5FC] pt-3 text-sm font-bold text-[#0B2838]">
                  <span>Estimated Total:</span>
                  <span className="text-[#0288D1] font-mono text-base font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-[#0288D1] hover:bg-[#0277BD] text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#B3E5FC]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#62879F] pt-2">
                <Lock className="w-3.5 h-3.5 text-[#0288D1]" />
                <span>256-Bit SSL Encrypted Healthcare Checkout</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Checkout Step */}
      {step === 'checkout' && (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0B2838] border-b border-[#B3E5FC] pb-3 font-sans">
              Delivery & Clinical Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#355C75] mb-1">Doctor / Recipient Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#355C75] mb-1">Hospital / Clinic Entity</label>
                <input
                  type="text"
                  value={hospitalClinic}
                  onChange={(e) => setHospitalClinic(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-[#355C75] mb-1">Email Address (For Order Tracking) *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-[#355C75] mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#355C75] mb-1">City / Region *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#355C75] mb-1">Country / Destination *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F4FAFD] focus:bg-white text-[#0B2838] focus:border-[#0288D1] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#B3E5FC]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2838]">
                Courier Express Shipping Method
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setShippingMethod('dhl_express')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'dhl_express' 
                      ? 'border-[#0288D1] bg-[#E1F5FE]' 
                      : 'border-[#B3E5FC] bg-white'
                  }`}
                >
                  <div className="text-xs">
                    <div className="font-bold text-[#0B2838]">DHL Express Worldwide</div>
                    <div className="text-[#355C75] text-[11px]">3-5 Business Days • Fully Tracked</div>
                  </div>
                  <span className="font-bold font-mono text-xs text-[#0288D1]">$35.00</span>
                </label>

                <label
                  onClick={() => setShippingMethod('fedex_priority')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'fedex_priority' 
                      ? 'border-[#0288D1] bg-[#E1F5FE]' 
                      : 'border-[#B3E5FC] bg-white'
                  }`}
                >
                  <div className="text-xs">
                    <div className="font-bold text-[#0B2838]">FedEx International Priority</div>
                    <div className="text-[#355C75] text-[11px]">2-4 Business Days • Priority Clearance</div>
                  </div>
                  <span className="font-bold font-mono text-xs text-[#0288D1]">$45.00</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-white text-[#0B2838] border border-[#B3E5FC] space-y-5 font-mono shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#01579B]">
              Payment & Dispatch
            </h3>

            <div className="space-y-2 text-xs text-[#355C75]">
              <div className="flex justify-between">
                <span>Instruments Subtotal:</span>
                <span className="text-[#0B2838] font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping ({shippingMethod === 'dhl_express' ? 'DHL' : 'FedEx'}):</span>
                <span className="text-[#0B2838] font-bold">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="text-[#0B2838] font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-[#B3E5FC] pt-2 font-bold text-[#0B2838] text-base">
                <span>Grand Total:</span>
                <span className="text-[#0288D1] font-black">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] text-[11px] text-[#355C75] space-y-1">
              <p>• Commercial Invoice and Passivation certificate included in box</p>
              <p>• Fast dispatch from Sialkot factory to destination airport</p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
            >
              <Lock className="w-4 h-4 text-[#B3E5FC]" />
              <span>Complete Clinical Order (${total.toFixed(2)})</span>
            </button>
          </div>
        </form>
      )}

      {/* Success Confirmation Step */}
      {step === 'success' && (
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#B3E5FC] text-center max-w-2xl mx-auto space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center mx-auto border border-[#81D4FA]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 font-mono">
            <h2 className="text-2xl font-extrabold text-[#0B2838] font-sans">Thank You, {fullName}!</h2>
            <p className="text-xs text-[#355C75] font-sans">
              Your surgical order has been submitted to MEDTREND® dispatch logistics. A commercial confirmation has been dispatched to <strong className="text-[#0B2838]">{email}</strong>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-2 text-left font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#355C75]">Official Tracking Number:</span>
              <span className="font-mono font-bold text-[#0288D1] text-sm">{orderTrackingCode}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#355C75]">Courier Partner:</span>
              <span className="font-semibold text-[#0B2838]">
                {shippingMethod === 'dhl_express' ? 'DHL Express Worldwide' : 'FedEx Priority'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#355C75]">Destination:</span>
              <span className="text-[#0B2838]">{city}, {country}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToTracking(orderTrackingCode)}
              className="px-6 py-2.5 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs rounded-xl transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
            >
              Track This Order Live →
            </button>
            <button
              onClick={onNavigateToProducts}
              className="px-5 py-2.5 bg-white hover:bg-[#F0F9FF] border border-[#B3E5FC] text-[#0B2838] font-semibold text-xs rounded-xl transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
