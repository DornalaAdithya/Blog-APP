import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { formCard, formGroup, formTitle, inputClass, labelClass, loadingClass, pageBackground, primaryBtn } from "../styles/common.js";
import { errorClass } from "../styles/common.js";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSubmit = async (newUser) => {
    console.log(newUser);
    try {
      const { role, ...userObj } = newUser;
      console.log(userObj);
      if (role === "USER") {
        //make API req to user-api
        const resObj = await axios.post("http://localhost:4000/user-api/users", userObj);
        // console.log(resObj);
        // const res = resObj.data;
        // console.log(res);
        if (resObj.status === 201) {
          navigate("/login");
        }
      }
      if (role === "AUTHOR") {
        //make API req to user-api
        const resObj = await axios.post("http://localhost:4000/author-api/users", userObj);
        // const res = resObj.data;
        // console.log(res);
        if (resObj.status === 201) {
          navigate("/login");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
      reset();
    }
  };

  if (loading === true) {
    return <p className={loadingClass}>Loading</p>;
  }

  return (
    <div className={` ${pageBackground} flex justify-center py-10 sm:px-4`}>
      <div className={`${formCard}`}>
        <h2 className={formTitle}>Create Account</h2>
        {error && <p className={errorClass}>{error}</p>}
        <div className="text-center text-[14px] font-medium">
          Already have an an Account? <span className="text-blue-600 cursor-pointer underline">Login</span>
        </div>
        <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col">
          <div className="flex flex-wrap justify-center gap-3">
            <p className="font-medium text-sm mt-0.5">Select Role</p>
            {/* role */}
            <div className="flex gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  {...register("role", { required: "please select a role" })}
                  className="appearance-none 
                  w-3 h-3 border 
                  border-gray-500 
                  rounded-full 
                  checked:bg-blue-700 
                  checked:border-blue-700 
                  cursor-pointer"
                />{" "}
                <span className="text-sm">User</span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="AUTHOR"
                  {...register("role", { required: "please select a role" })}
                  className="appearance-none 
                  w-3 h-3 border 
                  border-gray-500 
                  rounded-full 
                  checked:bg-blue-700 
                  checked:border-blue-700 
                  cursor-pointer"
                />{" "}
                <span className="text-sm">Author</span>
              </label>
            </div>
          </div>
          {errors.role?.message && <span className="text-red-500 text-xs text-center">{errors.role.message}</span>}
          {/* input */}
          <div className={formGroup}>
            <label className={labelClass}>FirstName</label>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: "First name is Required",
                minLength: {
                  value: 4,
                  message: "minimum of 4 length is required",
                },
              })}
              className={inputClass}
            />
            {errors.firstName?.message && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>LastName</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last Name is Required",
                minLength: {
                  value: 4,
                  message: "minimum of 4 length is required",
                },
              })}
              className={inputClass}
            />
          </div>
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className={inputClass}
            />
            {errors.email?.message && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message: "Password must contain one uppercase letter and one special character",
                },
              })}
              className={inputClass}
            />
            {errors.password?.message && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>profile url</label>
            <input type="text" placeholder="profileurl" {...register("profileImageUrl")} className={inputClass} />
            {/* <input
            type="file"
            {...register("profileImageUrl")}
            className="text-xs px-2 py-1 rounded w-full sm:w-72
            file:mr-1
            file:rounded file:border-0
            file:bg-gray-900 file:text-white
            file:w-20 file:h-6 file:text-[12px]
            file:cursor-pointer
            hover:file:bg-gray-800"
          /> */}
            {/* {errors.profileImageUrl?.message && <span className="text-red-500 text-xs">{errors.profileImageUrl.message}</span>} */}
          </div>
          <button type="submit" className={primaryBtn}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
