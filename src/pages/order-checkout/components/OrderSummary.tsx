import React from 'react';
import { EPaymentMethod } from '../../../features/order/enums/paymentMethod.enum';

interface OrderSummaryProps {
    subTotal: number;
    shippingFee: number;
    totalAmount: number;
    selectedPaymentMethod: EPaymentMethod; // Đổi type sang enum
    onOpenPaymentModal: () => void;
    onOpenVoucherModal: () => void;
    onOrderSubmit: () => void;
    isCheckingOut?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    subTotal,
    shippingFee,
    totalAmount,
    selectedPaymentMethod,
    onOpenPaymentModal,
    onOpenVoucherModal,
    onOrderSubmit,
    isCheckingOut
}) => {
    const getPaymentMethodInfo = (method: EPaymentMethod) => {
        switch (method) {
            case EPaymentMethod.COD:
                return {
                    icon: <span className="material-symbols-outlined text-primary-container shrink-0 text-xl">local_shipping</span>,
                    text: "Thanh toán khi nhận hàng (COD)"
                };
            case EPaymentMethod.MOMO:
                return {
                    icon: <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square-1024x1024.png" alt="MoMo" className="w-5 h-5 object-contain rounded-sm shrink-0" />,
                    text: "Ví điện tử MoMo"
                };
            case EPaymentMethod.VNPAY:
                return {
                    icon: <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" alt="VNPAY" className="w-5 h-5 object-contain rounded-sm shrink-0" />,
                    text: "Cổng thanh toán VNPAY"
                };
            case EPaymentMethod.PAYPAL:
                return {
                    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="PayPal" className="w-5 h-5 object-contain rounded-sm shrink-0" />,
                    text: "Ví điện tử PayPal"
                };
            default:
                return {
                    icon: <span className="material-symbols-outlined text-primary-container shrink-0 text-xl">payment</span>,
                    text: "Chưa chọn phương thức"
                };
        }
    };

    const paymentInfo = getPaymentMethodInfo(selectedPaymentMethod);

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
                            {paymentInfo.icon}
                            <span className="font-body-sm text-text-ink truncate" title={paymentInfo.text}>
                                {paymentInfo.text}
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

                    <div className="pt-2 space-y-3">
                        <button
                            disabled={isCheckingOut}
                            className="w-full btn-primary py-2 font-body font-semibold tracking-wide flex justify-center items-center gap-2"
                            onClick={onOrderSubmit}
                        >
                            {isCheckingOut ? (
                                <span className="font-body-sm animate-pulse">Đang xử lý...</span>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">check_circle</span>
                                    Đặt hàng
                                </>
                            )}
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