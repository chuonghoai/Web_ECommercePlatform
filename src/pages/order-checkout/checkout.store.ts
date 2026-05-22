import { useState, useCallback } from "react";
import { checkoutService } from "../../features/order/checkout/services/checkout.service";
import type { PrepareCheckoutModel } from "../../features/order/checkout/models/checkout.model";
import type { PrepareCheckoutRequest } from "../../features/order/checkout/dto/checkout.dto";

export const useCheckoutStore = () => {
    const [data, setData] = useState<PrepareCheckoutModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPrepareOrder = useCallback(async (request: PrepareCheckoutRequest[]) => {
        setLoading(true);
        setError(null);
        try {
            const response = await checkoutService.prepareOrder(request);
            if (response.success && response.data) {
                setData(response.data);
            } else {
                setError(response.message || "Không thể chuẩn bị đơn hàng.");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi hệ thống khi xử lý đơn hàng.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        data,
        loading,
        error,
        setData,
        fetchPrepareOrder,
    };
};