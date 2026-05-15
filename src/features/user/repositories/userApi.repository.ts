import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { UpdateProfileRequest } from "../dto/updateProfile.type";
import type { WishlistResponse } from "../models/wishlist.model";
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
     * GET /users/me/wishlist
     * @query page: number, pageSize: number
     * @returns ApiResponse<WishlistResponse>
     */
    async getWishlist(page: number, pageSize: number): Promise<ApiResponse<WishlistResponse>> {
        return apiClient.get<ApiResponse<WishlistResponse>>("/users/me/wishlist", {
            params: { page, pageSize },
        });
    }
}
