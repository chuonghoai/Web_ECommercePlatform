import React from 'react';
import { PaymentMethod } from '../../../features/order/checkout/enums/paymentMethod.enum';

interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPayment: PaymentMethod;
    onSelectPayment: (paymentMethod: PaymentMethod) => void;
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
    isOpen,
    onClose,
    selectedPayment,
    onSelectPayment
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-text-ink/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-surface-card w-[90%] max-w-md rounded-lg shadow-xl card-border flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-subtle">
                    <h3 className="font-subhead text-lg text-text-ink">Phương thức thanh toán</h3>
                    <button className="text-text-muted hover:text-text-ink transition-colors" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-4 space-y-3 overflow-y-auto">
                    <label className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer ${selectedPayment === PaymentMethod.COD ? 'border-primary-container bg-surface-container-low' : 'border-border-medium'}`}>
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary-container text-2xl">local_shipping</span>
                            <div>
                                <p className="font-body font-semibold text-text-ink">Thanh toán khi nhận hàng (COD)</p>
                                <p className="font-caption text-text-muted">Thanh toán bằng tiền mặt khi nhận hàng</p>
                            </div>
                        </div>
                        <input type="radio" name="payment" checked={selectedPayment === PaymentMethod.COD} onChange={() => onSelectPayment(PaymentMethod.COD)} className="w-4 h-4 text-primary-container" />
                    </label>
                    <label className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer ${selectedPayment === PaymentMethod.MOMO ? 'border-primary-container bg-surface-container-low' : 'border-border-medium'}`}>
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-text-muted text-2xl">account_balance</span>
                            <div>
                                <p className="font-body font-semibold text-text-ink">Chuyển khoản ngân hàng</p>
                                <p className="font-caption text-text-muted">Quét mã QR qua ứng dụng ngân hàng</p>
                            </div>
                        </div>
                        <input type="radio" name="payment" checked={selectedPayment === PaymentMethod.MOMO} onChange={() => onSelectPayment(PaymentMethod.MOMO)} className="w-4 h-4 text-primary-container" />
                    </label>
                </div>
                <div className="p-4 border-t border-subtle bg-surface-container flex gap-4">
                    <button className="w-1/2 btn-secondary py-2 font-body" onClick={onClose}>Hủy</button>
                    <button className="w-1/2 btn-primary py-2 font-body font-semibold" onClick={onClose}>Xác nhận</button>
                </div>
            </div>
        </div>
    );
};