import type { ApiResponse } from "../../../core/api/apiResponse";
import type { UpdateProfileRequest } from "../dto/updateProfile.type";
import type { WishlistResponse } from "../models/wishlist.model";
import type { UserProfileResponse } from "../dto/getProfile.type";
import type { UserRepository } from "../repositories/user.repository";
import { UserApiRepository } from "../repositories/userApi.repository";

export class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository || new UserApiRepository();
    }

    async getProfile(): Promise<ApiResponse<UserProfileResponse>> {
        return this.userRepository.getProfile();
    }

    async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<null>> {
        return this.userRepository.updateProfile(data);
    }


    async getWishlist(page: number, pageSize: number): Promise<ApiResponse<WishlistResponse>> {
        return this.userRepository.getWishlist(page, pageSize);
    }
}
