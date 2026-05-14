export interface ForgotPasswordRequest {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

export interface SendOtpForgotPasswordRequest {
    email: string;
}
