import type { ApiResponse } from "../../../core/api/apiResponse";
import type { CartRepository } from "./cart.repository";

export class CartMockRepository implements CartRepository {
    async addToCart(productId: string, quantity: number): Promise<ApiResponse<{ totalCartItems: number }>> {
        return {
            success: true,
            message: `Thêm ${productId} vào giỏ hàng thành công`,
            data: {
                totalCartItems: quantity
            }
        }
    }
}