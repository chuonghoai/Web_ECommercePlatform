import { useForm } from "react-hook-form";
import type { RegisterRequest } from "../../../features/auth/dto/register.type";
import { AuthService } from "../../../features/auth/services/auth.service";

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

    const onSendOtp = () => {
        const email = getValues("email");
        if (!email) {
            setError("email", { type: "manual", message: "Vui lòng nhập email trước khi gửi mã OTP." });
            return;
        }

        clearErrors("email");
        alert(`Mã OTP đã được yêu cầu gửi đến email: ${email}`);
    };

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
    };
};