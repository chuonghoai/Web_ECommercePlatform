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
    } catch (error: any) {
      const apiErrorMsg = error.response?.data?.error?.message 
                        || error.response?.data?.message 
                        || "Tài khoản hoặc mật khẩu không đúng";
      toast(apiErrorMsg, "error");
      setError("root", {
        type: "server",
        message: apiErrorMsg,
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