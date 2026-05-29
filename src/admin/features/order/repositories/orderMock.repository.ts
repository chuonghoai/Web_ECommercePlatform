import type { ApiResponse } from "../../../../core/api/apiResponse";
import { EOrderStatus } from "../../../../features/order/enums/orderStatus.enum";
import { EPaymentMethod } from "../../../../features/order/enums/paymentMethod.enum";
import { EPaymentStatus } from "../../../../features/order/enums/paymentStatus.enum";
import type { OrderItem } from "../model/orderItem.model";
import type { OrderRepository } from "./order.repository";

const mockOrder: OrderItem[] = [
    {
        id: "1",
        createdAt: new Date(),
        orderStatus: EOrderStatus.PENDING,
        totalAmount: 100000,
        totalProductQuantity: 1,
        firstProductImageUrl: "https://example.com/product1.jpg",
        buyerName: "John Doe",
        buyerAddress: "Address 1",
        buyerPhone: "1234567890",
        paymentMethod: EPaymentMethod.COD,
        paymentStaus: EPaymentStatus.PENDING
    }
]

export class OrderMockRepository implements OrderRepository {
    async getOrdersByStatus(status?: EOrderStatus): Promise<ApiResponse<OrderItem[]>> {
        let orders: OrderItem[];
        if (!status)
            orders = mockOrder.filter(order =>
                order.orderStatus === EOrderStatus.PENDING ||
                order.orderStatus === EOrderStatus.PREPARING ||
                order.orderStatus === EOrderStatus.SHIPPING
            )
        else
            orders = mockOrder.filter(order => order.orderStatus === status)

        return Promise.resolve({
            success: true,
            message: "Success",
            data: orders
        })
    }
}