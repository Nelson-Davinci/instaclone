import axiosInstance from "../utils/axiosInstance";

export const registerUser = async (formData) => {
  return await axiosInstance.post("/auth/register", formData);
};

export const loginUser = async (formData) => {
  return await axiosInstance.post("/auth/login", formData);
};

export const authenticateUser = async (token) => {
  return await axiosInstance.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const resendEmailVerifyLink = async () => {
  return await axiosInstance.post(
    "/auth/resend-verification",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const verifyEmailAccount = async (userId, verificationToken, Token) => {
  return await axiosInstance.patch(
    `/auth/verify-account/${userId}/${verificationToken}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );
};

export const sendForgotPasswordmail = async (formData) => {
  return await axiosInstance.post("/auth/sendforgot-password-mail", formData);
};

export const resetPassword = async (userId, verificationToken, Token) => {
  return await axiosInstance.patch(
    `/auth/verify-account/${userId}/${verificationToken}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );
};
