import { useLoginController } from "./login.controller";

function LoginPage() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onLogin
  } = useLoginController();

  return (
    <div style={{ padding: 24 }}>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit(onLogin)}>
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: "Email là bắt buộc" })}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
              minLength: { value: 3, message: "Mật khẩu phải ít nhất 3 ký tự" }
            })}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <br />

        {errors.root && (
          <div style={{ color: "red", marginBottom: "12px", fontWeight: "bold" }}>
            {errors.root.message}
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;