export interface Review {
    totalReview: number;
    averageRating: number;
    reviews: ReviewItem[];
}

export interface ReviewItem {
    reviewId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    content: string;
    createdAt: Date;
}