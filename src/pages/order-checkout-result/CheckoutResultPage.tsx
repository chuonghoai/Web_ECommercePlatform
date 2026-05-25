import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const CheckoutResultPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full bg-surface-card card-border rounded-xl p-8 text-center shadow-lg space-y-6">

                {/* Icon Success */}
                <div className="w-20 h-20 mx-auto rounded-full bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container" style={{ fontSize: '40px' }}>
                        check_circle
                    </span>
                </div>

                {/* Content */}
                <div>
                    <h1 className="font-headline text-2xl text-text-ink mb-2">Đặt hàng thành công!</h1>
                    <p className="font-body text-text-muted">
                        Cảm ơn bạn đã mua sắm tại Artisan Market. Đơn hàng của bạn đang được xử lý.
                    </p>
                </div>

                {/* Order ID Box */}
                {orderId && (
                    <div className="bg-surface-container-low p-4 rounded-lg border border-border-medium border-dashed">
                        <p className="font-caption text-text-muted mb-1 uppercase tracking-wider">Mã đơn hàng</p>
                        <p className="font-display text-xl text-primary font-bold">#{orderId}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="pt-4 space-y-3">
                    <Link to="/orders/history" className="w-full block btn-primary py-2.5 font-body font-semibold">
                        Xem lịch sử đơn hàng
                    </Link>
                    <Link to="/marketplace" className="w-full block btn-secondary py-2.5 font-body">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutResultPage;