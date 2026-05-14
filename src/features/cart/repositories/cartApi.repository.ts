import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { CartRepository } from "./cart.repository";

export class CartApiRepository implements CartRepository {
    /**
     * GET /cart/count
     * @returns totalCartItems
     */
    async getCartCount(): Promise<ApiResponse<{ totalCartItems: number }>> {
        return apiClient.get<ApiResponse<{ totalCartItems: number }>>("/cart/count");
    }

    /**
     * POST /cart/items
     * @body productId 
     * @body quantity 
     * @returns totalCartItems
     */
    async addToCart(productId: string, quantity: number): Promise<ApiResponse<{ totalCartItems: number }>> {
        return apiClient.post<ApiResponse<{ totalCartItems: number }>>("/cart/items", {
            productId,
            quantity
        })
    }
}