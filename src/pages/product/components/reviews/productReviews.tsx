import { useReviewController } from "./review.controller";

interface ProductReviewsProps {
    productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
    const { reviewData, isLoading } = useReviewController(productId);

    const StarIcon = ({ isFilled }: { isFilled: boolean }) => (
        <svg
            className={`w-[14px] h-[14px] shrink-0 ${isFilled ? "fill-current" : "text-[#E7E5E4] fill-current"}`}
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
        </svg>
    );

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-8 mt-16 pt-16 border-t border-[#E7E5E4]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-8 border-b border-[#E7E5E4] gap-6 md:gap-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="h-8 bg-[#F5F5F4] rounded w-[200px]" />
                        <div className="h-[76px] bg-[#F5F5F4] rounded-[8px] w-[200px]" />
                    </div>
                    <div className="h-5 bg-[#F5F5F4] rounded w-[100px]" />
                </div>
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-5 border-2 border-dotted border-[#E7E5E4] p-6 rounded-[12px]">
                            <div className="w-12 h-12 rounded-full bg-[#F5F5F4] shrink-0" />
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E7E5E4]/50">
                                    <div className="h-4 bg-[#F5F5F4] rounded w-[150px]" />
                                    <div className="h-4 bg-[#F5F5F4] rounded w-[80px]" />
                                </div>
                                <div className="h-4 bg-[#F5F5F4] rounded w-full" />
                                <div className="h-4 bg-[#F5F5F4] rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!reviewData || reviewData.reviews.length === 0) {
        return (
            <div className="mt-16 pt-16 border-t border-[#E7E5E4]">
                <h3 className="font-['Lora',serif] text-[28px] font-medium text-[#1C1917] mb-6">
                    Đánh giá sản phẩm
                </h3>
                <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] p-8 text-center text-[#57534E]">
                    Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên trải nghiệm nhé!
                </div>
            </div>
        );
    }

    return (
        <div className="mt-16 pt-16 border-t border-[#E7E5E4] font-['Open_Sans',sans-serif]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-8 border-b border-[#E7E5E4] gap-6 md:gap-0">
                {/* Title and Avg Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <h3 className="font-['Lora',serif] text-[28px] font-medium text-[#1C1917] m-0">
                        Đánh giá sản phẩm
                    </h3>
                    {/* Average rating */}
                    <div className="flex items-center gap-3.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[8px] p-4 pr-5 shadow-sm">
                        <span className="text-[32px] font-medium text-[#1C1917] font-['Lora',serif] leading-none m-0">
                            {reviewData.averageRating.toFixed(1)}
                        </span>

                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const fillPercentage = Math.max(
                                    0,
                                    Math.min(100, (reviewData.averageRating - (star - 1)) * 100)
                                );

                                return (
                                    <div key={star} className="relative w-5 h-5">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="absolute inset-0 w-full h-full text-gray-300"
                                            fill="currentColor"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                        <div
                                            className="absolute inset-0 overflow-hidden"
                                            style={{ width: `${fillPercentage}%` }}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5 text-[#D97706]"
                                                fill="currentColor"
                                            >
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* Total Review Count */}
                <span className="text-[14px] font-medium text-[#78716C] uppercase tracking-wider">
                    {reviewData.totalReview} đánh giá
                </span>
            </div>

            {/* Review List */}
            <div className="flex flex-col gap-8">
                {reviewData.reviews.map((review) => (
                    <div
                        key={review.reviewId}
                        className="flex flex-col sm:flex-row gap-5 border-2 border-dotted border-[#E7E5E4] p-6 rounded-[12px] bg-white transition-transform duration-300 hover:scale-[1.01]"
                    >
                        <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:w-32 sm:shrink-0 sm:pt-1">
                            <img
                                src={review.userAvatar || `https://ui-avatars.com/api/?name=${review.userName}&background=F5F5F4&color=1C1917`}
                                alt={review.userName}
                                className="w-12 h-12 rounded-full object-cover border border-[#E7E5E4] shrink-0"
                            />
                            <div className="flex flex-col gap-0.5 w-full">
                                <span className="font-semibold text-[15px] text-[#1C1917]">{review.userName}</span>
                                <div className="flex items-center gap-1.5 text-[#D97706]">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon key={star} isFilled={star <= review.rating} />
                                        ))}
                                    </div>
                                    <span className="text-[13px] text-[#A8A29E] sm:hidden">
                                        • {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <span className="text-[13px] text-[#A8A29E] hidden sm:inline mt-1.5 pt-1.5 border-t border-[#E7E5E4]/50">
                                    {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 pt-1 sm:border-l sm:pl-6 sm:border-[#E7E5E4]">
                            <p className="text-[15px] text-[#57534E] leading-relaxed whitespace-pre-line m-0">
                                {review.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};