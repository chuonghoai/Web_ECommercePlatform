import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useOrderTrackingDetailStore } from "./orderTrackingDetail.store";

export const useOrderTrackingDetailController = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const store = useOrderTrackingDetailStore();

    useEffect(() => {
        if (orderId) {
            store.fetchOrderDetail(orderId);
        }
    }, [orderId, store.fetchOrderDetail]);

    const handleCancelOrder = useCallback(async () => {
        if (!orderId) return;
        const result = await store.cancelOrder(orderId, "Khách hàng đổi ý (thao tác từ giao diện)");
        if (result.success) {
            alert("Hủy đơn hàng thành công!");
        } else {
            alert(result.message || "Không thể hủy đơn hàng.");
        }
    }, [orderId, store.cancelOrder]);

    const handleReturnOrder = useCallback(async () => {
        if (!orderId) return;
        const result = await store.returnOrder(orderId, "Hàng bị lỗi (thao tác từ giao diện)");
        if (result.success) {
            alert("Yêu cầu trả hàng thành công!");
        } else {
            alert(result.message || "Không thể yêu cầu trả hàng.");
        }
    }, [orderId, store.returnOrder]);

    return {
        order: store.order,
        loading: store.loading,
        error: store.error,
        actionLoading: store.actionLoading,
        handleCancelOrder,
        handleReturnOrder,
    };
};
