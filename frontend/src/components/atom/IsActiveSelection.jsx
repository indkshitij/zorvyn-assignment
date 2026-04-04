import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { getAuthHeader } from "@/lib/GetHeader";
import { showToast } from "@/lib/toast";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const IsActiveSelection = () => {
  const { user, setUser } = useContext(AuthContext);
  const { baseUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChangeStatus = async (e) => {
    const value = e.target.value;
    const isActive = value === "true";

    try {
      setLoading(true);

      const res = await axios.put(
        `${baseUrl}/users/update-status`,
        { isActive },
        getAuthHeader(),
      );

      const updatedUser = res.data.data;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      showToast(
        `Account ${isActive ? "activated" : "deactivated"} successfully`,
        "success",
      );

      if (updatedUser.isActive) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/inactive", { replace: true });
      }
    } catch (error) {
      console.log(error);
      showToast(
        error.response?.data?.message || "Failed to update status",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <select
        value={user?.isActive ? "true" : "false"}
        onChange={handleChangeStatus}
        disabled={loading}
        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-[14px] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer disabled:opacity-50"
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    </div>
  );
};

export default IsActiveSelection;
