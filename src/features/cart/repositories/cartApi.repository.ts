import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { CartRepository } from "./cart.repository";

export class CartApiRepository implements CartRepository {
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