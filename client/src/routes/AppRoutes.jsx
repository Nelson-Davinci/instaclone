import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { LazySpinner } from "../components/Spinner";
import Home from "../pages/home/Home";

const AuthLayout = lazy(() => import("../layouts/AuthLayout"));

const RootLayout = lazy(() => import("../layouts/RootLayout"))

export default function AppRoutes() {
  const routes = [
    {
      path: "auth",
      element: (
        <Suspense fallback={<LazySpinner />}>
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
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <RootLayout />
        </Suspense>
      ),
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
