"use client";

import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  ArrowLeftRight,
  Menu,
  X,
  LogIn,
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState, useEffect, useRef } from "react";
import Logo from "@/assets/logo/zorvynFullLogo.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: ArrowLeftRight,
    },
  ];

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Zorvyn" className="h-8" />
        </NavLink>

        {/* Desktop Nav */}
        {user && (
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <Icon size={16} />
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          <div className="hidden md:block">
            {user ? (
              <Button
                onClick={logout}
                variant="destructive"
                size="lg"
                className="flex items-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : location.pathname === "/login" ? (
              <Button
                onClick={() => navigate("/signup")}
                variant="secondary"
                size="lg"
                className="bg-white text-black flex items-center gap-2 cursor-pointer"
              >
                <LogIn size={16} />
                Sign Up
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="secondary"
                size="lg"
                className="bg-white text-black flex items-center gap-2 cursor-pointer"
              >
                <LogIn size={16} />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={menuRef}
          className="lg:hidden px-4 py-4 space-y-3 border-t border-zinc-800 bg-black/80 backdrop-blur-xl"
        >
          {user &&
            navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavigate(link.path)}
                  className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-zinc-300 hover:bg-white/10 transition"
                >
                  <Icon size={16} />
                  {link.name}
                </button>
              );
            })}

          {/* Auth */}
          <div className="pt-2 border-t border-zinc-800">
            {user ? (
              <Button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                variant="destructive"
                size="lg"
                className="w-full flex items-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : location.pathname === "/login" ? (
              <Button
                onClick={() => navigate("/signup")}
                variant="secondary"
                className="bg-white text-black flex items-center gap-2 cursor-pointer"
              >
                <LogIn size={16} />
                Sign Up
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="secondary"
                className="bg-white text-black flex items-center gap-2 cursor-pointer"
              >
                <LogIn size={16} />
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
