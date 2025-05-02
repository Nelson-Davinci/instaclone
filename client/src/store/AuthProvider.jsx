import { useEffect, useState, useCallback } from "react";
import { AuthContext } from ".";
import useLocalStorage from "../hooks/useLocalStorage";
import { authenticateUser, logout } from "../api/auth";
import { toast } from "sonner";
import handleError from "../utils/handleError";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useLocalStorage("instashotToken", null);
  const [user, setUser] = useState(null);

  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        toast.success(res.data.message, { id: "logout" });
        setAccessToken(null);
        setUser(null);
        window.location.reload();
      }
    } catch (error) {
      toast.error("There was an error trying to log you out");
      console.error(error);
    }
  }, [setAccessToken]);

  useEffect(() => {
    if (!accessToken) return;

    const getUser = async () => {
      try {
        setIsCheckingAuth(true);

        const res = await authenticateUser(accessToken);

        if (res.status === 200) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error(error);
        toast.error("There was an error trying to authenticate you");
        handleLogout();

      } finally {
        setIsCheckingAuth(false);
      }
    };
    getUser();
  }, [accessToken, handleLogout]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        isCheckingAuth,
        handleLogout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
