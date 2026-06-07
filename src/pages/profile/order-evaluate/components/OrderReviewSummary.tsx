import React from "react";
import type { OrderTrackingDetail } from "../../../../features/order/tracking/model/orderDetail.model";

interface OrderReviewSummaryProps {
    order: OrderTrackingDetail;
    canSubmit: boolean;
    isSubmitting: boolean;
    onSubmit: () => void;
}

export const OrderReviewSummary: React.FC<OrderReviewSummaryProps> = ({
    order,
    canSubmit,
    isSubmitting,
    onSubmit,
}) => {
    const totalItems = order.items.length;
    const reviewedItems = order.items.filter((i) => i.isReviewed).length;

    return (
        <div className="bg-white border border-border-subtle rounded-xl shadow-sm p-6 flex flex-col h-full">
            <h3 className="font-semibold text-stone-800 mb-4 font-['Lora',serif] border-b border-stone-100 pb-3">
                Thông tin đơn hàng
            </h3>
            
            <div className="flex flex-col gap-4 mb-6">
                <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">Mã đơn hàng</p>
                    <p className="text-stone-800 font-medium">{order.id}</p>
                </div>
                <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">Ngày đặt hàng</p>
                    <p className="text-stone-800">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">Tổng tiền</p>
                    <p className="text-market-primary font-bold">{order.totalAmount.toLocaleString("vi-VN")}đ</p>
                </div>
            </div>

            <div className="mt-auto">
                <div className="bg-stone-50 rounded-lg p-3 mb-4 border border-stone-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-700">Tiến độ đánh giá</span>
                    <span className="text-sm font-bold text-market-primary">
                        {reviewedItems} / {totalItems}
                    </span>
                </div>
                
                <button
                    onClick={onSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className={`w-full min-h-12 flex items-center justify-center font-semibold rounded-xl transition-colors ${
                        canSubmit && !isSubmitting
                            ? "bg-market-primary text-white hover:bg-market-primary/90 shadow-sm"
                            : "bg-stone-100 text-stone-400 cursor-not-allowed"
                    }`}
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    ) : (
                        "Hoàn tất đánh giá"
                    )}
                </button>
            </div>
        </div>
    );
};
