import { useForm } from "react-hook-form";
import { useAuth } from "../stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { primaryBtn } from "../styles/common";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();
  const formSubmit = async (userData) => {
    console.log(userData);
    await login(userData);
    console.log(isAuthenticated);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (currentUser.role === "USER") {
        toast.success("Loggedin Successfully");
        navigate("/user-profile");
      }
      if (currentUser.role === "AUTHOR") {
        toast.success("Loggedin Successfully");
        navigate("/author-profile");
      }
    }
  }, [isAuthenticated, currentUser]);

  return (
    <div className="border bg-slate-100 min-h-screen px-2 flex">
      <div className="bg-white w-full max-w-lg m-auto rounded-2xl flex flex-col gap-8">
        <h1 className="text-[clamp(40px,10vw,54px)] text-center font-bold pt-6">Login</h1>
        <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center gap-6 p-2 sm:p-4">
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            className="bg-gray-200 outline-none focus:bg-gray-300  px-3 py-2 rounded placeholder:font-medium w-full sm:w-80"
          />
          {errors.email?.message && <span style={{ color: "red", fontSize: "14px" }}>{errors.email.message}</span>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="bg-gray-200 outline-none focus:bg-gray-300  px-3 py-2 rounded placeholder:font-medium w-full sm:w-80"
          />
          {errors.password?.message && <span style={{ color: "red", fontSize: "14px" }}>{errors.password.message}</span>}
          <div className="text-[12px] font-medium">
            Don't have an Account? <span className="text-blue-600 cursor-pointer underline">Register</span>
          </div>
          <button type="submit" className={primaryBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
