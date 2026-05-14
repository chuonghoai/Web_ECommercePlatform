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

    /* 
    * Request: email, password
    * Response: accessToken, user: { userId, email, fullname, role}
    * Flow:
    *   - call API get ApiResponse.data
    *   - Save access token and user info to local storage (by tokenService and userStorageService)
    * Return: ApiResponse have data = null
    */
    async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        const result = await this.authRepository.login(data);

        userStorageService.setUser(result.data.user);

        return result;
    }

    /**
     * Request: email and purpose
     * Response: null
     */
    async sendOtp(email: string, purpose: OtpPurpose): Promise<ApiResponse<void>> {
        const result: ApiResponse<void> = {
            success: true,
            message: "Gửi OTP thành công",
            data: null
        };
        return result;
    }

    /**
     * Request: email, otp, password, confirmPassword
     * Response: accessToken, user: { userId, email, fullname, role}
     * Flow: like to login (save access token and user info to local storage)
     * Return: ApiResponse have data = null
     */
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

    /**
     * Delete all data token and user info in local storage
     * Request: null
     * Response: null
     */
    async logout(): Promise<ApiResponse<void>> {
        tokenService.clear();
        userStorageService.removeUser();

        return {
            success: true,
            message: "Đăng xuất thành công",
            data: null
        };
    }
}