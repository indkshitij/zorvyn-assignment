import React from "react";

const DashboardCard = ({ title, value, icon: Icon, subtitle }) => {
  return (
    <div className="group relative p-4 rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_6px_20px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-lg" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className="w-9 h-9 flex items-center justify-center rounded-lg
              bg-white/5 border border-zinc-800 
              transition-all duration-300
              group-hover:bg-white/10 group-hover:border-zinc-700"
            >
              <Icon className="w-4 h-4 text-white transition-all duration-300 group-hover:scale-110" />
            </div>
          )}

          <p className="text-xs sm:text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition">
            {title}
          </p>
        </div>

        {/* indicator */}
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-zinc-300 transition-all duration-300 group-hover:scale-125" />
      </div>

      {/* content */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          {value}
        </h2>

        {subtitle && (
          <p className="text-xs text-zinc-400 mt-1 group-hover:text-zinc-300 transition">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
