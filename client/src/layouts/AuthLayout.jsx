import { Outlet } from "react-router";
import AuthImage from "../assets/AuthImage.png"

export default function AuthLayout() {
  return (
    <section className="container mx-auto grid grid-cols-12 items-center justify-center gap-8 min-h-screen mt-[50px]">
      <div className="hidden lg:block col-span-6 ml-auto lg:w-[400px] h-[500px]">
        <img
          src={AuthImage}
          alt="AuthImage"
          className="w-full h-full rounded-md"
        />
      </div>
      <div className="mx-auto lg:w-[400px] h-[500px]">
        <Outlet />
      </div>
    </section>
  );
}
