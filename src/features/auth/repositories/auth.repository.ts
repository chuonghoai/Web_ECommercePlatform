import type { ApiResponse } from "../../../core/api/apiResponse";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
import type { ResetPasswordRequest } from "../dto/forgotPassword.type";

export interface AuthRepository {
    login(data: LoginRequest): Promise<ApiResponse<LoginResponse>>;
    resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>>;
    sendOtpForgotPassword(data: {email: string}): Promise<ApiResponse<void>>;
    logout(): Promise<ApiResponse<null>>;
}