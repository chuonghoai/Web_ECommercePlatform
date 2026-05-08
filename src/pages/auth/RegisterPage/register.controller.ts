import { useForm } from "react-hook-form";
import type { RegisterFormInputs } from "../../../features/auth/dto/register.type";

export const useRegisterController = () => {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>({
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

    const onRegister = async (data: RegisterFormInputs) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log("Thông tin đăng ký:", data);
            alert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");

        } catch (error) {
            setError("root", {
                type: "server",
                message: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
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