import type { ApiResponse } from "../../../core/api/apiResponse";
import type { Review } from "../models/review.model";
import type { ReviewRepository } from "../repositories/review.repository";
import { ReviewApiRepository } from "../repositories/reviewApi.repository";

export class ReviewService {
    private readonly reviewRepository: ReviewRepository;
    constructor(reviewRepository?: ReviewRepository) {
        this.reviewRepository = reviewRepository || new ReviewApiRepository();
    }

    async getReviewsByProductId(productId: string): Promise<ApiResponse<Review>> {
        return this.reviewRepository.getReviewsByProductId(productId);
    }
}

export const reviewService = new ReviewService();