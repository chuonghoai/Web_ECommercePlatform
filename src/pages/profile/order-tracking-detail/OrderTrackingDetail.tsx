import React from "react";
import { Link } from "react-router-dom";
import { OrderTimeline } from "./components/OrderTimeline";
import { CancelOrderRequestModal } from "../components/CancelOrderRequestModal";
import { ReturnOrderRequestModal } from "../components/ReturnOrderRequestModal";
import { EOrderStatus } from "../../../features/order/enums/orderStatus.enum";
import { useOrderTrackingDetailController } from "./orderTrackingDetail.controller";

export const OrderTrackingDetail: React.FC = () => {
    const controller = useOrderTrackingDetailController();
    const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = React.useState(false);

    if (controller.loading && !controller.order) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-border-subtle shadow-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-market-primary"></div>
            </div>
        );
    }

    if (controller.error || !controller.order) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-border-subtle shadow-sm text-red-500">
                {controller.error || "Không tìm thấy chi tiết đơn hàng"}
            </div>
        );
    }

    const showCancelReason = (controller.order.orderStatus === EOrderStatus.CANCELLED || controller.order.orderStatus === EOrderStatus.RETURNED) && controller.order.cancelReason;
    const canCancel = controller.order.orderStatus === EOrderStatus.PENDING;
    const canReturn = controller.order.orderStatus === EOrderStatus.SUCCESS;

    return (
        <div className="flex flex-col gap-6 relative">
            {controller.actionLoading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-20 rounded-2xl">
                    <div className="w-8 h-8 rounded-full border-2 border-market-primary border-t-transparent animate-spin"></div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white border border-border-subtle rounded-2xl shadow-sm overflow-hidden p-6 flex items-center gap-4">
                <Link
                    to="/profile/order/tracking"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h2 className="font-['Lora',serif] text-xl font-bold text-stone-900 flex items-center gap-3">
                        Mã đơn: <span className="text-market-primary">{controller.order.id}</span>
                    </h2>
                    <p className="text-stone-500 text-sm mt-1">
                        Ngày đặt: {new Date(controller.order.createdAt).toLocaleDateString("vi-VN", {
                            hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric"
                        })}
                    </p>
                </div>
            </div>

            {/* Cancel Reason */}
            {(showCancelReason
                || controller.order.orderStatus === EOrderStatus.RETURNED
                || controller.order.orderStatus === EOrderStatus.CANCELLED) && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-red-800 mb-1">
                                Lý do {controller.order.orderStatus === EOrderStatus.RETURNED ? "hoàn trả" : "hủy đơn"}
                            </h4>
                            <p className="text-red-600 text-sm">{controller.order.cancelReason}</p>
                        </div>
                    </div>
                )}

            {/* Timeline */}
            <OrderTimeline history={controller.order.statusHistory} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Products & Payment Summary */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Products List */}
                    <div className="bg-white border border-border-subtle rounded-xl shadow-sm p-6">
                        <h3 className="font-semibold text-stone-800 mb-4 font-['Lora',serif] border-b border-stone-100 pb-4">
                            Danh sách sản phẩm
                        </h3>
                        <div className="flex flex-col gap-4">
                            {controller.order.items.map((item) => (
                                <div key={item.productId} className="flex items-start gap-4 pb-4 border-b border-stone-50 last:border-0 last:pb-0">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-stone-100 bg-stone-50 shrink-0">
                                        <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-stone-800 font-medium text-base mb-1">{item.productName}</h4>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="text-stone-500">Số lượng: x{item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-market-primary font-semibold text-base mb-1">
                                            {item.price.toLocaleString("vi-VN")}đ
                                        </div>
                                        {item.originalPrice > item.price && (
                                            <div className="text-stone-400 text-xs line-through">
                                                {item.originalPrice.toLocaleString("vi-VN")}đ
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Address & Payment Details */}
                <div className="flex flex-col gap-6">
                    {/* Address block */}
                    <div className="bg-white border border-border-subtle rounded-xl shadow-sm p-6">
                        <h3 className="font-semibold text-stone-800 mb-4 font-['Lora',serif] border-b border-stone-100 pb-4">
                            Địa chỉ nhận hàng
                        </h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-stone-800">{controller.order.buyerName}</span>
                                <span className="text-stone-300">|</span>
                                <span className="text-stone-600">{controller.order.buyerPhone}</span>
                            </div>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {controller.order.buyerAddress}
                            </p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white border border-border-subtle rounded-xl shadow-sm p-6">
                        <h3 className="font-semibold text-stone-800 mb-4 font-['Lora',serif] border-b border-stone-100 pb-4">
                            Thông tin thanh toán
                        </h3>

                        <div className="flex flex-col gap-3 text-sm text-stone-600 mb-4 border-b border-stone-100 pb-4">
                            <div className="flex justify-between">
                                <span>Phương thức:</span>
                                <span className="font-medium text-stone-800">{controller.order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Trạng thái:</span>
                                <span className={`font-medium ${controller.order.paymentStatus === 'PAID' ? 'text-market-success' : 'text-market-warning'}`}>
                                    {controller.order.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex justify-between text-stone-500">
                                <span>Tạm tính</span>
                                <span>{controller.order.subTotal.toLocaleString("vi-VN")}đ</span>
                            </div>
                            <div className="flex justify-between text-stone-500">
                                <span>Phí vận chuyển</span>
                                <span>{controller.order.shippingFee.toLocaleString("vi-VN")}đ</span>
                            </div>
                            {controller.order.discountAmount && controller.order.discountAmount > 0 ? (
                                <div className="flex justify-between text-market-success">
                                    <span>Giảm giá</span>
                                    <span>-{controller.order.discountAmount.toLocaleString("vi-VN")}đ</span>
                                </div>
                            ) : null}
                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
                                <span className="font-semibold text-stone-800">Tổng cộng</span>
                                <span className="font-bold text-market-primary text-xl">
                                    {controller.order.totalAmount.toLocaleString("vi-VN")}đ
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {(canCancel || canReturn) && (
                            <div className="mt-6">
                                {canCancel && (
                                    <button
                                        onClick={() => setIsCancelModalOpen(true)}
                                        className="w-full min-h-11 flex items-center justify-center font-medium text-white bg-market-error hover:bg-red-700 rounded-xl transition-colors shadow-sm"
                                    >
                                        Hủy đơn
                                    </button>
                                )}
                                {canReturn && (
                                    <button
                                        onClick={() => setIsReturnModalOpen(true)}
                                        className="w-full min-h-11 flex items-center justify-center font-medium text-white bg-market-warning hover:bg-amber-600 rounded-xl transition-colors shadow-sm mt-3"
                                    >
                                        Yêu cầu trả hàng
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {controller.order && (
                <CancelOrderRequestModal
                    open={isCancelModalOpen}
                    order={controller.order}
                    onClose={() => setIsCancelModalOpen(false)}
                    onSubmit={controller.handleCancelOrder}
                />
            )}
            {controller.order && (
                <ReturnOrderRequestModal
                    open={isReturnModalOpen}
                    order={controller.order}
                    onClose={() => setIsReturnModalOpen(false)}
                    onSubmit={controller.handleReturnOrder}
                />
            )}
        </div>
    );
};
