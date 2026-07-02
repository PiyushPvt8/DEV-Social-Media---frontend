import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  return(
    <div className="navbar bg-neutral text-neutral-content shadow-lg px-6">
      {" "}
      <div className="flex-1">
        {" "}
        <a className="text-2xl font-bold tracking-wide cursor-pointer hover:text-primary transition-colors">
          {" "}
          DEV SOCIAL{" "}
        </a>{" "}
      </div>{" "}
      {user && (
        <div className="flex items-center gap-4">
          {" "}
          <div className="dropdown dropdown-end flex items-center gap-1">
            {" "}
            <p>Welcome, {user.firstName}!</p>{" "}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-neutral-focus"
            >
              {" "}
              <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-neutral">
                {" "}
                <img
                  alt="User Avatar"
                  src={
                    user?.photoURL || DEFAULT_AVATAR
                  }
                />{" "}
              </div>{" "}
            </div>{" "}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-neutral text-neutral-content shadow-xl border border-neutral-content/10"
            >
              {" "}
              <li>
                {" "}
                <a>
                  {" "}
                  Profile <span className="badge badge-primary">New</span>{" "}
                </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a>Settings</a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a className="text-error hover:bg-error hover:text-error-content">
                  {" "}
                  Logout{" "}
                </a>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
export default NavBar;
