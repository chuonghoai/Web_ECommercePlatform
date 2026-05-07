import type { ApiResponse } from "../../../core/api/apiResponse";
import { UnauthorizedException } from "../../../core/exceptions/unauthorized.exception";
import type {
    LoginRequest,
    LoginResponse,
} from "../dto/login.type";
import type { AuthRepository } from "./auth.repository";

export class AuthMockRepository implements AuthRepository {
    async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        const { email, password } = data;

        if (email === "111" && password === "111") {
            return {
                success: true,
                message: "Đăng nhập thành công",
                data: {
                    accessToken: "mock_token_123",
                },
            };
        }

        throw new UnauthorizedException("Sai email hoặc mật khẩu");
    }
}