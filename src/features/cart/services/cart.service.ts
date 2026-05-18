import type { ApiResponse } from "../../../core/api/apiResponse";
import type { CartRepository } from "../repositories/cart.repository";
import { CartApiRepository } from "../repositories/cartApi.repository";
import { CartMockRepository } from "../repositories/cartMock.repository";
import type { CartItem } from "../models/cart-item.model";

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
        };
    }

    // Lấy toàn bộ danh sách giỏ hàng
    async getCartItems(): Promise<ApiResponse<CartItem[]>> {
        return this.cartRepository.getCartItems();
    }

    // Cập nhật số lượng
    async updateQuantity(productId: string, quantity: number): Promise<ApiResponse<null>> {
        const result = await this.cartRepository.updateQuantity(productId, quantity);
        if (result.success && result.data) {
            this.cartCount = result.data.totalCartItems;
            this.notifyListeners();
        }
        return { success: result.success, message: result.message, data: null };
    }

    // Xóa sản phẩm khỏi giỏ
    async removeFromCart(productId: string): Promise<ApiResponse<null>> {
        const result = await this.cartRepository.removeFromCart(productId);
        if (result.success && result.data) {
            this.cartCount = result.data.totalCartItems;
            this.notifyListeners();
        }
        return { success: result.success, message: result.message, data: null };
    }
}

/** Định dạng tiền VNĐ */
export const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    }).format(value);

/** Tính tổng (có thể tách ra khỏi context nếu muốn dùng trong nhiều chỗ) */
export const calcTotal = (items: CartItem[]) =>
    items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

const useMock = false; 
export const cartService = new CartService(
    useMock ? new CartMockRepository() : undefined
);