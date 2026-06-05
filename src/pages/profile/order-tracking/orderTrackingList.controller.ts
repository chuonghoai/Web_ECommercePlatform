import { useState, useEffect, useMemo, useCallback } from "react";
import { useOrderTrackingListStore } from "./orderTrackingList.store";
import { EOrderStatus } from "../../../features/order/enums/orderStatus.enum";

export type TabKey = "all" | "pending" | "preparing" | "shipping" | "success" | "cancelled";

export interface TabItem {
    key: TabKey;
    label: string;
    count: number;
}

export const useOrderTrackingListController = () => {
    const store = useOrderTrackingListStore();
    const [activeTab, setActiveTab] = useState<TabKey>("all");

    /**
     * Fetch orders status count
     */
    useEffect(() => {
        store.fetchOrdersCount();
    }, [store.fetchOrdersCount]);

    /**
     * Fetch list order base status selected
     */
    useEffect(() => {
        let status: EOrderStatus | undefined;
        if (activeTab === "pending") status = EOrderStatus.PENDING;
        else if (activeTab === "preparing") status = EOrderStatus.PREPARING;
        else if (activeTab === "shipping") status = EOrderStatus.SHIPPING;
        else if (activeTab === "success") status = EOrderStatus.SUCCESS;
        else if (activeTab === "cancelled") status = EOrderStatus.CANCELLED;

        store.fetchOrders(status);
    }, [activeTab, store.fetchOrders]);

    /**
     * List tab: order status
     */
    const tabs: TabItem[] = useMemo(() => {
        const count = store.ordersCount;
        return [
            { key: "all", label: "Tất cả", count: count?.all || 0 },
            { key: "pending", label: "Chờ xác nhận", count: count?.pending || 0 },
            { key: "preparing", label: "Đang chuẩn bị", count: count?.preparing || 0 },
            { key: "shipping", label: "Đang giao", count: count?.shipping || 0 },
            { key: "success", label: "Đã giao", count: count?.success || 0 },
            { key: "cancelled", label: "Đã hủy", count: count?.cancelled || 0 },
        ];
    }, [store.ordersCount]);

    /**
     * Action: handle change tab status
     */
    const handleTabChange = useCallback((tab: TabKey) => {
        setActiveTab(tab);
    }, []);

    /**
     * Lọc item từ response, cứu hộ cho trường hợp response trả về thừa dữ liệu
     */
    const filteredItems = useMemo(() => {
        return store.orders.filter((item) => {
            if (activeTab === "all") return item.orderStatus === EOrderStatus.PENDING || item.orderStatus === EOrderStatus.PREPARING || item.orderStatus === EOrderStatus.SHIPPING;
            if (activeTab === "pending") return item.orderStatus === EOrderStatus.PENDING;
            if (activeTab === "preparing") return item.orderStatus === EOrderStatus.PREPARING;
            if (activeTab === "shipping") return item.orderStatus === EOrderStatus.SHIPPING;
            if (activeTab === "success") return item.orderStatus === EOrderStatus.SUCCESS || item.orderStatus === EOrderStatus.DELIVERED;
            if (activeTab === "cancelled") return item.orderStatus === EOrderStatus.CANCELLED || item.orderStatus === EOrderStatus.RETURNED;
            return true;
        });
    }, [store.orders, activeTab]);

    const handleCancelOrder = useCallback(async (orderId: string) => {
        const result = await store.cancelOrder(orderId, "Khách hàng đổi ý (thao tác từ giao diện)");
        if (result.success) {
            alert("Hủy đơn hàng thành công!");
            store.fetchOrdersCount();
            store.fetchOrders(activeTab === "all" ? undefined : (
                activeTab === "pending" ? EOrderStatus.PENDING :
                activeTab === "preparing" ? EOrderStatus.PREPARING :
                activeTab === "shipping" ? EOrderStatus.SHIPPING :
                activeTab === "success" ? EOrderStatus.SUCCESS :
                activeTab === "cancelled" ? EOrderStatus.CANCELLED : undefined
            ));
        } else {
            alert(result.message || "Không thể hủy đơn hàng.");
        }
    }, [store.cancelOrder, store.fetchOrders, store.fetchOrdersCount, activeTab]);

    const handleReturnOrder = useCallback(async (orderId: string) => {
        const result = await store.returnOrder(orderId, "Hàng bị lỗi (thao tác từ giao diện)");
        if (result.success) {
            alert("Yêu cầu trả hàng thành công!");
            store.fetchOrdersCount();
            store.fetchOrders(activeTab === "all" ? undefined : (
                activeTab === "pending" ? EOrderStatus.PENDING :
                activeTab === "preparing" ? EOrderStatus.PREPARING :
                activeTab === "shipping" ? EOrderStatus.SHIPPING :
                activeTab === "success" ? EOrderStatus.SUCCESS :
                activeTab === "cancelled" ? EOrderStatus.CANCELLED : undefined
            ));
        } else {
            alert(result.message || "Không thể yêu cầu trả hàng.");
        }
    }, [store.returnOrder, store.fetchOrders, store.fetchOrdersCount, activeTab]);

    return {
        loading: store.loading,
        error: store.error,
        actionLoading: store.actionLoading,
        activeTab,
        tabs,
        filteredItems,
        handleTabChange,
        handleCancelOrder,
        handleReturnOrder,
    };
};
