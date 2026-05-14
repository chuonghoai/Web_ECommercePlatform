import type { ApiResponse } from "../../../core/api/apiResponse";
import { UnauthorizedException } from "../../../core/exceptions/unauthorized.exception";
import type { LoginRequest, LoginResponse } from "../dto/login.type";
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

    async logout(): Promise<ApiResponse<null>> {
        return {
            success: true,
            message: "Đăng xuất thành công",
            data: null,
        };
    }
}