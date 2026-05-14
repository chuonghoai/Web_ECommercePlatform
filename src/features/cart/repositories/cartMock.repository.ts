import type { ApiResponse } from "../../../core/api/apiResponse";
import type { CartRepository } from "./cart.repository";

export class CartMockRepository implements CartRepository {
    private mockTotalItems = 20;

    async getCartCount(): Promise<ApiResponse<{ totalCartItems: number; }>> {
        return {
            success: true,
            message: "Lấy số lượng giỏ hàng thành công",
            data: {
                totalCartItems: this.mockTotalItems
            }
        }
    }

    async addToCart(productId: string, quantity: number): Promise<ApiResponse<{ totalCartItems: number }>> {
        this.mockTotalItems += quantity;

        return {
            success: true,
            message: `Thêm ${productId} vào giỏ hàng thành công`,
            data: {
                totalCartItems: this.mockTotalItems
            }
        }
    }
}