import { useEffect, useReducer, useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { reviewService } from "../../../features/review/services/review.service";
import { useToast } from "../../../components/toast/toast";
import type { OrderTrackingDetail } from "../../../features/order/tracking/model/orderDetail.model";

interface ReviewStateItem {
    productId: string;
    rating: number;
    comment: string;
}

type ReviewAction =
    | { type: "INIT"; items: ReviewStateItem[] }
    | { type: "SET_RATING"; productId: string; rating: number }
    | { type: "SET_COMMENT"; productId: string; comment: string };

const reviewReducer = (state: ReviewStateItem[], action: ReviewAction): ReviewStateItem[] => {
    switch (action.type) {
        case "INIT":
            return action.items;
        case "SET_RATING":
            return state.map((item) =>
                item.productId === action.productId ? { ...item, rating: action.rating } : item
            );
        case "SET_COMMENT":
            return state.map((item) =>
                item.productId === action.productId ? { ...item, comment: action.comment } : item
            );
        default:
            return state;
    }
};

export const useOrderEvaluateController = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();

    const order = location.state?.order as OrderTrackingDetail | undefined;

    const [reviews, dispatch] = useReducer(reviewReducer, []);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!order || !orderId) {
            navigate(`/profile/order/tracking/${orderId || ""}`, { replace: true });
            return;
        }

        const initialItems: ReviewStateItem[] = order.items
            .filter((item) => !item.isReviewed)
            .map((item) => ({
                productId: item.productId,
                rating: 0,
                comment: "",
            }));

        dispatch({ type: "INIT", items: initialItems });

        if (order.items.length > 0) {
            setSelectedProductId(order.items[0].productId);
        }
    }, [order, orderId, navigate]);

    const setRating = useCallback((productId: string, rating: number) => {
        dispatch({ type: "SET_RATING", productId, rating });
    }, []);

    const setComment = useCallback((productId: string, comment: string) => {
        dispatch({ type: "SET_COMMENT", productId, comment });
    }, []);

    const canSubmit = reviews.length > 0;

    const handleSubmit = async () => {
        if (!orderId || !canSubmit) return;

        // Validation
        const unrated = reviews.find((r) => r.rating === 0);
        if (unrated) {
            toast("Vui lòng chọn số sao cho tất cả các sản phẩm cần đánh giá", "warning");
            return;
        }

        const tooLong = reviews.find((r) => r.comment.length > 500);
        if (tooLong) {
            toast("Đánh giá không được vượt quá 500 ký tự", "warning");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await reviewService.createReviews({
                orderId,
                reviews: reviews.map((r) => ({
                    productId: r.productId,
                    rating: r.rating,
                    comment: r.comment.trim(),
                })),
            });

            if (response.success) {
                toast("Đánh giá sản phẩm thành công", "success");
                navigate(`/profile/order/tracking/${orderId}`, { replace: true });
            } else {
                toast(response.message || "Có lỗi xảy ra khi gửi đánh giá", "error");
            }
        } catch {
            toast("Có lỗi xảy ra khi gửi đánh giá", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        order,
        reviews,
        selectedProductId,
        setSelectedProductId,
        setRating,
        setComment,
        isSubmitting,
        canSubmit,
        handleSubmit,
    };
};
