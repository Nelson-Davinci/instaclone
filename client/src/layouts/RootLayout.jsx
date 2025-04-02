import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <section>
      <Sidebar />
      <div className="md:ml-[220px] xl:ml-[240px] min-h-screen">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
