import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { UpdateProfileRequest, UploadAvatarResponse } from "../dto/updateProfile.type";
import type { WishlistResponse } from "../dto/wishlist.type";
import type { UserProfileResponse } from "../dto/getProfile.type";
import type { UserRepository } from "./user.repository";

export class UserApiRepository implements UserRepository {
    /**
     * GET /users/me
     * @returns ApiResponse<UserProfileResponse>
     */
    async getProfile(): Promise<ApiResponse<UserProfileResponse>> {
        return apiClient.get<ApiResponse<UserProfileResponse>>("/users/me");
    }

    /**
     * PUT /users/me
     * @body UpdateProfileRequest
     * @returns ApiResponse<null>
     */
    async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<null>> {
        return apiClient.put<ApiResponse<null>>("/users/me", data);
    }

    /**
     * POST /users/me/avatar
     * @body FormData (file)
     * @returns ApiResponse<UploadAvatarResponse>
     */
    async uploadAvatar(file: File): Promise<ApiResponse<UploadAvatarResponse>> {
        const formData = new FormData();
        formData.append("file", file);
        return apiClient.post<ApiResponse<UploadAvatarResponse>>("/users/me/avatar", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }

    /**
     * GET /users/me/wishlist
     * @query page: number, limit: number
     * @returns ApiResponse<WishlistResponse>
     */
    async getWishlist(page: number, limit: number): Promise<ApiResponse<WishlistResponse>> {
        return apiClient.get<ApiResponse<WishlistResponse>>("/users/me/wishlist", {
            params: { page, limit },
        });
    }
}
