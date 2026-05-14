import type { ApiResponse } from "../../../core/api/apiResponse";
import { UnauthorizedException } from "../../../core/exceptions/unauthorized.exception";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
import type { ResetPasswordRequest } from "../dto/forgotPassword.type";
import type { AuthRepository } from "./auth.repository";

export class AuthMockRepository implements AuthRepository {
    async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        if (data.email === "111" && data.password === "111") {
            return {
                success: true,
                message: "Đăng nhập thành công",
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
            };
        }

        throw new UnauthorizedException("Sai email hoặc mật khẩu");
    }

    async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>> {
    const { otp } = data;

    if (!/^\d+$/.test(otp)) {
        throw new Error("OTP chỉ được chứa số.");
    }
    if (otp.length !== 6) {
        throw new Error("OTP phải đủ 6 chữ số.");
    }
    if (otp !== "123456") {
        throw new Error("Mã OTP không đúng hoặc đã hết hạn.");
    }
    return {
        success: true,
        message: "Đặt lại mật khẩu thành công",
        data: null,
    };
}

    async sendOtpForgotPassword(data: {email: string}): Promise<ApiResponse<void>> {
        return {
            success: true,
            message: "Mã OTP đã được gửi đến email của bạn",
            data: null,
        };
    }
}