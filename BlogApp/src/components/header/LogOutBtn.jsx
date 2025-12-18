import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogOutBtn() {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    authservice.logout.then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-red-500 hover:text-white rounded-full font-semibold"
    onClick={logOutHandler}>
      Logout
    </button>
  );
}

export default LogOutBtn;
