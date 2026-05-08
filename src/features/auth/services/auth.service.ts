import type { ApiResponse } from "../../../core/api/apiResponse";
import { tokenService } from "../../../core/auth/token.service";
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

        tokenService.saveAccessToken(result.data.accessToken);

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
            success: false,
            message: "Đăng ký thành công",
            data: {
                accessToken: "mock_token_123",
            },
        }
        return {
            success: result.success,
            message: result.message,
            data: null
        };
    }
}