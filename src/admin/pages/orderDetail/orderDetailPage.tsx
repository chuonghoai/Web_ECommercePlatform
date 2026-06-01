import React from 'react';
import { useOrderDetailController } from './orderDetail.controller';
import { EOrderStatus } from '../../../features/order/enums/orderStatus.enum';

const OrderDetailPage: React.FC = () => {
    const { store, handleBack } = useOrderDetailController();

    if (store.loading) {
        return (
            <div className="flex justify-center items-center h-full p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (store.error) {
        return (
            <div className="p-8 text-center text-red-500">
                <p>{store.error}</p>
                <button 
                    onClick={handleBack}
                    className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                    Quay lại
                </button>
            </div>
        );
    }

    if (!store.orderDetail) {
        return null;
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString('vi-VN');
    };

    const getStatusColor = (status: EOrderStatus) => {
        switch (status) {
            case EOrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            case EOrderStatus.PREPARING: return 'bg-blue-100 text-blue-800';
            case EOrderStatus.SHIPPING: return 'bg-indigo-100 text-indigo-800';
            case EOrderStatus.DELIVERED: return 'bg-purple-100 text-purple-800';
            case EOrderStatus.SUCCESS: return 'bg-green-100 text-green-800';
            case EOrderStatus.CANCELLED: return 'bg-red-100 text-red-800';
            case EOrderStatus.RETURNED: return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={handleBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Quay lại danh sách"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{store.orderDetail.id.toUpperCase()}</h1>
                        <p className="text-sm text-gray-500">Ngày tạo: {formatDate(store.orderDetail.createdAt)}</p>
                    </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(store.orderDetail.orderStatus)}`}>
                    {store.orderDetail.orderStatus}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Section 4: Order Items */}
                    <div className="bg-white rounded-lg shadow border p-6">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Danh sách sản phẩm</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b text-gray-600 text-sm">
                                        <th className="py-3 px-2 font-medium">Hình ảnh</th>
                                        <th className="py-3 px-2 font-medium">Sản phẩm</th>
                                        <th className="py-3 px-2 font-medium">Đơn giá</th>
                                        <th className="py-3 px-2 font-medium">Số lượng</th>
                                        <th className="py-3 px-2 font-medium text-right">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {store.orderDetail.items.map(item => (
                                        <tr key={item.productId} className="hover:bg-gray-50">
                                            <td className="py-3 px-2">
                                                <img src={item.productImageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded border" />
                                            </td>
                                            <td className="py-3 px-2">
                                                <p className="font-medium text-gray-900">{item.productName}</p>
                                                {item.discountPercentage > 0 && (
                                                    <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded">
                                                        Giảm {item.discountPercentage}%
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-2">
                                                <p>{formatCurrency(item.price)}</p>
                                                {item.originalPrice > item.price && (
                                                    <p className="text-xs text-gray-400 line-through">{formatCurrency(item.originalPrice)}</p>
                                                )}
                                            </td>
                                            <td className="py-3 px-2">{item.quantity}</td>
                                            <td className="py-3 px-2 text-right font-medium text-gray-900">
                                                {formatCurrency(item.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section 6: Order Timeline */}
                    <div className="bg-white rounded-lg shadow border p-6">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Lịch sử đơn hàng</h2>
                        <div className="relative border-l-2 border-gray-200 ml-3 mt-4 space-y-6">
                            {store.orderDetail.statusHistory.map((history, index) => {
                                const isLast = index === store.orderDetail.statusHistory.length - 1;
                                let colorClass = 'bg-gray-500';
                                let textClass = isLast ? 'text-gray-900' : 'text-gray-600';
                                
                                switch (history.status) {
                                    case EOrderStatus.PENDING:
                                    case EOrderStatus.PREPARING:
                                    case EOrderStatus.SHIPPING:
                                        colorClass = 'bg-blue-500';
                                        break;
                                    case EOrderStatus.DELIVERED:
                                    case EOrderStatus.SUCCESS:
                                        colorClass = 'bg-green-500';
                                        break;
                                    case EOrderStatus.CANCELLED:
                                        colorClass = 'bg-red-500';
                                        if (isLast) textClass = 'text-red-600';
                                        break;
                                    case EOrderStatus.RETURNED:
                                        colorClass = 'bg-orange-500';
                                        if (isLast) textClass = 'text-orange-600';
                                        break;
                                }

                                return (
                                    <div key={index} className="relative pl-6">
                                        <div className={`absolute w-4 h-4 ${colorClass} rounded-full -left-2.25 top-1 border-2 border-white`}></div>
                                        <h3 className={`font-semibold ${textClass}`}>{history.note || history.status}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(history.timestamp)}</p>
                                        {isLast && store.orderDetail.cancelReason && (history.status === EOrderStatus.CANCELLED || history.status === EOrderStatus.RETURNED) && (
                                            <p className="text-sm text-gray-600 mt-1">Lý do: {store.orderDetail.cancelReason}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Section 2: Shipping Address */}
                    <div className="bg-white rounded-lg shadow border p-6">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Địa chỉ giao hàng</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-500 block">Người nhận</span>
                                <span className="font-medium text-gray-900">{store.orderDetail.buyerName}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block">Số điện thoại</span>
                                <span className="font-medium text-gray-900">{store.orderDetail.buyerPhone}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block">Địa chỉ</span>
                                <span className="font-medium text-gray-900">{store.orderDetail.buyerAddress}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Payment Information */}
                    <div className="bg-white rounded-lg shadow border p-6">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Thông tin thanh toán</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Phương thức</span>
                                <span className="font-medium text-gray-900 uppercase">{store.orderDetail.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Trạng thái</span>
                                <span className="font-medium text-gray-900 uppercase">{store.orderDetail.paymentStatus}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Order Summary */}
                    <div className="bg-white rounded-lg shadow border p-6">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Tổng kết đơn hàng</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tạm tính</span>
                                <span className="font-medium text-gray-900">{formatCurrency(store.orderDetail.subTotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Phí vận chuyển</span>
                                <span className="font-medium text-gray-900">{formatCurrency(store.orderDetail.shippingFee)}</span>
                            </div>
                            {(store.orderDetail.discountAmount ?? 0) > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Giảm giá</span>
                                    <span className="font-medium text-green-600">-{formatCurrency(store.orderDetail.discountAmount!)}</span>
                                </div>
                            )}
                            <div className="border-t pt-3 flex justify-between items-center">
                                <span className="font-semibold text-gray-900">Tổng thanh toán</span>
                                <span className="text-xl font-bold text-blue-600">{formatCurrency(store.orderDetail.totalAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
