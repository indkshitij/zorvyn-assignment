"use client";

import { ShieldX, LayoutDashboard, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";
import Logo from "@/assets/logo/zorvynFullLogo.png";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="flex justify-center">
            <img src={Logo} alt="Zorvyn" className="h-10 opacity-90" />
          </div>

          <div className="relative rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6 space-y-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

            <div className="mx-auto w-14 h-14 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
              <ShieldX size={26} />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-semibold tracking-tight">
                Access Denied
              </h1>

              <p className="text-sm text-zinc-400 leading-relaxed">
                You don’t have permission to access this page. This action is
                restricted based on your role or access level.
              </p>
            </div>

            <div className="h-[1px] bg-zinc-800" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Button>

              <Button
                onClick={() => navigate("/")}
                variant="secondary"
                size="lg"
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home size={16} />
                Home
              </Button>
            </div>
          </div>

          <p className="text-xs text-zinc-500">
            Error 403 • Unauthorized Access
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
