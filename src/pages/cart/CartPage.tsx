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
      {/* Header Placeholder */}

      <main className="w-full px-4 sm:px-8 lg:px-12 pt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-serif text-gray-900 mb-3">Giỏ hàng của bạn</h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Items */}
          <div className="flex-1 w-full">
            {/* Item List */}
            <div className="bg-white border border-[#E7E5E4] rounded-xl p-6 sm:p-10 space-y-10 shadow-sm">
              {controller.items.map((item, index) => (
                <div key={item.product.id}>
                  <CartItemCard
                    item={item}
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

          {/* Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <CartSummary
              finalTotal={controller.finalTotal}
              onCheckout={controller.handleCheckout}
              formatMoney={controller.formatMoney}
            />
          </div>

        </div>
      </main>

    </div>
  );
};

export default CartPage;
