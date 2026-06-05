import React from "react";
import { Link } from "react-router-dom";
import { OrderStatusBadge } from "./OrderStatusBadge";
import type { OrderItemTracking } from "../../../../features/order/tracking/model/orderItem.model";
import { EOrderStatus } from "../../../../features/order/enums/orderStatus.enum";

interface OrderCardProps {
    order: OrderItemTracking;
    onCancel?: (orderId: string) => void;
    onReturn?: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onCancel, onReturn }) => {
    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onCancel) {
            onCancel(order.id);
        } else {
            console.log("Hủy đơn hàng:", order.id);
        }
    };

    const handleReturn = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onReturn) {
            onReturn(order.id);
        } else {
            console.log("Yêu cầu trả hàng:", order.id);
        }
    };

    return (
        <div className="bg-white border border-border-subtle rounded-xl shadow-sm overflow-hidden flex flex-col hover:border-market-primary/30 transition-colors">
            {/* Header */}
            <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-stone-800 text-sm">{order.id}</span>
                    <span className="text-stone-400 text-xs hidden sm:inline">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
                <OrderStatusBadge status={order.orderStatus} />
            </div>

            {/* Body */}
            <div className="p-5 flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-stone-100 bg-stone-50 shrink-0">
                    <img
                        src={order.firstProductImageUrl}
                        alt={order.firstProductName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center h-20">
                    <h3 className="text-stone-800 font-medium text-base line-clamp-1">
                        {order.firstProductName}
                    </h3>
                    {order.totalProductQuantity > 1 && (
                        <p className="text-sm text-stone-500 mt-1">
                            + {order.totalProductQuantity - 1} sản phẩm khác
                        </p>
                    )}
                </div>
                <div className="text-right shrink-0 flex flex-col justify-center h-20">
                    <p className="text-xs text-stone-500 mb-1">Tổng tiền</p>
                    <p className="text-market-primary font-bold text-lg">
                        {order.totalAmount.toLocaleString("vi-VN")}đ
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-4 border-t border-stone-100 flex items-center justify-end gap-3 bg-stone-50/30">
                {(order.orderStatus === EOrderStatus.PENDING || order.orderStatus === EOrderStatus.PREPARING) && (
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:text-red-600 transition-colors"
                    >
                        Hủy đơn
                    </button>
                )}

                {order.orderStatus === EOrderStatus.SUCCESS && (
                    <button
                        onClick={handleReturn}
                        className="px-4 py-2 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:text-red-600 transition-colors"
                    >
                        Yêu cầu trả hàng
                    </button>
                )}

                <Link
                    to={`/profile/order/tracking/${order.id}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-market-primary rounded-lg hover:bg-market-primary/90 transition-colors shadow-sm"
                >
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
};
