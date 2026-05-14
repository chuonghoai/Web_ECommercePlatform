import type { ApiResponse } from "../../../core/api/apiResponse";

export interface CartRepository {
    addToCart(productId: string, quantity: number): Promise<ApiResponse<{ totalCartItems: number }>>;
}