import { tokenService } from "../../../core/auth/token.service";
import type { LoginRequest } from "../dto/login.type";
import type { AuthRepository } from "../repositories/auth.repository";
import { AuthApiRepository } from "../repositories/authApi.repository";

export class AuthService {
    private readonly authRepository: AuthRepository;

    constructor(authRepository?: AuthRepository) {
        this.authRepository = authRepository || new AuthApiRepository();
    }

    async login(data: LoginRequest) {
        const result = await this.authRepository.login(data);

        tokenService.saveAccessToken(result.data.accessToken);

        return true;
    }
}