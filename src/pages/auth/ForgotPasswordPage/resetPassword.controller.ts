import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthService } from "../../../features/auth/services/auth.service";
import type { ForgotPasswordRequest } from "../../../features/auth/dto/forgotPassword.type";
import { useToast } from "../../../components/toast/toast";
import { AuthMockRepository } from "../../../features/auth/repositories/authMock.repository";

const authService = new AuthService(new AuthMockRepository());

export const useResetPasswordController = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const email: string = location.state?.email ?? "";

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordRequest>({
        defaultValues: {
            email,
            otp: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const currentPassword = watch("newPassword");

    const onResetPassword = async (data: ForgotPasswordRequest) => {
        try {
            const result = await authService.forgotPassword({ ...data, email });
            if (result.success) {
                toast("Đặt lại mật khẩu thành công! Vui lòng đăng nhập.", "success");
                navigate("/login");
            } else {
                toast(result.message, "error");
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
        onResetPassword,
        currentPassword,
        email,
    };
};
