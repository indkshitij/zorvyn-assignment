import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { getAuthHeader } from "@/lib/GetHeader";
import { showToast } from "@/lib/toast";
import { AppContext } from "@/context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

const RoleSelection = () => {
  const { user, setUser } = useContext(AuthContext);
  const { baseUrl } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  // redirect if viewer is on insight page
  useEffect(() => {
    if (user?.role === "viewer" && location.pathname === "/dashboard/insights") {
      navigate("/dashboard");
    }
  }, [user, location.pathname, navigate]);

  const handleChangeRole = async (e) => {
    const newRole = e.target.value;

    try {
      setLoading(true);

      const res = await axios.put(
        `${baseUrl}/users/update-role`,
        { role: newRole },
        getAuthHeader()
      );

      const updatedUser = res.data.data;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      showToast("Role updated successfully", "success");

      // instant redirect after change
      if (newRole === "viewer" && location.pathname === "/insights") {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error);
      showToast(
        error.response?.data?.message || "Failed to update role",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <select
        value={user?.role}
        onChange={handleChangeRole}
        disabled={loading}
        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-[14px] rounded-lg px-2 py-1.5  focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer disabled:opacity-50"
      >
        <option value="admin">Admin</option>
        <option value="analyst">Analyst</option>
        <option value="viewer">Viewer</option>
      </select>
    </div>
  );
};

export default RoleSelection;