import { useEffect, useState, useCallback } from "react";
import { AuthContext } from ".";
import useLocalStorage from "../hooks/useLocalStorage";
import { authenticateUser } from "../api/auth";
import { toast } from "sonner";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useLocalStorage(
    "instashotsToken",
    null
  );
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const handleLogout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    toast.success("You are logged out", {id: "logout"});
  }, [setAccessToken]); 

  useEffect(() => {
    const getUser = async () => {
      if(!accessToken) return;
        try {
            setIsCheckingAuth(true);
            const res = await authenticateUser(accessToken);
            if (res.status === 200) {
                setUser(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsCheckingAuth(false)
        }
    }
    getUser()
    }, [accessToken, handleLogout]);
    console.log(user);
    
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, isCheckingAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
