import InstaShots from "../assets/logo_instagram.png";
import { NavLink } from "react-router";
import { sidebarLinks } from "../libs/constant";
import Search from "./Search";
import Notifications from "./Notifications";
import CreatePost from "./CreatePost";
import { useAuth } from "../store";

export default function Sidebar() {
  const { user, handleLogout } = useAuth();
  return (
    <div className="hidden md:block min-h-screen fixed z-50 border-r border-gray-200 w-[220px] xl:w-[240px]">
      <div className="flex flex-col min-h-screen justify-between py-6 px-4">
        <div>
          <div className="flex gap-3 items-center mb-10">
            <img src={InstaShots} className="w-[40px] h-[40px]" />
            <h1 className="text-2xl font-bold italic">InstaShots</h1>
          </div>
          <div className="flex flex-col gap-2">
            {sidebarLinks.map(({ id, name, path, Icon }) => (
              <NavLink
                to={path}
                key={id}
                className="tooltip tooltip-right z-50"
                data-tip={name}
              >
                {({ isActive }) => (
                  <span
                    className={`flex items-center gap-3 p-2 hover:font-bold hover:text-zinc-800 hover:transition duration-150 ease-out text-lg hover:bg-zinc-100 rounded-lg ${
                      isActive ? "font-bold bg-[#8D0D76] text-white" : ""
                    }`}
                  >
                    <i className={`${Icon} text-2xl`}></i>
                    {name}
                  </span>
                )}
              </NavLink>
            ))}
            <Search />
            <Notifications />
            <CreatePost />
            <NavLink
              to={`/profile/${user?.username}`}
              className="tooltip tooltip-right z-50"
              data-tip="Profile"
            >
              {({ isActive }) => (
                <span
                  className={`flex items-center gap-3 p-2 hover:font-bold hover:text-zinc-800 hover:transition duration-150 ease-out text-lg hover:bg-zinc-100 rounded-lg ${
                    isActive ? "font-bold bg-[#] text-white" : ""
                  }`}
                >
                  <div className="avatar avatar-placeholder">
                    <div className=" w-8 rounded-full border border-gray-300">
                      {user?.username?.[0]?.toUpperCase() || "?"}
                    </div>
                  </div>

                  <span>Profile</span>
                </span>
              )}
            </NavLink>
          </div>
        </div>
        <div className="dropdown dropdown-top">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex items-center cursor-pointer gap-3"
          >
            <i className="ri-menu-line text-2xl mr-2"></i>
            <span className="text-lg">More</span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 z-1 shadow min-w-[180px] bg-base-100 rounded-box"
          >
            <li>
              <NavLink to="/settings">
                <i className="ri-settings-line text-2xl"></i>Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/login" onClick={handleLogout}>
                <i className="ri-logout-box-line text-2xl"></i>Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
