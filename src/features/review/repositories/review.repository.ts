import type { ApiResponse } from "../../../core/api/apiResponse";
import type { Review, ReviewItem } from "../models/review.model";
import type { CreateReviewRequest, SubmitReviewResponse } from "../dto/createReview.request";

export interface ReviewRepository {
    getReviewsByProductId(productId: string): Promise<ApiResponse<Review>>;
    getReviewById(reviewId: string): Promise<ApiResponse<ReviewItem>>;
    createReviews(request: CreateReviewRequest): Promise<ApiResponse<SubmitReviewResponse>>;
}