import React from 'react';

interface OrderSummaryProps {
    subTotal: number;
    shippingFee: number;
    totalAmount: number;
    selectedPaymentMethod: string;
    onOpenPaymentModal: () => void;
    onOpenVoucherModal: () => void;
    onOrderSubmit: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    subTotal,
    shippingFee,
    totalAmount,
    selectedPaymentMethod,
    onOpenPaymentModal,
    onOpenVoucherModal,
    onOrderSubmit
}) => {
    return (
        <aside className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-6 space-y-6">
                <h2 className="font-headline text-2xl text-text-ink border-b border-subtle pb-2 hidden lg:block">Tóm tắt đơn hàng</h2>
                <div className="bg-surface-card card-border rounded-lg p-6 space-y-4">
                    <div className="space-y-2 font-body-sm border-b border-subtle pb-4">
                        <div className="flex justify-between items-center text-on-surface-variant">
                            <span>Tạm tính</span>
                            <span>{subTotal.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="flex justify-between items-center text-on-surface-variant">
                            <span>Phí vận chuyển</span>
                            <span>{shippingFee.toLocaleString('vi-VN')}₫</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end pt-1">
                        <span className="font-subhead text-text-ink">Tổng cộng</span>
                        <span className="font-display text-2xl text-primary-container font-bold">{totalAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <p className="font-caption text-text-muted text-right italic">(Đã bao gồm VAT)</p>

                    {/* Voucher button: open modal choosing voucher */}
                    <div className="pt-2">
                        <button
                            type="button"
                            className="w-full font-body-sm text-primary border border-border-medium bg-surface hover:bg-surface-container-low transition-colors py-2 rounded-lg flex justify-center items-center gap-1.5"
                            onClick={onOpenVoucherModal}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>confirmation_number</span>
                            Áp dụng voucher
                        </button>
                    </div>

                    {/* Payment method button: open modal choosing payment method */}
                    <div className="bg-surface-container-low p-3 rounded-lg border border-border-medium flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="material-symbols-outlined text-primary-container shrink-0">
                                {selectedPaymentMethod === "COD" ? "local_shipping" : "account_balance"}
                            </span>
                            <span className="font-body-sm text-text-ink truncate" title={selectedPaymentMethod === "COD" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản ngân hàng"}>
                                {selectedPaymentMethod === "COD" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản ngân hàng"}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="font-caption text-primary-container hover:underline shrink-0 ml-1 whitespace-nowrap"
                            onClick={onOpenPaymentModal}
                        >
                            Thay đổi
                        </button>
                    </div>

                    {/* Place order button */}
                    <div className="pt-2 space-y-3">
                        <button className="w-full btn-primary py-2 font-body font-semibold tracking-wide flex justify-center items-center gap-2" onClick={onOrderSubmit}>
                            <span className="material-symbols-outlined">check_circle</span>
                            Đặt hàng
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 font-caption text-text-muted mt-4">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified</span>
                    <span>Đổi trả miễn phí trong 30 ngày</span>
                </div>
            </div>
        </aside>
    );
};