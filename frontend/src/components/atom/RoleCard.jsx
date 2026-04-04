"use client";

import { Eye, BarChart3, ShieldCheck } from "lucide-react";

const roleConfig = {
  viewer: {
    title: "Viewer",
    subtitle: "Read-only access",
    description: "Can view dashboard and financial data",
    icon: Eye,
    color: "text-blue-400",
    badge: "Read Only",
  },
  analyst: {
    title: "Analyst",
    subtitle: "Insights access",
    description: "Can analyze data and view insights",
    icon: BarChart3,
    color: "text-purple-400",
    badge: "Insights",
  },
  admin: {
    title: "Admin",
    subtitle: "Full system control",
    description: "Can manage users, roles, and records",
    icon: ShieldCheck,
    color: "text-green-400",
    badge: "Full Access",
  },
};

const RoleCard = ({ role = "viewer", status = "active" }) => {
  const config = roleConfig[role] || roleConfig.viewer;
  const Icon = config.icon;

  const isActive = status === "active";

  return (
    <div className="group relative w-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur transition-all duration-300 hover:border-zinc-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Current Role
          </p>

          <h2 className="mt-1 text-sm font-semibold text-white tracking-tight">
            {config.title}
          </h2>

          <p className="text-xs text-zinc-500 mt-[2px]">{config.subtitle}</p>
        </div>

        <div className="p-2 rounded-md bg-zinc-800 border border-zinc-700 group-hover:scale-105 transition">
          <Icon size={16} className={config.color} />
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
        {config.description}
      </p>

      <div className="mt-4 h-[1px] bg-zinc-800" />

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-300">
          {config.badge}
        </span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-[12px] ${
                isActive ? "text-green-400" : "text-red-400"
              } capitalize`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
