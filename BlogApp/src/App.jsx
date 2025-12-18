import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import Header from "./components/header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx"; // Assuming you have a footer
import { Outlet } from "react-router-dom"; // IMPORT OUTLET

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        {/* 1. Header is self-closing now, not wrapping content */}
        <Header /> 
        
        {/* 2. Main content is a sibling to Header */}
        <main>
          {/* 3. Outlet renders the child route's element (Home, Login, etc.) */}
           <Outlet /> 
        </main>
        
        {/* Optional: Add Footer if you have one */}
        {/* <Footer /> */}
      </div>
    </div>
  ) : null;
}

export default App;