import type { ApiResponse } from "../../../core/api/apiResponse";
import { tokenService } from "../../../core/auth/token.service";
import { userStorageService } from "../../user/services/userStorage.service";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
import type { RegisterRequest } from "../dto/register.type";
import type { ForgotPasswordRequest } from "../dto/forgotPassword.type";
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
        const result: ApiResponse<LoginResponse> = {
            success: true,
            message: "Đăng ký thành công",
            data: {
                accessToken: "mock_token_123",
                user: {
                    id: "1",
                    email: "manggia098@gmail.com",
                    fullName: "manggia",
                    role: "USER",
                    avatarUrl: ""
                }
            },
        }
        userStorageService.setUser(result.data.user);

        return {
            success: result.success,
            message: result.message,
            data: null
        };
    }

    async logout(): Promise<ApiResponse<void>> {
        tokenService.clear();
        userStorageService.removeUser();

        return {
            success: true,
            message: "Đăng xuất thành công",
            data: null
        };
    }

    async sendOtpForgotPassword(email: string): Promise<ApiResponse<void>> {
        return this.authRepository.sendOtpForgotPassword({email});
    }

    async resetPassword(data: ForgotPasswordRequest): Promise<ApiResponse<void>> {
        return this.authRepository.resetPassword(data);
    }
}