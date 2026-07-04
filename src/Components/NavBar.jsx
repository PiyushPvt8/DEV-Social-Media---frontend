import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { DEFAULT_AVATAR, BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout user
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeUser());

      navigate("/login");
    } catch (err) {
      console.log(err.response);
      console.log(err.response?.data);
      console.log(err.response?.status);
    }
  };

  // Navigate to profile page
  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Navigate to settings page
  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <div className="navbar bg-neutral px-6 text-neutral-content shadow-lg">
      {/* Logo */}
      <div className="flex-1">
        <button
          onClick={() => navigate("/")}
          className="
            cursor-pointer
            text-2xl
            font-bold
            tracking-wide
            transition-colors
            duration-200
            hover:text-primary
            active:text-secondary
          "
        >
          DEV SOCIAL
        </button>
      </div>

      {/* Show user section only when user exists */}
      {user && (
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end flex items-center gap-2">
            {/* Welcome Message */}
            <p className="hidden sm:block">Welcome, {user.firstName}!</p>

            {/* Avatar Button */}
            <div
              tabIndex={0}
              role="button"
              className="
                avatar
                btn
                btn-circle
                btn-ghost
                transition-colors
                duration-200
                hover:bg-primary/20
                active:bg-primary/40
              "
            >
              <div
                className="
                  w-10
                  rounded-full
                  ring
                  ring-primary
                  ring-offset-2
                  ring-offset-neutral
                "
              >
                <img
                  src={user.photoURL || DEFAULT_AVATAR}
                  alt="User Avatar"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }}
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="
                menu
                menu-sm
                dropdown-content
                z-10
                mt-3
                w-56
                rounded-box
                border
                border-neutral-content/10
                bg-neutral
                p-2
                text-neutral-content
                shadow-xl
              "
            >
              {/* Profile */}
              <li>
                <button
                  onClick={handleProfileClick}
                  className="
                    transition-colors
                    duration-200
                    hover:bg-primary
                    hover:text-primary-content
                    active:bg-secondary
                    active:text-secondary-content
                    focus:bg-primary
                    focus:text-primary-content
                  "
                >
                  <span className="flex-1 text-left">Profile</span>

                  <span className="badge badge-primary">New</span>
                </button>
              </li>

              {/* Settings */}
              <li>
                <button
                  onClick={handleSettingsClick}
                  className="
                    transition-colors
                    duration-200
                    hover:bg-primary
                    hover:text-primary-content
                    active:bg-secondary
                    active:text-secondary-content
                  "
                >
                  Settings
                </button>
              </li>

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="
                    text-error
                    transition-colors
                    duration-200
                    hover:bg-error
                    hover:text-error-content
                    active:bg-error/70
                    active:text-error-content
                  "
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
