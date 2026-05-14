import type { ApiResponse } from "../../../core/api/apiResponse";

export interface CartRepository {
    getCartCount(): Promise<ApiResponse<{ totalCartItems: number }>>;
    addToCart(productId: string, quantity: number): Promise<ApiResponse<{ totalCartItems: number }>>;
}