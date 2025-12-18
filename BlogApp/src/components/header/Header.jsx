import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../Container/Container.jsx";
import Logo from "../Logo.jsx";
import LogoutBtn from "./LogOutBtn.jsx";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleNavigate = (slug) => {
    navigate(slug);
    setIsMenuOpen(false);
  };

  return (
    <header className="py-4 shadow-lg bg-gray-900 border-b border-gray-800">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Logo width="70px" />
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Desktop navigation */}
            <ul className="hidden md:flex items-center gap-4">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 text-gray-200 font-semibold hover:bg-blue-500 hover:text-white rounded-full transition-all ease-in-out"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn onLogout={() => setIsMenuOpen(false)} />
                </li>
              )}
            </ul>

            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-3 border-t border-gray-800 pt-3"
          >
            <ul className="flex flex-col gap-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigate(item.slug)}
                      className="w-full text-left px-4 py-2 text-gray-200 font-semibold hover:bg-gray-800 rounded-lg"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="px-4 py-2">
                  <LogoutBtn onLogout={() => setIsMenuOpen(false)} />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
