import { apiClient } from "../../../core/api/apiClient";
import type { AuthRepository } from "./auth.repository";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
import type { ResetPasswordRequest } from "../dto/forgotPassword.type";

export class AuthApiRepository implements AuthRepository {
    /**
     * POST /auth/login
     * @params 
     * @query
     * @body LoginRequest
     * @returns LoginResponse
     * Fix:
     *  - Bấm đăng nhập nhưng data trả về thiếu.....
     */
    async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        return apiClient.post<ApiResponse<LoginResponse>>("/auth/login", data);
    }

    /**
     * POST /auth/forgot-password
     * @params
     * @query
     * @body ForgotPasswordRequest
     * @returns void
     */
    async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>> {
        return apiClient.post<ApiResponse<void>>("/auth/forgot-password", data);
    }

    /**
     * POST /auth/forgot-password/reset
     * @params
     * @query
     * @body { email: string }
     * @returns void
     */
    async sendOtpForgotPassword(data: { email: string }): Promise<ApiResponse<void>> {
        return apiClient.post<ApiResponse<void>>("/auth/forgot-password/reset", data);
    }
}