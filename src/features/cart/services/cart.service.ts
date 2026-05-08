import type { ApiResponse } from "../../../core/api/apiResponse";

export class CartService {
    /**
     * 
     * @param productId 
     * @param quantity 
     * @returns null
     */
    async addToCart(productId: string, quantity: number): Promise<ApiResponse<null>> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            success: true,
            message: `Thêm ${productId} vào giỏ hàng với số lượng ${quantity} thành công`,
            data: null
        }
    }
}

export const cartService = new CartService();