import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  formCard,
  formGroup,
  formTitle,
  inputClass,
  labelClass,
  linkClass,
  loadingClass,
  pageBackground,
  primaryBtn,
} from "../styles/common.js";
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
  const [preview, setPreview] = useState(null);

  //form submission
  const formSubmit = async (newUser) => {
    // console.log(newUser);
    // Create form data object
    const formData = new FormData();
    //get user object
    let { role, profileImageUrl, ...userObj } = newUser;
    //add all fields except profilePic to FormData object
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    // add profilePic to Formdata object
    formData.append("profileImageUrl", profileImageUrl[0]);
    try {
      // console.log(userObj);
      if (role === "USER") {
        //make API req to user-api
        const resObj = await axios.post("/user-api/users", formData);
        // console.log(resObj);
        // const res = resObj.data;
        // console.log(res);
        if (resObj.status === 201) {
          navigate("/login");
        }
      }
      if (role === "AUTHOR") {
        //make API req to user-api
        const resObj = await axios.post("/author-api/users", formData);
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

  //runs after file is selected
  const onFileSelect = (e) => {
    //get image file
    const file = e.target.files[0];
    // validation for image format
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Only JPG or PNG allowed");
        return;
      }
      //validation for file size
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB");
        return;
      }
      //Converts file → temporary browser URL(create preview URL)
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setError(null);
    }
  };

  //cleanup (remove preview image from browser memory)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading === true) {
    return <p className={loadingClass}>Loading</p>;
  }

  return (
    <div className={`${pageBackground} flex items-center justify-center px-4 py-12`}>
      <div className={`${formCard} w-full max-w-lg py-8`}>
        {/* Title */}
        <h2 className={formTitle}>Create Account</h2>

        {/* Error */}
        {error && <p className={`${errorClass} mb-3`}>{error}</p>}

        {/* Login Redirect */}
        <p className="text-center text-sm text-[#6e6e73] mb-2">
          Already have an account?{" "}
          <span className={`${linkClass} underline cursor-pointer`} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

        <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-3">
          {/* ROLE SELECT */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-[#1d1d1f]">Select Role</p>

            <div className="flex gap-3">
              {["USER", "AUTHOR"].map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#d2d2d7] cursor-pointer hover:bg-[#ebebf0] transition"
                >
                  <input
                    type="radio"
                    value={role}
                    {...register("role", { required: "Please select a role" })}
                    className="accent-[#0066cc]"
                  />
                  <span className="text-sm">{role}</span>
                </label>
              ))}
            </div>

            {errors.role?.message && <span className="text-red-500 text-xs">{errors.role.message}</span>}
          </div>

          {/* NAME FIELDS */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={labelClass}>First Name</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 4, message: "Minimum 4 characters" },
                })}
                placeholder="firstname"
                className={inputClass}
              />
              {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
            </div>

            <div className="flex-1">
              <label className={labelClass}>Last Name</label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 4, message: "Minimum 4 characters" },
                })}
                placeholder="lastname"
                className={inputClass}
              />
            </div>
          </div>

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
                  message: "Invalid email",
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
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message: "Must contain uppercase & special char",
                },
              })}
              className={inputClass}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* PROFILE UPLOAD */}
          <div>
            <label className={labelClass}>Upload Profile</label>
            <input type="file" accept="image/png, image/jpeg" {...register("profileImageUrl")} onChange={onFileSelect} />
            {preview && (
              <div className="mt-3 flex justify-center">
                <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-full border" />
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button type="submit" className={`${primaryBtn} mt-2 cursor-pointer`}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
