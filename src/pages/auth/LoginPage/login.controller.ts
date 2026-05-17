import { useForm } from "react-hook-form";
import { authService } from "../../../features/auth/services/auth.service";
import type { LoginRequest } from "../../../features/auth/dto/login.type";
import { useToast } from "../../../components/toast/toast";
import { useNavigate } from "react-router-dom";

export const useLoginController = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
      const result = await authService.login(data);
      if (result.success) {
        toast("Đăng nhập thành công!", "success");
        navigate("/");
      }
    } catch (error: unknown) {
      toast("Đăng nhập thất bại!", "error");
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
    onLogin,
  };
};