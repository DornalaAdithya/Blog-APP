import { useForm } from "react-hook-form";
import { useAuth } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { formCard, formTitle, inputClass, labelClass, linkClass, pageBackground, primaryBtn } from "../styles/common";
import toast from "react-hot-toast";
import { useEffect } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { login, isAuthenticated, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const formSubmit = async (userData) => {
    await login(userData);
  };

  useEffect(() => {
    if (isAuthenticated && isLoggingIn) {
      toast.success("Loggedin Successfully");
      navigate("/");
    }
  }, [isAuthenticated, isLoggingIn]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={`${pageBackground} flex items-center justify-center px-4 py-12`}>
      <div className={`${formCard} w-110 max-w-lg py-10`}>
        {/* Title */}
        <h2 className={formTitle}>Login</h2>

        <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-4">
          {/* EMAIL */}
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className={inputClass}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              className={inputClass}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* REGISTER LINK */}
          <p className="text-center text-sm text-[#6e6e73] mt-2">
            Don’t have an account?{" "}
            <span className={`${linkClass} underline cursor-pointer`} onClick={() => navigate("/register")}>
              Register
            </span>
          </p>

          {/* BUTTON */}
          <button type="submit" className={primaryBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
