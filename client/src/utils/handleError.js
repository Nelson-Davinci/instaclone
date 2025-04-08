import {toast } from "sonner";

const handleError = (error) => {
    console.error(error);
    if(error.message === "Network Error") {
       return toast.error("Server is down, please try again in a moment", {
            id: "Network-Error",
        });
    }
    if(error) {
        return toast.error(
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data ||
            error?.message ||
            "An unexpected error has occurred",
            {id: "response-error"}
        );
    }
};

export default handleError; 