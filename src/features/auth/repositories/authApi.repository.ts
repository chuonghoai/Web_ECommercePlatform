import { apiClient } from "../../../core/api/apiClient";
import type { AuthRepository } from "./auth.repository";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { LoginRequest, LoginResponse } from "../dto/login.type";

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
}