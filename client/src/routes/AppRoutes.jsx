import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { LazySpinner } from "../components/Spinner";
import Home from "../pages/home/Home";
import { useAuth } from "../store";
import { PrivateRoutes,VerifyRoutes, PublicRoutes  } from "./ProtectedRoutes";
import SendVerifyMail from "../pages/verifyAccount/SendVerifyMail";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import VerifyAccount from "../pages/verifyAccount/SendVerifyMail";
import ResetPassword from "../pages/forgotPassword/ResetPassword";
// import Explore from "../pages/explore/Explore";


const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const RootLayout = lazy(() => import("../layouts/RootLayout"))
const VerifyAccountLayout = lazy(() => import("../layouts/VerifyAccountLayout"))


export default function AppRoutes() {
  const {accessToken, isCheckingAuth, user} = useAuth();
  if (isCheckingAuth) {
    return <LazySpinner />;
  }
  const routes = [
    {
      path: "auth",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PublicRoutes accessToken={accessToken}/>
          <AuthLayout />
        </Suspense>
      ),
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password/:userId/:passwordToken",
          element: <ResetPassword />,

        }
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoutes accessToken={accessToken} user={user}/>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />
        }, 
        // {
        //   path: "explore",
        //   element: <Explore />
        // }
      ]
    },
    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <VerifyRoutes accessToken={accessToken} user={user}>
            <VerifyAccountLayout />
          </VerifyRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "verify-email",
          element: <SendVerifyMail />,
        },
        {
          path: "verify-email/:userId/:verificationToken",
          element: <VerifyAccount />
        }
      ]
    }
    
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
