import { useState, useCallback } from 'react';
import type { OrderItem } from '../../features/order/model/orderItem.model';
import { orderService } from '../../features/order/services/order.service';
import type { EOrderStatus } from '../../../features/order/enums/orderStatus.enum';

interface OrderState {
    orders: OrderItem[];
    loading: boolean;
    error: string | null;
}

export const useOrderStore = () => {
    const [state, setState] = useState<OrderState>({
        orders: [],
        loading: false,
        error: null,
    });

    const fetchOrders = useCallback(async (status?: EOrderStatus) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await orderService.getOrdersByStatus(status);
            if (response.success) {
                setState(prev => ({ ...prev, orders: response.data || [], loading: false }));
            } else {
                setState(prev => ({ ...prev, error: response.message, loading: false }));
            }
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: 'Không thể tải danh sách đơn hàng. Vui lòng thử lại.',
                loading: false
            }));
        }
    }, []);

    return {
        ...state,
        fetchOrders,
    };
};