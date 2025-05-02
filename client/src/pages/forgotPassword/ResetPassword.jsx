import logo from "../../assets/logo.png";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MetaArgs from "../../components/MetaArgs";
import { validatePassword } from "../../utils/formValidate";
import { toast } from "sonner";
import handleError from "../../utils/handleError";
import { resetPassword } from "../../api/auth";

export default function ResetPassword() {
  const [revealPassword, setRevealPassword] = useState(false); // Track password visibility state
  const { userId, passwordToken } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match", {
        id: "ResetPassword",
      });
      return;
    }
    try {
      const res = await resetPassword(userId, passwordToken, data);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/auth/login");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <MetaArgs
        title="Reset your Instashot Password"
        content="Reset password page"
      />
      <div className="w-[90%] md:w-[350px] border rounded-md border-[#A1A1A1] py-[20px] px-[28px] ">
        <div className="flex justify-center">
          <Link to="/">
            <img src={logo} className="text-center" />
          </Link>
        </div>
        <div className="text-center mt-4 mb-4 text-xl">
          <h1 className="font-bold text-xl"> Reset Password </h1>
        </div>
        {/* to reset password */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div classNam e="md:max-w-[400px] mx-auto mt-10 ">
            <div className="mb-4 relative">
              <label className="floating-label">
                <span>New Password</span>
                <input
                  type={revealPassword ? "text" : "password"} // Toggle password visibility
                  placeholder="New Password"
                  className="input input-lg w-full"
                  id="newPassword"
                  {...register("newPassword", {
                    validate: (value) =>
                      validatePassword(value, "New Password is required"),
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
              {errors.newPassword && (
                <span className="text-xs text-red-600">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            <div className="mb-4 relative">
              <label className="floating-label">
                <span>Confirm Password</span>
                <input
                  type={revealPassword ? "text" : "password"} // Toggle password visibility
                  placeholder="Confirm Password"
                  className="input input-lg w-full"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      validatePassword(value, "Confirm password is required"),
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
              {errors.confirmPassword && (
                <span className="text-xs text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              className="text-white mt-5 py-2 bg-[#8D0D76] rounded-[7px] border w-full md:max-w-[330px] h-[50px] text-center mb-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>

      <div>
        <button className="text-white mt-5 py-4 border border-[#A1A1A1] rounded-[7px] w-full md:w-[350px] h-[80px] text-center mb-10 ">
          <span className="text-black">
            Already have an account?
            <Link to="/auth/login" className="text-[#8D0D76] font-bold">
              {" "}
              Login
            </Link>
          </span>
          <br />
          <div className="mt-2 mb-2">
            <span className="text-black">
              New User?
              <Link to="/auth/register" className="text-[#8D0D76] font-bold">
                {" "}
                Sign Up
              </Link>
            </span>
          </div>
        </button>
      </div>
    </>
  );
}
