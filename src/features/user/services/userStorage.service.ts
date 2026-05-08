import { localStorageService } from "../../../core/storage/localStorage.service";
import type { User } from "../models/user.model";

class UserStorageService {
    setUser(user: User): void {
        localStorageService.set("user", user);
    }

    getUser(): User | null {
        return localStorageService.get<User>("user");
    }

    removeUser(): void {
        localStorageService.remove("user");
    }
}

export const userStorageService = new UserStorageService();