import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogOutBtn({ onLogout }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      onLogout?.();
    });
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-red-500 hover:text-white rounded-full font-semibold text-white"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogOutBtn;
