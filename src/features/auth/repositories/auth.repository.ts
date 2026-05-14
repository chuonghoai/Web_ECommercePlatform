import type { ApiResponse } from "../../../core/api/apiResponse";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
import type { ForgotPasswordRequest } from "../dto/forgotPassword.type";

export interface AuthRepository {
    login(data: LoginRequest): Promise<ApiResponse<LoginResponse>>;
    resetPassword(data: ForgotPasswordRequest): Promise<ApiResponse<void>>;
    sendOtpForgotPassword(data: {email: string}): Promise<ApiResponse<void>>;
}