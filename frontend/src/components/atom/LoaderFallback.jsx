import React from "react";

const LoaderFallback = () => {
  return (
    <div className="flex items-center justify-center h-[60vh] w-full">
      <div className="flex flex-col items-center gap-3">
        
        {/* Spinner */}
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm text-zinc-500">Loading dashboard...</p>
      </div>
    </div>
  );
};

export default LoaderFallback;