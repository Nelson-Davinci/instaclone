import { toast } from "sonner";

const handleError = (error) => {
  console.error(error);

  // JWT expired
  if (error?.response?.data?.message === "jwt expired") {
    toast.error("Session expired. Logging you out.", { id: "logout" });

    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 1500);

    return;
  }

  // Network error
  if (error?.message === "Network Error") {
    return toast.error("Server is down. Please try again in a moment.", {
      id: "Network Error",
    });
  }

  // Generic error fallback
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

  toast.error(message);
};

export default handleError;