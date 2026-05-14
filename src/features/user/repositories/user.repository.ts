import type { ApiResponse } from "../../../core/api/apiResponse";
import type { UpdateProfileRequest, UploadAvatarResponse } from "../dto/updateProfile.type";
import type { WishlistResponse } from "../dto/wishlist.type";
import type { UserProfileResponse } from "../dto/getProfile.type";

export interface UserRepository {
    getProfile(): Promise<ApiResponse<UserProfileResponse>>;
    updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<null>>;
    uploadAvatar(file: File): Promise<ApiResponse<UploadAvatarResponse>>;
    getWishlist(page: number, limit: number): Promise<ApiResponse<WishlistResponse>>;
}
