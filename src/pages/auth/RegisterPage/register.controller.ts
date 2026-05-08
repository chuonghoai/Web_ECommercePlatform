import { useForm } from "react-hook-form";
import type { RegisterRequest } from "../../../features/auth/dto/register.type";
import { AuthService } from "../../../features/auth/services/auth.service";
import { useEffect, useState } from "react";
import { OtpPurpose } from "../../../features/auth/enums/otpPurpose.enum";

const authService = new AuthService();

export const useRegisterController = () => {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterRequest>({
        defaultValues: {
            email: "",
            otp: "",
            password: "",
            confirmPassword: "",
        },
    });

    const currentPassword = watch("password");
    const [otpCountdown, setOtpCountdown] = useState(0);
    const [isSendingOtp, setIsSendingOtp] = useState(false);

    // Handle countdown of OTP
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (otpCountdown > 0) {
            timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [otpCountdown]);

    // API send OTP with purpose is register
    const onSendOtp = async () => {
        const email = getValues("email");

        if (!email) {
            setError("email", { type: "manual", message: "Vui lòng nhập email trước khi gửi mã OTP." });
            return;
        }
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            setError("email", { type: "manual", message: "Email không hợp lệ." });
            return;
        }
        clearErrors("email");
        setIsSendingOtp(true);

        try {
            setOtpCountdown(30);
            const result = await authService.sendOtp(email, OtpPurpose.REGISTER);
            if (result.success) {
                alert(`Mã OTP đã được yêu cầu gửi đến email: ${email}`);
                // TODO
            } else {
                setOtpCountdown(0);
                setError("email", { type: "manual", message: result.message });
            }
        } catch (error: unknown) {
            setOtpCountdown(0);
            setError("root", {
                type: "server",
                message: error instanceof Error ? error.message : "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
            });
        } finally {
            setIsSendingOtp(false);
        }
    };

    // API register new account
    const onRegister = async (data: RegisterRequest) => {
        try {
            const result = await authService.register(data);

            if (result.success) {
                alert("Đăng ký thành công! Chuyển hướng đến trang chủ...");
                // TODO: Navigate to home page
            } else {
                alert(result.message);
            }
        } catch (error: unknown) {
            setError("root", {
                type: "server",
                message: error instanceof Error ? error.message : "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
            });
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSendOtp,
        onRegister,
        currentPassword,
        otpCountdown,
        isSendingOtp,
    };
};