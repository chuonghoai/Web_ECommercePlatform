import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../../features/products/services/product.service";
import type { ProductDetail } from "../../features/products/models/productDetail.model";
import { useToast } from "../../components/toast/toast";

export const useProductController = () => {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const { toast } = useToast();

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    return {
        product,
        isLoading
    };
};