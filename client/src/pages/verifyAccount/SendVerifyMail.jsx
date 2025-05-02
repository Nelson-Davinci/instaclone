import { useAuth } from "../../store";
import { resendEmailVerifyLink } from "../../api/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import handleError from "../../utils/handleError";



export default function VerifyAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, accessToken, handleLogout } = useAuth();

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      handleLogout();
    }, 30 * 60 * 1000); // 30 minutes
    return () => clearTimeout(logoutTimer);
  }, [handleLogout]);

  const resendEmail = async () => {
    setIsSubmitting(true);
    try {
      const res = await resendEmailVerifyLink(accessToken);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      handleError(error);
      toast.error("There was an error sending the verification email" )
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col text-center">
      <h1 className="text-4xl font-bold">Hi, {user?.fullname}</h1>
      <p className="text-xl fontmedium mt-2">
        You have yet to verify your email
      </p>
      <p className="mb-4">
        Please click the button below to send a new verification email
      </p>

      <button
        type="submit"
        className="btn bg-[#8D0D76] w-[250px] text-white"
        disabled={isSubmitting}
        onClick={resendEmail}
      >
        {isSubmitting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Send new verification email"
        )}
      </button>

      <p className="mt-4 text-sm">
        If you have not received a verification mail, please check your
        spam/junk folder. You will be automatically logged out in 30mins if you
        have not verified your email
      </p>
    </div>
  );
}
