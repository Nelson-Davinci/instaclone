import { Navigate, useLocation } from "react-router";

export const PrivateRoutes = ({ children, accesToken, user }) => {
    const location = useLocation();
    if (!accesToken) {
        return (
            <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
        );
    }
    // if user is not verified
    if (user&& !user?.isVerified) {
        return <Navigate to="/verify-email" replace />
    }
    return children;
};

export const PublicRoutes = ({children, accessToken}) => {
    const location = useLocation();
    if (accessToken) {
        return <Navigate to={location.state?.from || "/"} />
    }
    return children;
}

export const VerifyRoutes = ({ children, accesToken, user }) => {
    const location = useLocation();
    if (!accesToken) {
        return (
            <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
        );
    }
    // if user is not verified
    if (user&& !user?.isVerified) {
        return <Navigate to={location.state?.from || "/"} replace />
    }
    return children;
};