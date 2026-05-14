import { apiClient } from "../../../core/api/apiClient";
import type { AuthRepository } from "./auth.repository";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
import type { ForgotPasswordRequest } from "../dto/forgotPassword.type";

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
    async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<void>> {
        return apiClient.post<ApiResponse<void>>("/auth/forgot-password", data);
    }
}