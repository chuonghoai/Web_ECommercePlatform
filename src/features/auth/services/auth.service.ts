import type { ApiResponse } from "../../../core/api/apiResponse";
import { tokenService } from "../../../core/auth/token.service";
import { userStorageService } from "../../user/services/userStorage.service";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
import type { RegisterRequest } from "../dto/register.type";
import type { ResetPasswordRequest } from "../dto/forgotPassword.type";
import type { OtpPurpose } from "../enums/otpPurpose.enum";
import type { AuthRepository } from "../repositories/auth.repository";
import { AuthApiRepository } from "../repositories/authApi.repository";
import { AuthMockRepository } from "../repositories/authMock.repository";

export class AuthService {
    private readonly authRepository: AuthRepository;

    constructor(authRepository?: AuthRepository) {
        this.authRepository = authRepository || new AuthApiRepository();
    }

    async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        const result = await this.authRepository.login(data);

        if (result.success && result.data) {
            userStorageService.setUser(result.data.user);
            tokenService.saveAccessToken(result.data.accessToken);
        }

        return result;
    }

    async sendOtp(email: string, purpose: OtpPurpose): 
    Promise<ApiResponse<void>> {
        return this.authRepository.sendOtp(email, purpose);
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

    async sendOtpForgotPassword(email: string): Promise<ApiResponse<void>> {
        return this.authRepository.sendOtpForgotPassword({email});
    }

    async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>> {
        return this.authRepository.resetPassword(data);
    }
}

// Bật useMock = true để chạy giao diện không cần Backend
const useMock = true;
export const authService = new AuthService(
    useMock ? new AuthMockRepository() : undefined
);