import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../../features/products/services/product.service";
import type { ProductDetail } from "../../features/products/models/productDetail.model";
import { useToast } from "../../components/toast/toast";
import { useCart } from "../../features/cart/contexts/CartProvider";
import { cartService } from "../../features/cart/services/cart.service";

export const useProductController = () => {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const { toast } = useToast();
    const { incrementCart } = useCart();

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

    useEffect(() => {
        const fetchProductDetail = async () => {
            if (!id) {
                toast("Không tìm thấy mã sản phẩm", "error");
                navigate("/");
                return;
            }

            setIsLoading(true);
            try {
                const response = await productService.getProductById(id);

                if (response.success && response.data) {
                    setProduct(response.data);
                } else {
                    toast(response.message || "Sản phẩm không tồn tại", "error");
                    navigate("/");
                }
            } catch (error) {
                toast("Đã xảy ra lỗi khi tải sản phẩm", "error");
                navigate("/");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetail();

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id, navigate, toast]);

    const handleAddToCart = async (quantity: number) => {
        if (!product) return;

        setIsAddingToCart(true);
        try {
            const response = await cartService.addToCart(product.id, quantity);

            if (response.success) {
                incrementCart(quantity);
                toast(`Thêm ${quantity} ${product.name} vào giỏ hàng thành công`, "success");
            } else {
                toast(response.message || "Không thể thêm vào giỏ hàng", "error");
            }
        } catch (error) {
            toast("Lỗi kết nối. Vui lòng thử lại", "error");
        } finally {
            setIsAddingToCart(false);
        }
    };

    return {
        product,
        isLoading,
        isAddingToCart,
        handleAddToCart
    };
};