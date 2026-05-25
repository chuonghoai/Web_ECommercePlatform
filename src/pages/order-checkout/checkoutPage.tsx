import { useCheckoutController } from './checkout.controller';
import { OrderItemsList } from './components/OrderItemsList';
import { OrderSummary } from './components/OrderSummary';
import { VoucherModal } from './components/Modal/VoucherModal';
import { PaymentMethodModal } from './components/Modal/PaymentMethodModal';
import { AddressModal } from './components/Modal/AddressModal';
import { Navigate, useLocation } from 'react-router-dom';
import type { PrepareCheckoutRequest } from '../../features/order/checkout/dto/checkout.dto';
import { ShippingForm } from './components/ShippingForm/ShippingForm';

function CheckoutPage() {
    const location = useLocation();
    const checkoutItems = location.state?.checkoutItems as PrepareCheckoutRequest[];

    const {
        data,
        loading,
        error,
        isVoucherModalOpen,
        setIsVoucherModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedVoucher,
        setSelectedVoucher,
        handleSelectAddress,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveItem,
        handleOrderSubmit
    } = useCheckoutController(checkoutItems || []);

    if (!checkoutItems || checkoutItems.length === 0) {
        return <Navigate to="/cart" replace />;
    }

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
                <div className="max-w-full mx-auto flex justify-between items-center">
                    <div className="font-display text-2xl md:text-3xl text-primary font-bold tracking-tight">
                        Artisan Market
                    </div>
                    <div className="font-caption text-sm text-text-muted flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lock</span>
                        Thanh toán an toàn
                    </div>
                </div>
            </header>

            <main className="grow py-8 md:py-12 px-6">
                <div className="max-w-full mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">

                        <div className="w-full lg:w-2/3 space-y-8">
                            {/* Component: Shipping info */}
                            <ShippingForm 
                                address={data.address} 
                                onOpenAddressModal={() => setIsAddressModalOpen(true)}
                            />

                            {/* Component: Order item list */}
                            <OrderItemsList
                                items={data.items}
                                invalidItems={data.invalidItems}
                                onIncrease={handleIncreaseQuantity}
                                onDecrease={handleDecreaseQuantity}
                                onRemove={handleRemoveItem}
                            />
                        </div>

                        {/* Component: Order summary */}
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

            {/* Modal: Choosing voucher */}
            <VoucherModal
                isOpen={isVoucherModalOpen}
                onClose={() => setIsVoucherModalOpen(false)}
                selectedVoucher={selectedVoucher}
                onSelectVoucher={setSelectedVoucher}
            />

            {/* Modal: Payment method */}
            <PaymentMethodModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                selectedPayment={selectedPaymentMethod}
                onSelectPayment={setSelectedPaymentMethod}
            />

            {/* Modal: Choosing address */}
            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                selectedAddressId={data.address?.id}
                onSelectAddress={handleSelectAddress}
            />
        </div>
    );
}

export default CheckoutPage;