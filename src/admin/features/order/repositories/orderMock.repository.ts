import type { ApiResponse } from "../../../../core/api/apiResponse";
import { EOrderStatus } from "../../../../features/order/enums/orderStatus.enum";
import { EPaymentMethod } from "../../../../features/order/enums/paymentMethod.enum";
import { EPaymentStatus } from "../../../../features/order/enums/paymentStatus.enum";
import type { OrderItem } from "../model/orderItem.model";
import type { OrderStatusCount } from "../model/orderStatusCount.model";
import type { OrderRepository } from "./order.repository";

const mockOrder: OrderItem[] = [
    {
        id: "aaaaa",
        createdAt: new Date(),
        orderStatus: EOrderStatus.PENDING,
        totalAmount: 100000,
        totalProductQuantity: 1,
        firstProductImageUrl: "https://salt.tikicdn.com/ts/tmp/a7/3d/ae/acf43cbb439f0fd6b01ca9338c108c6a.jpg",
        buyerName: "Alice",
        buyerAddress: "Address 1",
        buyerPhone: "1234567890",
        paymentMethod: EPaymentMethod.COD,
        paymentStaus: EPaymentStatus.PENDING
    },
    {
        id: "bbbbb",
        createdAt: new Date(),
        orderStatus: EOrderStatus.PREPARING,
        totalAmount: 100000,
        totalProductQuantity: 1,
        firstProductImageUrl: "https://salt.tikicdn.com/ts/tmp/a7/3d/ae/acf43cbb439f0fd6b01ca9338c108c6a.jpg",
        buyerName: "Bob",
        buyerAddress: "Address 2",
        buyerPhone: "1234567890",
        paymentMethod: EPaymentMethod.MOMO,
        paymentStaus: EPaymentStatus.PAID
    },
    {
        id: "cccccc",
        createdAt: new Date(),
        orderStatus: EOrderStatus.SHIPPING,
        totalAmount: 100000,
        totalProductQuantity: 1,
        firstProductImageUrl: "https://salt.tikicdn.com/ts/tmp/a7/3d/ae/acf43cbb439f0fd6b01ca9338c108c6a.jpg",
        buyerName: "Charlie",
        buyerAddress: "Address 1",
        buyerPhone: "1234567890",
        paymentMethod: EPaymentMethod.COD,
        paymentStaus: EPaymentStatus.PENDING
    },
    {
        id: "ddddd",
        createdAt: new Date(),
        orderStatus: EOrderStatus.SUCCESS,
        totalAmount: 100000,
        totalProductQuantity: 1,
        firstProductImageUrl: "https://salt.tikicdn.com/ts/tmp/a7/3d/ae/acf43cbb439f0fd6b01ca9338c108c6a.jpg",
        buyerName: "Doflamingo",
        buyerAddress: "Address 1",
        buyerPhone: "1234567890",
        paymentMethod: EPaymentMethod.COD,
        paymentStaus: EPaymentStatus.PENDING
    },
    {
        id: "ddddd",
        createdAt: new Date(),
        orderStatus: EOrderStatus.CANCELLED,
        totalAmount: 100000,
        totalProductQuantity: 1,
        firstProductImageUrl: "https://salt.tikicdn.com/ts/tmp/a7/3d/ae/acf43cbb439f0fd6b01ca9338c108c6a.jpg",
        buyerName: "Zoro",
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

    async getOrderStatusCounts(): Promise<ApiResponse<OrderStatusCount>> {
        const pending = mockOrder.filter(order => order.orderStatus === EOrderStatus.PENDING).length
        const preparing = mockOrder.filter(order => order.orderStatus === EOrderStatus.PREPARING).length
        const shipping = mockOrder.filter(order => order.orderStatus === EOrderStatus.SHIPPING).length
        const success = mockOrder.filter(order => order.orderStatus === EOrderStatus.SUCCESS).length
        const cancelled = mockOrder.filter(order => order.orderStatus === EOrderStatus.CANCELLED).length
        let statusCount: OrderStatusCount = {
            all: pending + preparing + shipping,
            pending,
            preparing,
            shipping,
            success,
            cancelled
        }
        return Promise.resolve({
            success: true,
            message: "Success",
            data: statusCount
        })
    }
}