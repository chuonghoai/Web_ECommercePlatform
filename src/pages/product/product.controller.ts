import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../../components/toast/toast";
import { useProductStore } from "./product.store";

export const useProductController = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const store = useProductStore();

    // UI States
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [isTogglingFavorite, setIsTogglingFavorite] = useState<boolean>(false);
    const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);

    // Init pages - load product detail
    useEffect(() => {
        if (!id) {
            toast("Không tìm thấy mã sản phẩm", "error");
            navigate("/");
            return;
        }

        setIsLoading(true);
        store.loadProduct(id)
            .catch(() => {
                toast("Đã xảy ra lỗi khi tải sản phẩm", "error");
                navigate("/");
            })
            .finally(() => {
                setIsLoading(false);
            });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    // Control thumbnail slider (list product's images)
    const scrollThumbnails = (direction: "left" | "right") => {
        if (thumbnailContainerRef.current) {
            const scrollAmount = 200;
            thumbnailContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Handlers action in UI, delegate to store to call services
    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        try {
            await store.addToCart(quantity);
        } catch {
            toast("Lỗi kết nối. Vui lòng thử lại", "error");
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleToggleFavorite = async () => {
        setIsTogglingFavorite(true);
        try {
            await store.toggleFavorite();
        } catch {
            toast("Lỗi kết nối. Vui lòng thử lại", "error");
        } finally {
            setIsTogglingFavorite(false);
        }
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleIncreaseQuantity = () => {
        const maxStock = store.product?.stock ?? 1;
        setQuantity(prev => Math.min(maxStock, prev + 1));
    };

    return {
        // Data store
        product: store.product,

        // UI states
        isLoading,
        isAddingToCart,
        isTogglingFavorite,
        activeImgIndex,
        quantity,
        thumbnailContainerRef,

        // UI handlers
        setActiveImgIndex,
        scrollThumbnails,
        handleAddToCart,
        handleToggleFavorite,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
    };
};