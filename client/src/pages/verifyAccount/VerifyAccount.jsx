import { useEffect, useState } from "react";
import { useAuth } from "../../store";
import { verifyEmailAccount } from "../../api/auth";
import handleError from "../../utils/handleError";

export default function VerifyAccount() {
    const [isSuccess, setIsSuccess] = useState(false);
    const {userId, verificationToken} = useParams();
    const {accessToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await verifyEmailAccount(
                    userId,
                    verificationToken,
                    accessToken
                );
                if (res.status === 200) {
                    setIsSuccess(res.data.success);
                    toast.success(res.data.message, {id: "verifySuccess"})
                }
            } catch (error) {
                handleError(error)
            }
        };
        verify();
    }, [accessToken, userId, verificationToken]);
  return (
    <div className="flex justify-center flex-col items-center min-h-screen gap-4">
        {isSuccess ? (
            <>
                <h1 className="text-2xl">
                    You have successfully verified your account
                </h1>
                <button className="btn bg-[#8D0D76] w-[250px] text-white" onClick={() => navigate("/")}>
                    Go Back
                </button>
            </>
        ) : (
            <>
                <h1 className="text-2xl mb-4 ">There was a problem verifying your account</h1>
                <button className="btn bg-[#8D0D76] w-[250px] text-white" onClick={() => navigate("/verify-email")}>
                    Go Back
                </button>
            </>
        )}
    </div>
  )
}
