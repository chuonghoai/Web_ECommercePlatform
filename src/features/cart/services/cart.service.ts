import type { ApiResponse } from "../../../core/api/apiResponse";
import type { CartRepository } from "../repositories/cart.repository";
import { CartApiRepository } from "../repositories/cartApi.repository";

export class CartService {
    private readonly cartRepository: CartRepository;

    private cartCount: number = 0;
    private listeners: Set<(count: number) => void> = new Set();

    constructor(cartRepository?: CartRepository) {
        this.cartRepository = cartRepository || new CartApiRepository();
    }

    // State manage cart count in header
    getCartCount(): number {
        return this.cartCount;
    }

    subscribe(listener: (count: number) => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.cartCount));
    }

    // Call api get cart count and sync with cartCount state
    async syncCartCount(): Promise<void> {
        try {
            const result = await this.cartRepository.getCartCount();
            if (result.success && result.data) {
                this.cartCount = result.data.totalCartItems;
                this.notifyListeners();
            }
        } catch (error) {
            console.error("Lỗi khi đồng bộ số lượng giỏ hàng:", error);
        }
    }

    // add product to user's cart
    async addToCart(productId: string, quantity: number): Promise<ApiResponse<null>> {
        const result = await this.cartRepository.addToCart(productId, quantity);

        if (result.success && result.data) {
            this.cartCount = result.data.totalCartItems;
            this.notifyListeners();
        }

        return {
            success: result.success,
            message: result.message,
            data: null
        }
    }
}

// export const cartService = new CartService();
export const cartService = new CartService();