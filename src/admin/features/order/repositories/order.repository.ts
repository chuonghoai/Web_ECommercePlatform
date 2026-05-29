import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { EOrderStatus } from "../../../../features/order/enums/orderStatus.enum";
import type { OrderItem } from "../model/orderItem.model";
import type { OrderStatusCount } from "../model/orderStatusCount.model";

export interface OrderRepository {
    getOrdersByStatus(status?: EOrderStatus): Promise<ApiResponse<OrderItem[]>>;
    getOrderStatusCounts(): Promise<ApiResponse<OrderStatusCount>>;
}