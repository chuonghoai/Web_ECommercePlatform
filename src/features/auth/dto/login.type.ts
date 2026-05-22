import type { User } from "../../user/models/user.model";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: User;

    /**
     * Biến route được xử lý cục bộ ở frontend, backend không đụng đến field này
     */
    route?: string;
}