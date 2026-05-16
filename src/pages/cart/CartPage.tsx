import React from 'react';
import { useCartController } from './cart.controller';
import { CartEmptyState } from './components/CartEmptyState';
import { CartItemCard } from './components/CartItemCard';
import { CartSummary } from './components/CartSummary';

const CartPage: React.FC = () => {
  const controller = useCartController();

  if (!controller.isLoading && controller.items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] font-sans pb-24">
      {/* Header Placeholder (nếu layout bọc bên ngoài thì bỏ dòng này) */}
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-serif text-gray-900 mb-3">Your Cart</h1>
          <p className="text-gray-600 text-lg">
            You’re supporting <span className="font-semibold text-gray-900">{controller.totalMakers} independent makers</span> with this order.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Cột Trái: Items */}
          <div className="flex-1 w-full space-y-10">
            {/* Editorial Callout */}
            <div className="bg-[#FEF3C7]/40 border border-[#D4A373]/30 rounded-[20px] p-6 flex items-start gap-4">
              <span className="text-[#C2410C] text-lg leading-none mt-0.5">✧</span>
              <p className="text-sm text-gray-800 leading-relaxed max-w-2xl">
                <strong className="font-medium text-gray-900">Every item in your cart carries a maker’s story.</strong> By checking out today, you are directly funding traditional craft preservation and independent artistry.
              </p>
            </div>

            {/* Item List */}
            <div className="space-y-10">
              {controller.items.map((item, index) => (
                <div key={item.product.id}>
                  <CartItemCard 
                    item={item}
                    makerInfo={controller.mockMakerData[item.product.id]}
                    isLoading={controller.isLoading}
                    onUpdateQuantity={controller.updateQuantity}
                    onRemove={controller.removeItem}
                    formatMoney={controller.formatMoney}
                  />
                  {/* Decorative dashed divider */}
                  {index < controller.items.length - 1 && (
                    <div className="w-full border-t border-dashed border-[#D6D3D1] mt-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cột Phải: Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <CartSummary 
              subtotal={controller.totalPrice}
              shippingFee={controller.shippingFee}
              finalTotal={controller.finalTotal}
              coupon={controller.coupon}
              onCouponChange={controller.setCoupon}
              onApplyCoupon={controller.handleApplyCoupon}
              onCheckout={controller.handleCheckout}
              formatMoney={controller.formatMoney}
            />
          </div>

        </div>
      </main>

      {/* Footer Placeholder (nếu layout bọc ngoài thì bỏ) */}
    </div>
  );
};

export default CartPage;
