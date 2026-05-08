export const EUserRole = {
    ADMIN: "ADMIN",
    USER: "USER"
} as const;
export type UserRole = (typeof EUserRole)[keyof typeof EUserRole];

export class User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    avatarUrl?: string;
}