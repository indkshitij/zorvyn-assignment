import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative p-6 rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* icon */}
      <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-lg bg-white/5 border border-zinc-800 group-hover:bg-white/10 group-hover:border-zinc-700 transition-all duration-300">
        <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* content */}
      <div className="relative text-left mt-4">
        {/* text */}

        <h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
