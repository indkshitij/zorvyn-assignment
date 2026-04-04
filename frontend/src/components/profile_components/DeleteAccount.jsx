"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { getAuthHeader } from "@/lib/GetHeader";
import { showToast } from "@/lib/toast";
import { AlertTriangle } from "lucide-react";

const DeleteAccount = () => {
  const { baseUrl } = useContext(AppContext);
  const { logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`${baseUrl}/users/delete-my-account`, getAuthHeader());

      showToast("Account deleted", "success");
      logout();
    } catch (error) {
      showToast("Failed to delete account", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative rounded-lg border border-red-900/40 bg-gradient-to-br from-red-950/40 to-transparent p-6 overflow-hidden">
        {/* subtle overlay */}
        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} />
              Danger Zone
            </h2>

            <p className="text-sm text-zinc-400 max-w-md">
              Deleting your account will permanently remove all your data,
              including transactions and insights. This action cannot be undone.
            </p>
          </div>

          {/* Action */}

          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2.5 text-sm font-medium bg-red-600/90 hover:bg-red-500 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* modal */}
          <div className="relative w-[90%] max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95">
            {/* header */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="text-red-400" size={18} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-white">
                  Delete Account
                </h3>
                <p className="text-xs text-zinc-500">
                  This action is permanent
                </p>
              </div>
            </div>

            {/* content */}
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Are you absolutely sure you want to delete your account? All your
              financial data, transactions, and insights will be permanently
              erased.
            </p>

            {/* actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-6 py-2.5 text-sm bg-red-600 hover:bg-red-500 rounded-lg transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
