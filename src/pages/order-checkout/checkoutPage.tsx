import { useCheckoutController } from './checkout.controller';
import { ShippingDetailForm } from './components/ShippingDetailForm';
import { OrderItemsList } from './components/OrderItemsList';
import { OrderSummary } from './components/OrderSummary';
import { VoucherModal } from './components/VoucherModal';
import { PaymentMethodModal } from './components/PaymentMethodModal';

function CheckoutPage() {
    const {
        data,
        loading,
        error,
        isVoucherModalOpen,
        setIsVoucherModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedVoucher,
        setSelectedVoucher,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveItem,
        handleOrderSubmit
    } = useCheckoutController();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="font-body text-text-muted animate-pulse">Đang tải thông tin đơn hàng...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="font-body text-error font-semibold">{error}</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="font-body text-body min-h-screen flex flex-col">
            <header className="w-full bg-background dark:bg-surface border-b border-subtle dark:border-outline-variant py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="font-display text-2xl md:text-3xl text-primary font-bold tracking-tight">
                        Artisan Market
                    </div>
                    <div className="font-caption text-sm text-text-muted flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lock</span>
                        Thanh toán an toàn
                    </div>
                </div>
            </header>

            <main className="flex-grow py-8 md:py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col gap-8">

                    {/* Component 1: Thông tin giao hàng */}
                    <ShippingDetailForm address={data.address} />

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Component 2: Danh sách sản phẩm giỏ hàng (Left Column) */}
                        <OrderItemsList
                            items={data.items}
                            invalidItems={data.invalidItems}
                            onIncrease={handleIncreaseQuantity}
                            onDecrease={handleDecreaseQuantity}
                            onRemove={handleRemoveItem}
                        />

                        {/* Component 3: Tóm tắt đơn hàng và thanh toán (Right Column) */}
                        <OrderSummary
                            subTotal={data.subTotal}
                            shippingFee={data.shippingFee}
                            totalAmount={data.totalAmount}
                            selectedPaymentMethod={selectedPaymentMethod}
                            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
                            onOpenVoucherModal={() => setIsVoucherModalOpen(true)}
                            onOrderSubmit={handleOrderSubmit}
                        />
                    </div>
                </div>
            </main>

            <footer className="w-full bg-surface-container border-t border-subtle py-4 px-6 mt-auto text-center">
                <p className="font-caption text-text-muted">© 2024 Artisan Market. Giao dịch được mã hóa an toàn.</p>
            </footer>

            {/* Component 4: Modal Voucher */}
            <VoucherModal
                isOpen={isVoucherModalOpen}
                onClose={() => setIsVoucherModalOpen(false)}
                selectedVoucher={selectedVoucher}
                onSelectVoucher={setSelectedVoucher}
            />

            {/* Component 5: Modal Phương thức thanh toán */}
            <PaymentMethodModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                selectedPayment={selectedPaymentMethod}
                onSelectPayment={setSelectedPaymentMethod}
            />
        </div>
    );
}

export default CheckoutPage;