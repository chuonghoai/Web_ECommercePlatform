import { apiClient } from "../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { EOrderStatus } from "../../../../features/order/enums/orderStatus.enum";
import type { OrderItem } from "../model/orderItem.model";
import type { OrderStatusCount } from "../model/orderStatusCount.model";
import type { OrderRepository } from "./order.repository";

export class OrderApiRepository implements OrderRepository {
    /**
     * GET /admin/order
     * @param status - Có thể null
     * @returns OrderItem[]
     * 
     * Mô tả:
     *  - Nếu truyền status -> lọc đơn hàng theo đúng status
     *  - Nếu không có status -> Lọc đơn hàng có status là PENDING, PREPARING, SHIPPING.
     *      Sắp xếp theo thứ tự PENDING -> PREPARING -> SHIPPING và giảm dần theo ngày tạo đơn hàng (createAt)
     */
    async getOrdersByStatus(status?: EOrderStatus): Promise<ApiResponse<OrderItem[]>> {
        return apiClient.get("/admin/order", {
            params: status
        })
    }

    /**
     * GET /admin/order/status-count
     * @returns OrderStatusCount
     * 
     * Mô tả:
     *  - Lấy số lượng đơn hàng theo từng trạng thái trong model OrderStatusCount
     *  - trong đó, all = pending + preparing + shipping 
     */
    async getOrderStatusCounts(): Promise<ApiResponse<OrderStatusCount>> {
        return apiClient.get("/admin/order/status-count")
    }
}