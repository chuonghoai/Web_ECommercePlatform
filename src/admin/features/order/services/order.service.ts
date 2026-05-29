import type { OrderRepository } from "../repositories/order.repository";
import type { OrderItem } from "../model/orderItem.model";
import type { EOrderStatus } from "../../../../features/order/enums/orderStatus.enum";
import type { ApiResponse } from "../../../../core/api/apiResponse";
import { OrderMockRepository } from "../repositories/orderMock.repository";
import { OrderApiRepository } from "../repositories/orderApi.repository";
import { USE_MOCK } from "../../../../core/config/useMock.config";
import type { OrderStatusCount } from "../model/orderStatusCount.model";

export class OrderService {
    private readonly orderRepository: OrderRepository;

    constructor(orderRepository?: OrderRepository) {
        this.orderRepository = orderRepository || new OrderApiRepository();
    }

    getOrdersByStatus(status?: EOrderStatus): Promise<ApiResponse<OrderItem[]>> {
        return this.orderRepository.getOrdersByStatus(status);
    }

    getOrderStatusCount(): Promise<ApiResponse<OrderStatusCount>> {
        return this.orderRepository.getOrderStatusCounts();
    }
}

export const orderService = new OrderService(USE_MOCK ? new OrderMockRepository() : undefined);