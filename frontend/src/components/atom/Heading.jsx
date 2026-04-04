const Heading = ({ icon: Icon, title, subtitle }) => {
  return (
    <div className="flex items-center gap-4 mb-10 text-left">
      {/* icon */}
      <div
        className="group flex-shrink-0 w-18 h-18 flex items-center justify-center rounded-lg
        bg-white/5 border border-zinc-800 transition-all duration-300 ease-out hover:bg-white/10 hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
      >
        {Icon && (
          <Icon className="w-8 h-8 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
        )}
      </div>

      {/* text */}
      <div className="text-left">
        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
          {title}
        </h2>

        {subtitle && <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Heading;
