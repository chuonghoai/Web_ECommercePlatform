import type { ApiResponse } from "../../../core/api/apiResponse";
import type { Review } from "../models/review.model";

export interface ReviewRepository {
    getReviewsByProductId(productId: string): Promise<ApiResponse<Review>>;
}