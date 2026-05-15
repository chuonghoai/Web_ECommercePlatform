import type { ApiResponse } from "../../../core/api/apiResponse";
import type { UpdateProfileRequest } from "../dto/updateProfile.type";
import type { WishlistResponse } from "../models/wishlist.model";
import type { UserProfileResponse } from "../dto/getProfile.type";

export interface UserRepository {
    getProfile(): Promise<ApiResponse<UserProfileResponse>>;
    updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<null>>;
    getWishlist(page: number, pageSize: number): Promise<ApiResponse<WishlistResponse>>;
}
