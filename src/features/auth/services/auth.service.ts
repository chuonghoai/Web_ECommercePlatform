import type { ApiResponse } from "../../../core/api/apiResponse";
import { tokenService } from "../../../core/auth/token.service";
import { userStorageService } from "../../user/services/userStorage.service";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
import type { RegisterRequest } from "../dto/register.type";
import type { OtpPurpose } from "../enums/otpPurpose.enum";
import type { AuthRepository } from "../repositories/auth.repository";
import { AuthApiRepository } from "../repositories/authApi.repository";

export class AuthService {
    private readonly authRepository: AuthRepository;

    constructor(authRepository?: AuthRepository) {
        this.authRepository = authRepository || new AuthApiRepository();
    }

    async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        const result = await this.authRepository.login(data);

        userStorageService.setUser(result.data.user);

        return result;
    }

    async sendOtp(email: string, purpose: OtpPurpose): Promise<ApiResponse<void>> {
        const result: ApiResponse<void> = {
            success: true,
            message: "Gửi OTP thành công",
            data: null
        };
        return result;
    }

    async register(data: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
        // Call the repository (which will perform the real API request)
        const result = await this.authRepository.register(data);
        // If the request succeeded and we have data, store token and user info
        if (result.success && result.data) {
            userStorageService.setUser(result.data.user);
            tokenService.saveAccessToken(result.data.accessToken);
        }
        return result;
    }

    async logout(): Promise<ApiResponse<void>> {
        tokenService.clear();
        userStorageService.removeUser();
        const result = this.authRepository.logout();
        return result;
    }
}