import { Link } from "react-router";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { validateEmail, validatePassword, validateUsername, validateFullname } from "../../utils/formValidate";
import MetaArgs from "../../components/MetaArgs";


export default function Register() {
  const [revealPassword, setRevealPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  return (
    <>
      <MetaArgs title="Sign up to InstaShots" content="Get access to InstaShots" />
      <div>
        <form className="w-[90vw] md:w-[400px] border rounded-md border-[#A1A1A1] py-[40px] px-[28px] mb-10">
          <div className="flex justify-center mb-10">
            <Link to="/">
              <img src={logo} className="text-center" />
            </Link>
          </div>
          <div className="mb-4">
            <label className="floating-label">
              <span>Email</span>
              <input
                type="text"
                placeholder="Email"
                className="input input-lg w-full"
                id="email"
                {...register("email", {
                  validate: (value) => validateEmail(value),
                })}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="floating-label">
              <span>Full Name</span>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-lg w-full"
                id="fullname"
                {...register("fullname", {
                  validate: (value) => validateFullname(value),
                })}
              />
              {errors.fullname && (
                <span className="text-xs text-red-600">
                  {errors.fullname.message}
                </span>
              )}
            </label>
          </div>
          <div className=" mb-4">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                placeholder="Username"
                className="input input-lg w-full"
                id="username"
                {...register("username", {
                  validate: (value) => validateUsername(value),
                })}
              />
              {errors.username && (
                <span className="text-xs text-red-600">
                  {errors.username.message}
                </span>
              )}
            </label>
          </div>
          <div className="mb-4 relative">
            <label className="floating-label">
              <span>Password</span>
              <input
                type="text"
                placeholder="Password"
                className="input input-lg w-full"
                id="password"
                {...register("password", {
                  validate: (value) => validatePassword(value),
                })}
              />
            </label>
            <button
              className="absolute inset-y-0 right-2"
              onClick={togglePassword}
              type="button"
            >
              {revealPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          <div>
            <p>By signing up, you agree to our Term, data policy</p>
          </div>
        </form>

        <div className="w-[90vw] md:w-[400px] border rounded-md border-[#A1A1A1] py-[15px] px-[28px] text-center">
          <p>
            Already have an account?{" "}
            <Link to="auth/login" className="text-purple-600">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
