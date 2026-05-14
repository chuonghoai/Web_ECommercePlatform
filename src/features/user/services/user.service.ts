import type { ApiResponse } from "../../../core/api/apiResponse";
import type { UpdateProfileRequest, UploadAvatarResponse } from "../dto/updateProfile.type";
import type { WishlistResponse } from "../dto/wishlist.type";
import type { UserProfileResponse } from "../dto/getProfile.type";
import type { UserRepository } from "../repositories/user.repository";
import { UserMockRepository } from "../repositories/userMock.repository";

export class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository || new UserMockRepository();
    }

    async getProfile(): Promise<ApiResponse<UserProfileResponse>> {
        return this.userRepository.getProfile();
    }

    async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<null>> {
        return this.userRepository.updateProfile(data);
    }

    async uploadAvatar(file: File): Promise<ApiResponse<UploadAvatarResponse>> {
        return this.userRepository.uploadAvatar(file);
    }

    async getWishlist(page: number, limit: number): Promise<ApiResponse<WishlistResponse>> {
        return this.userRepository.getWishlist(page, limit);
    }
}
