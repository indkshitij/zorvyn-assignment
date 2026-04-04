"use client";
import React from "react";

const ProfileCard = ({
  name = "",
  isActive = false,
  email = "",
  role = "",
  createdAt = "",
}) => {
  return (
    <div className="relative rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-5 sm:p-6 overflow-hidden">
      {/* subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

      {/* label */}
      <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500">
        Profile Overview
      </p>

      {/* main */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-4">
        {/* Avatar */}
        <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-indigo-500/20 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl font-bold text-indigo-400 border border-indigo-500/20 shadow-inner">
          {name?.charAt(0).toUpperCase()}

          {/* status dot */}
          <span
            className={`absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-zinc-900 ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>

        {/* content */}
        <div className="flex-1 w-full space-y-4 text-center md:text-left">
          {/* name + email */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
              {name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 mt-1">{email}</p>

            <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-md mx-auto md:mx-0">
              Manage your account, monitor activity, review financial insights,
              and stay in control of your spending patterns.
            </p>
          </div>

          {/* info grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-2">
            {/* role */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">
                Role
              </p>

              <span className="mt-1 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 capitalize text-xs sm:text-sm">
                {role}
              </span>

              <p className="text-[11px] text-zinc-500 mt-1 text-center md:text-left">
                {role === "admin" && "Full system access"}
                {role === "analyst" && "Insights & analytics"}
                {role === "viewer" && "Read-only access"}
              </p>
            </div>

            {/* status */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">
                Status
              </p>

              <span
                className={`mt-1 px-2.5 py-1 rounded-md border text-xs font-medium ${
                  isActive
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>

              <p className="text-[11px] text-zinc-500 mt-1 text-center md:text-left">
                {isActive ? "Account is active" : "Access is restricted"}
              </p>
            </div>

            {/* joined */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">
                Joined
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {new Date(createdAt).toLocaleDateString("en-GB")}
              </p>

              <p className="text-[11px] text-zinc-500 mt-1 text-center md:text-left">
                Member since signup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
