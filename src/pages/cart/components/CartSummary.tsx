import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  subtotal: number;
  shippingFee: number;
  finalTotal: number;
  coupon: string;
  onCouponChange: (val: string) => void;
  onApplyCoupon: () => void;
  onCheckout: () => void;
  formatMoney: (val: number) => string;
}

export const CartSummary: React.FC<Props> = ({ subtotal, shippingFee, finalTotal, coupon, onCouponChange, onApplyCoupon, onCheckout, formatMoney }) => {
  return (
    <div className="sticky top-8 bg-white border border-[#E7E5E4] rounded-lg p-6 flex flex-col font-sans">
      <h2 className="text-xl font-serif text-gray-900 mb-6 pb-4 border-b border-[#E7E5E4]">Order Summary</h2>

      <div className="space-y-4 text-sm mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Standard Shipping</span>
          <span className="font-medium text-gray-900">{formatMoney(shippingFee)}</span>
        </div>
        
        {/* Coupon Input */}
        <div className="pt-2">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Gift card or discount code" 
              value={coupon}
              onChange={(e) => onCouponChange(e.target.value)}
              className="w-full border border-[#D6D3D1] rounded-[4px] px-3 py-2 text-sm focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] bg-[#FFFBF5]"
              aria-label="Coupon code"
            />
            <button 
              onClick={onApplyCoupon}
              className="px-4 py-2 border border-[#E7E5E4] rounded-[4px] text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Total Section */}
      <div className="border-t border-dashed border-[#D6D3D1] pt-4 mb-8">
        <div className="flex justify-between items-baseline">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-serif text-gray-900">{formatMoney(finalTotal)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">Including taxes</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={onCheckout}
          className="w-full py-3.5 bg-[#C2410C] hover:bg-[#9A3412] active:bg-[#7C2D12] text-white rounded-[4px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
        >
          Proceed to Checkout
        </button>
        <Link 
          to="/marketplace" 
          className="w-full flex items-center justify-center py-3.5 border border-[#D6D3D1] text-gray-700 hover:border-gray-400 hover:bg-white bg-[#FFFBF5] rounded-[4px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400/20"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Trust Block */}
      <div className="mt-8 space-y-3 pt-6 border-t border-[#E7E5E4]">
        <div className="flex items-start gap-3">
          <span className="text-[#365314] text-lg leading-none mt-0.5">⚲</span>
          <p className="text-xs text-gray-600 leading-relaxed">Directly supports independent makers & local communities.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-[#365314] text-lg leading-none mt-0.5">☻</span>
          <p className="text-xs text-gray-600 leading-relaxed">Secure, encrypted checkout. Transparent shipping origins.</p>
        </div>
      </div>
    </div>
  );
};
