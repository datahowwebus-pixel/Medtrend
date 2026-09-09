import React, { useState } from 'react';
import { 
  ShoppingBag, Trash2, ArrowLeft, ShieldCheck, CheckCircle2, 
  CreditCard, Truck, Lock, ArrowRight, Sparkles, Tag, Check, AlertCircle, Copy
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
  
  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Checkout Form State
  const [fullName, setFullName] = useState('Dr. Marcus Vance');
  const [hospitalClinic, setHospitalClinic] = useState('Metro Surgical Clinic LLC');
  const [email, setEmail] = useState('m.vance@metrosurgical.com');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [address, setAddress] = useState('450 Lexington Ave, Suite 1200');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10017');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'wire'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [orderTrackingCode, setOrderTrackingCode] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const isFreeShipping = subtotal >= 150;
  const shippingCost = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : (shippingMethod === 'dhl_express' ? 18.0 : 25.0);
  const estimatedTax = (subtotal - discountAmount) * 0.05; // 5%
  const total = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SURGEON15' || code === 'MEDTREND15') {
      setDiscountPercent(0.15);
      setPromoMessage('Success! 15% Surgeon VIP discount applied.');
    } else if (code === 'FREESHIP') {
      setDiscountPercent(0.1);
      setPromoMessage('10% discount coupon applied.');
    } else {
      setPromoMessage('Invalid promo code. Try "SURGEON15" for 15% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = 'MT-EXP-' + Math.floor(100000 + Math.random() * 900000);
    setOrderTrackingCode(generatedCode);
    setStep('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClearCart();
  };

  return (
    <div className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-10 space-y-10 pb-28 text-[#195aa7] bg-[#f8fbfe]">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-gray-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#195aa7] tracking-tight">
            {step === 'cart' ? 'Your Shopping Cart' : step === 'checkout' ? 'Clinical Direct Checkout' : 'Order Successfully Placed'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-mono">
            Direct factory dispatch from Sialkot manufacturing forge with tracked DHL / FedEx express delivery
          </p>
        </div>

        {step !== 'cart' && step !== 'success' && (
          <button
            onClick={() => setStep('cart')}
            className="text-xs font-mono font-bold text-[#195aa7] hover:text-[#eb5d0b] flex items-center gap-1.5 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>
        )}
      </div>

      {step === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.length === 0 ? (
              <div className="p-16 text-center bg-white rounded-3xl border border-gray-200 space-y-5 shadow-sm">
                <div className="w-20 h-20 rounded-3xl bg-[#f4f8fc] text-[#195aa7] flex items-center justify-center mx-auto border-2 border-[#195aa7]/20">
                  <ShoppingBag className="w-10 h-10 opacity-50" />
                </div>
                <h3 className="text-2xl font-black text-[#195aa7]">Your Shopping Cart is Empty</h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                  Browse our catalog of precision German-forged surgical instruments and add instruments to your clinical order.
                </p>
                <button
                  onClick={onNavigateToProducts}
                  className="px-8 py-3.5 bg-[#eb5d0b] hover:bg-[#d65106] text-white rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#eb5d0b]/30"
                >
                  Shop Surgical Instruments
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden divide-y divide-gray-100 shadow-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-contain bg-[#f8fbfe] rounded-2xl border border-gray-200 p-2 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/surgical1.jpg';
                        }}
                      />
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-black text-[#195aa7] bg-[#f4f8fc] px-2.5 py-0.5 rounded-lg border border-gray-200">
                          {item.product.code}
                        </span>
                        <h4 className="text-base font-bold text-[#195aa7] font-sans">{item.product.name}</h4>
                        <div className="text-xs text-gray-500 font-mono">
                          Finish: <strong className="text-[#195aa7]">{item.selectedFinish}</strong> • Size: {item.product.size}
                        </div>
                        {item.customEngraving && (
                          <div className="text-xs font-mono text-[#eb5d0b] bg-[#eb5d0b]/10 px-2.5 py-0.5 rounded-md inline-block">
                            Engraving: "{item.customEngraving}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden font-mono text-xs bg-[#f8fbfe]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-500 hover:bg-gray-200 font-bold"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-bold text-[#195aa7]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-500 hover:bg-gray-200 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right font-mono min-w-[90px]">
                        <div className="text-base font-black text-[#195aa7]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          ${item.product.price.toFixed(2)} each
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                        title="Remove Instrument"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo code box */}
            <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-3 font-mono">
              <label className="text-xs font-bold uppercase tracking-wider text-[#195aa7] flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#eb5d0b]" /> Have a Coupon or VIP Code?
              </label>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. SURGEON15"
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-[#f8fbfe] focus:bg-white text-[#195aa7] uppercase focus:outline-none focus:border-[#195aa7]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#195aa7] hover:bg-[#12437e] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-xs font-bold ${discountPercent > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {promoMessage}
                </p>
              )}
            </div>

            {/* Summary breakdown */}
            <div className="p-7 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-5 font-mono">
              <h3 className="text-base font-black text-[#195aa7] border-b border-gray-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#195aa7]">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Surgeon VIP Discount ({(discountPercent * 100)}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Worldwide Tracked Air Express:</span>
                  <span className="font-bold">
                    {isFreeShipping ? (
                      <span className="text-emerald-600 font-black">FREE (Orders $150+)</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Clinical Duty & Tax (5%):</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-lg font-black text-[#195aa7] pt-4 border-t border-gray-200">
                  <span>Estimated Total:</span>
                  <span className="text-[#eb5d0b]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={() => setStep('checkout')}
                className="w-full py-4 rounded-2xl bg-[#eb5d0b] hover:bg-[#d65106] disabled:bg-gray-300 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#eb5d0b]/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-gray-400 text-center space-y-1 pt-2 border-t border-gray-100">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1ab8ec]" /> 256-Bit SSL Encrypted Clinical Store
                </p>
                <p>30-Day Money Back Guarantee • ISO 13485</p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Step 2: Checkout Form */}
      {step === 'checkout' && (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start font-mono">
          
          {/* Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Delivery Details Card */}
            <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="text-base font-black text-[#195aa7] border-b border-gray-100 pb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#eb5d0b]" />
                <span>1. Shipping & Clinic Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-gray-700 font-bold">Doctor / Recipient Full Name:</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-[#f8fbfe] focus:bg-white text-[#195aa7] focus:outline-none focus:border-[#195aa7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 font-bold">Hospital / Clinic / Practice:</label>
                  <input
                    type="text"
                    required
                    value={hospitalClinic}
                    onChange={(e) => setHospitalClinic(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-[#f8fbfe] focus:bg-white text-[#195aa7] focus:outline-none focus:border-[#195aa7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 font-bold">Email for Dispatch & Tracking:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-[#f8fbfe] focus:bg-white text-[#195aa7] focus:outline-none focus:border-[#195aa7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 font-bold">Phone Number for Airway Bill:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-[#f8fbfe] focus:bg-white text-[#195aa7] focus:outline-none focus:border-[#195aa7]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-gray-700 font-bold">Street Address / Suite:</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-[#f8fbfe] focus:bg-white text-[#195aa7] focus:outline-none focus:border-[#195aa7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 font-bold">City:</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-[#f8fbfe] focus:bg-white text-[#195aa7] focus:outline-none focus:border-[#195aa7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 font-bold">Country:</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-[#f8fbfe] focus:bg-white text-[#195aa7] focus:outline-none focus:border-[#195aa7]"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Pakistan">Pakistan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="text-base font-black text-[#195aa7] border-b border-gray-100 pb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#eb5d0b]" />
                <span>2. Payment Method</span>
              </h3>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 transition-all text-center ${
                    paymentMethod === 'card'
                      ? 'border-[#195aa7] bg-[#f8fbfe] text-[#195aa7] font-bold'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#195aa7]" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-2xl border-2 transition-all text-center ${
                    paymentMethod === 'paypal'
                      ? 'border-[#195aa7] bg-[#f8fbfe] text-[#195aa7] font-bold'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <span className="font-black text-[#195aa7] block text-base leading-none mb-1">Pay</span>
                  <span>PayPal Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-4 rounded-2xl border-2 transition-all text-center ${
                    paymentMethod === 'wire'
                      ? 'border-[#195aa7] bg-[#f8fbfe] text-[#195aa7] font-bold'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <span className="font-bold text-[#eb5d0b] block mb-1">IBAN</span>
                  <span>Direct Bank Wire</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-[#f8fbfe] border border-gray-200 space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Card Number:</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-300 bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-gray-700 font-bold">Expires:</label>
                      <input
                        type="text"
                        defaultValue="08/29"
                        className="w-full p-3 rounded-xl border border-gray-300 bg-white font-mono text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-700 font-bold">CVC / CVV:</label>
                      <input
                        type="text"
                        defaultValue="842"
                        className="w-full p-3 rounded-xl border border-gray-300 bg-white font-mono text-center"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column Checkout Review */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-7 bg-white rounded-3xl border-2 border-[#195aa7] shadow-lg space-y-5 text-xs">
              <h3 className="text-base font-black text-[#195aa7] border-b border-gray-100 pb-3">
                Review Order & Pay
              </h3>

              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Items Count:</span>
                  <span className="font-bold text-[#195aa7]">{cartItems.reduce((a, b) => a + b.quantity, 0)} instruments</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>VIP Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (DHL):</span>
                  <span>{isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#195aa7] pt-3 border-t border-gray-200">
                  <span>Total Amount:</span>
                  <span className="text-[#eb5d0b] text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#eb5d0b]/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize & Place Order</span>
              </button>
            </div>
          </div>

        </form>
      )}

      {/* Step 3: Success Confirmation Screen */}
      {step === 'success' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 sm:p-12 border-2 border-[#1ab8ec] shadow-2xl text-center space-y-6 font-mono">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#195aa7] font-sans">
              Thank You! Your Order Has Been Placed
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-md mx-auto">
              We have received your clinical order. Instruments are undergoing final quality passivation inspection in our Sialkot cleanroom before express dispatch.
            </p>
          </div>

          {/* Tracking Box */}
          <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-gray-200 space-y-3">
            <span className="text-xs text-gray-500">Your DHL Express Tracking ID:</span>
            <div className="text-2xl font-black text-[#eb5d0b] tracking-widest font-mono">
              {orderTrackingCode}
            </div>
            <p className="text-[11px] text-gray-400">
              A confirmation email has been dispatched to <strong>{email}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigateToTracking(orderTrackingCode)}
              className="px-6 py-3 rounded-xl bg-[#195aa7] hover:bg-[#12437e] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Track Order Live
            </button>

            <button
              onClick={onNavigateToProducts}
              className="px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-[#195aa7] border border-gray-200 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
