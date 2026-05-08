import type { ApiResponse } from "../../../core/api/apiResponse";
import type { LoginRequest, LoginResponse } from "../dto/login.type";

export interface AuthRepository {
    login(data: LoginRequest): Promise<ApiResponse<LoginResponse>>;
}