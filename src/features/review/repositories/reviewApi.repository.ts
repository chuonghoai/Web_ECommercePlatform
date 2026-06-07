import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { Review, ReviewItem } from "../models/review.model";
import type { ReviewRepository } from "./review.repository";
import type { CreateReviewRequest, SubmitReviewResponse } from "../dto/createReview.request";

export class ReviewApiRepository implements ReviewRepository {
    /**
     * GET /products/{productId}/reviews
     * @param productId 
     * @returns Review
     */
    async getReviewsByProductId(productId: string): Promise<ApiResponse<Review>> {
        return apiClient.get<ApiResponse<Review>>(`/products/${productId}/reviews`);
    }

    /**
     * GET /reviews/{reviewId}
     * @param reviewId 
     * @returns ReviewItem
     */
    async getReviewById(reviewId: string): Promise<ApiResponse<ReviewItem>> {
        return apiClient.get<ApiResponse<ReviewItem>>(`/reviews/${reviewId}`);
    }

    /**
     * POST /reviews
     * @param request: CreateReviewRequest
     * @returns SubmitReviewResponse
     */
    async createReviews(request: CreateReviewRequest): Promise<ApiResponse<SubmitReviewResponse>> {
        return apiClient.post<ApiResponse<SubmitReviewResponse>>(`/reviews`, request);
    }
}