import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDetail } from "../../features/products/models/productDetail.model";
import { useToast } from "../../components/toast/toast";
import { ProductService } from "../../features/products/services/product.service";
import { cartService } from "../../features/cart/services/cart.service";
import { FavoriteService } from "../../features/products/services/favorite.service";

const productService = new ProductService();
const favoriteService = new FavoriteService();

export const useProductStore = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [product, setProduct] = useState<ProductDetail | null>(null);

    // Fetch products
    const loadProduct = async (id: string) => {
        const response = await productService.getProductById(id);

        if (response.success && response.data) {
            setProduct(response.data);
            return true;
        } else {
            toast(response.message || "Sản phẩm không tồn tại", "error");
            navigate("/");
            return false;
        }
    };

    // Add to cart
    const addToCart = async (quantity: number): Promise<boolean> => {
        if (!product) return false;

        const response = await cartService.addToCart(product.id, quantity);

        if (response.success) {
            toast(`Thêm ${quantity} ${product.name} vào giỏ hàng thành công`, "success");
            return true;
        } else {
            toast(response.message || "Không thể thêm vào giỏ hàng", "error");
            return false;
        }
    };

    // Toggle favorite: add product to wishlist
    const toggleFavorite = async (): Promise<boolean> => {
        if (!product) return false;

        const response = await favoriteService.toggleFavorite(product.id);

        if (response.success) {
            setProduct(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
            toast(response.message, "success");
            return true;
        } else {
            toast(response.message || "Không thể thêm vào giỏ hàng", "error");
            return false;
        }
    };

    return {
        // Data
        product,

        // Actions call API
        loadProduct,
        addToCart,
        toggleFavorite,
    };
};
