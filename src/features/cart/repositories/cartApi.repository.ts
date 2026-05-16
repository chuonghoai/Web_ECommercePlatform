import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { CartItem } from "../dto/cartItem.type";
import type { CartRepository } from "./cart.repository";

export class CartApiRepository implements CartRepository {
    async getCartCount(): Promise<ApiResponse<{ totalCartItems: number }>> {
        return apiClient.get<ApiResponse<{ totalCartItems: number }>>("/cart/count");
    }

    async addToCart(productId: string, quantity: number): Promise<ApiResponse<{ totalCartItems: number }>> {
        return apiClient.post<ApiResponse<{ totalCartItems: number }>>("/cart/items", { productId, quantity });
    }

    async getCartItems(): Promise<ApiResponse<CartItem[]>> {
        return apiClient.get<ApiResponse<CartItem[]>>("/cart/items");
    }

    async updateQuantity(productId: string, quantity: number): Promise<ApiResponse<{ totalCartItems: number }>> {
        return apiClient.put<ApiResponse<{ totalCartItems: number }>>(`/cart/items/${productId}`, { quantity });
    }

    async removeFromCart(productId: string): Promise<ApiResponse<{ totalCartItems: number }>> {
        return apiClient.delete<ApiResponse<{ totalCartItems: number }>>(`/cart/items/${productId}`);
    }
}