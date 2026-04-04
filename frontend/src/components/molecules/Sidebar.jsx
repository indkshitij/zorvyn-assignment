import React, { useState, useCallback, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  ArrowLeftRight,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import Logo from "@/assets/logo/zorvynFullLogo.png";
import EditAndCreateTransactionDialog from "@/components/transaction_components/EditAndCreateTransactionDialog";
import { AuthContext } from "@/context/AuthContext";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import RoleSelection from "@/components/atom/RoleSelection";
import { Link } from "react-router-dom";
import IsActiveSelection from "../atom/IsActiveSelection";
import RoleCard from "../atom/RoleCard";

const navItems = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    path: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Insights",
    path: "/dashboard/insights",
    icon: BarChart3,
  },
  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setSidebarOpen(false);
    },
    [navigate],
  );

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const { user, logout } = useContext(AuthContext);
  const { fetchTransactions } = useContext(AppContext);

  const isAdmin = user?.role === "admin";

  return (
    <>
      {/* mobile top */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-8" />
        </Link>

        <div className="flex items-center gap-1.5">
          {isAdmin && (
            <Button
              size="sm"
              variant="secondary"
              className={
                "px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-sm whitespace-nowrap"
              }
              onClick={() => setDialogOpen(true)}
            >
              Add Transaction
            </Button>
          )}

          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 md:w-60 bg-zinc-900 border-r border-zinc-800 z-50 transform transition-transform duration-300 flex flex-col justify-between 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* header */}
        <div className="">
          <div className="px-6 py-4 flex justify-between items-center border-b border-zinc-800">
            <Link to="/">
              <img src={Logo} alt="logo" className="h-8" />
            </Link>

            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <X size={20} />
            </button>
          </div>

          {/* nav */}
          <nav className="px-3 py-2 space-y-2.5">
            {navItems.map(({ label, path, icon: Icon }) => {
              const active = isActive(path);

              return (
                <button
                  key={path}
                  onClick={() => handleNavigate(path)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition cursor-pointer
                ${
                  active
                    ? "bg-white/10 text-white border border-zinc-700"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="space-y-2.5">
          <div className="w-full space-y-4 px-3">
            {/* Status Section */}
            <div className="flex flex-col gap-1 ">
              <label className="text-xs  text-gray-400">Account Status</label>
              <IsActiveSelection />
            </div>

            {/* Role Section */}
            <div className="flex flex-col gap-1 ">
              <label className="text-xs  text-gray-400">User Role</label>
              <RoleSelection />
            </div>
          </div>
          {/* logout */}
          <div className="px-3">
            <RoleCard
              role={user?.role}
              status={user?.isActive ? "active" : "inactive"}
            />
          </div>
          <div className="px-3 pb-4 ">
            <Button
              variant="destructive"
              onClick={logout}
              className="w-full flex items-center gap-3 cursor-pointer px-4 py-5 text-red-400"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* dialog */}
      <EditAndCreateTransactionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => fetchTransactions()}
      />
    </>
  );
};

export default Sidebar;
