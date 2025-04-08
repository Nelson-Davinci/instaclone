import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MetaArgs from "../../components/MetaArgs";
import { loginUser } from "../../api/auth";

export default function Register() {
  const [revealPassword, setRevealPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate(); // Use navigate hook to handle routing

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      if (res.status !== 200) {
        toast.success(res.data.message);
        setAccessToken(res.data.accessToken);
        navigate("/home");
    } 
    }catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <MetaArgs
        title="Login to InstaShots"
        content="Login to your InstaShots account"
      />
      <div>
        <form
          className="w-[90vw] md:w-[400px] border rounded-md border-[#A1A1A1] py-[40px] px-[28px] mb-10"
          onSubmit={handleSubmit(onSubmit)} // Attach the submit handler
        >
          <div className="flex justify-center mb-10">
            <Link to="/">
              <img src={logo} className="text-center" />
            </Link>
          </div>
          <div className="mb-4">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                placeholder="Username"
                className="input input-lg w-full"
                id="username"
                {...register("username")}
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
                  type={revealPassword ? "text" : "password"} // Toggle password visibility
                  placeholder="Password"
                  className="input input-lg w-full"
                  id="password"
                  {...register("password", {
                    validate: (value) => validatePassword(value, "Password is required"),
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

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 text-center">
            <Link to="/auth/forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="w-[90vw] md:w-[400px] border rounded-md border-[#A1A1A1] py-[15px] px-[28px] text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-purple-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
