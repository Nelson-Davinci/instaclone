import { Navigate, useLocation } from "react-router";

export const PrivateRoutes = ({ children, accessToken, user }) => {
  const location = useLocation();

  // if user is not logged in
  if (!accessToken) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }
  // if user is not verified
  if (user && !user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

export const PublicRoutes = ({ children, accessToken }) => {
  const location = useLocation();
  if (accessToken) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }
  return children;
};

export const VerifyRoutes = ({ children, accessToken, user }) => {
  const location = useLocation();
  if (!accessToken) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }
  // if user is already verified
  if (user && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
