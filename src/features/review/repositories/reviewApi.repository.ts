import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { Review } from "../models/review.model";
import type { ReviewRepository } from "./review.repository";

export class ReviewApiRepository implements ReviewRepository {
    /**
     * GET /reviews/{productId}
     * @param productId 
     * @returns Review
     */
    async getReviewsByProductId(productId: string): Promise<ApiResponse<Review>> {
        return apiClient.get<ApiResponse<Review>>(`/reviews/${productId}`);
    }
}