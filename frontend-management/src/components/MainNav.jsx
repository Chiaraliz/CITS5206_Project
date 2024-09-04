import { NavLink } from "react-router-dom";
import { HiOutlineHome, HiOutlineUsers } from "react-icons/hi2";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-100 rounded-sm p-3 transition-all"
                : "flex items-center gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-sm p-3 transition-all"
            }
          >
            <HiOutlineHome className="w-6 h-6 text-gray-400 transition-all group-hover:text-brand-600" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-100 rounded-sm p-3 transition-all"
                : "flex items-center gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-sm p-3 transition-all"
            }
          >
            <HiOutlineUsers className="w-6 h-6 text-gray-400 transition-all group-hover:text-brand-600" />
            <span>Users</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
