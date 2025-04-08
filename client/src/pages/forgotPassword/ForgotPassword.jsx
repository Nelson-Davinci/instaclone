import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
// this is done to validate input field from cdn hook form.
import { useState } from "react";
// this is for the password visibility
import MetaArgs from "../../components/MetaArgs";
import { validateEmail } from "../../utils/formValidate";
import handleError from "../../utils/handleError";
import { sendForgotPasswordmail } from "../../api/auth";
import {toast} from "sonner";



export default function ForgotPassword() {
  const [revealPassword, setRevealPassword] = useState(false); // Track password visibility state
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await sendForgotPasswordmail(data);
      if (res.status === 200) {
        toast.success(res.data.message)
      }
    } catch (error) {
      handleError(error)
    }
  }


  //   this is to validate the text input we are designing, it is for the form in the  register page.
  // Function to toggle password visibility
  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  return (
    <>
      <MetaArgs
        title="Sign up to InstaShots"
        content="Get access to InstaShots"
      />
      <div className="w-[90%] md:w-[350px] border rounded-md border-[#A1A1A1] py-[20px] px-[28px] ">
        <div className="flex justify-center mb-10">
            <Link to="/">
                <img src={logo} className="text-center" />
            </Link>     
        </div>
        <div className="text-center mt-4 mb-4 text-xl">
          <h1 className="font-bold text-[#8D0D76]"> Forgot Password</h1>
        </div>
        {/* for the forgotten password */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:max-w-[400px] mx-auto mt-10 ">
            <label className="floating-label">
              <span>Email</span>
              <input
                type="text"
                placeholder="Enter Email"
                className="input input-lg"
                id="Email"
                // the form was gotten from the previous project, it is majorly for the text area.
                {...register("email", {
                  validate: (value) => validateEmail(value),
                })}
                // the above is for validating the email
              />
            </label>
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="md:max-w-[400px] mx-auto ">
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <button className="text-white mt-5 py-2 bg-[#8D0D76] rounded-[7px] border w-full md:max-w-[330px] h-[50px] text-center mb-2">
              {isSubmitting ? (<span className="loading loading-spinner"></span>) : ("Recover")}
            </button>
          </div>
        </form>
      </div>
      <div>
        <button className="text-white mt-5 py-4 border border-[#A1A1A1] rounded-[7px] w-full md:w-[350px] h-[80px] text-center mb-10 ">
          <span className="text-black">
            Already have an account?
            <Link to="/auth/login" className="text-[#8D0D76] font-bold"> Login</Link>
          </span>
          <br />
          <div className="mt-2 mb-2">
            <span className="text-black">
              New User?<Link to="/auth/register" className="text-[#8D0D76] font-bold"> Sign Up</Link>
            </span>
          </div>
        </button>
      </div>
    </>
  );
}

// LAZY LOADING AND CODE SPLITING: are performance technique that work together to improve web application speed