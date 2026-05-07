import { useForm } from "react-hook-form";
import { AuthService } from "../../features/auth/services/auth.service";
import { AuthMockRepository } from "../../features/auth/repositories/authMock.repository";
import type { LoginRequest } from "../../features/auth/dto/login.type";

const authService = new AuthService(new AuthMockRepository());

export const useLoginController = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: LoginRequest) => {
    try {
      const success = await authService.login(data);
      if (success) {
        alert("Đăng nhập thành công!");
        // TODO: Navigate to home page
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", {
          type: "server",
          message: error.message,
        });
      } else {
        setError("root", {
          type: "server",
          message: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
        });
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onLogin,
  };
};