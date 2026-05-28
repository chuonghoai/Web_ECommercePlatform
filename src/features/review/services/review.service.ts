import type { ApiResponse } from "../../../core/api/apiResponse";
import { USE_MOCK } from "../../../core/config/useMock.config";
import type { Review } from "../models/review.model";
import type { ReviewRepository } from "../repositories/review.repository";
import { ReviewApiRepository } from "../repositories/reviewApi.repository";
import { ReviewMockRepository } from "../repositories/reviewMock.repository";

export class ReviewService {
    private readonly reviewRepository: ReviewRepository;
    constructor(reviewRepository?: ReviewRepository) {
        this.reviewRepository = reviewRepository || new ReviewApiRepository();
    }

    async getReviewsByProductId(productId: string): Promise<ApiResponse<Review>> {
        return this.reviewRepository.getReviewsByProductId(productId);
    }
}

export const reviewService = new ReviewService(USE_MOCK ? new ReviewMockRepository() : undefined);