import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, ShieldOff, Home, CheckCircle } from "lucide-react";
import Logo from "@/assets/logo/zorvynFullLogo.png";
import IsActiveSelection from "@/components/atom/IsActiveSelection";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const InActiveScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <img src={Logo} alt="Zorvyn" className="h-10 opacity-90" />
        </div>

        <div className="relative rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6 space-y-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

          <div className="mx-auto w-14 h-14 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
            <ShieldOff size={26} />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight">
              Account Not Active
            </h1>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Please activate your account to access all features and continue
              using the platform.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <p className="text-xs text-zinc-500 uppercase tracking-wide">
              Account Status
            </p>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                {user?.isActive ? (
                  <CheckCircle size={16} className="text-green-400" />
                ) : (
                  <ShieldOff size={16} className="text-red-400" />
                )}

                <span>{user?.isActive ? "Active" : "Inactive"}</span>
              </div>

              <div className="w-32">
                <IsActiveSelection />
              </div>
            </div>

            <p className="text-[11px] text-zinc-500">
              You can toggle your account status here.
            </p>
          </div>

          <div className="h-[1px] bg-zinc-800" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={() => navigate("/")}
              size="lg"
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              <Home size={16} />
              Home
            </Button>

            <Button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              variant="destructive"
              size="lg"
              className="flex items-center justify-center gap-2 w-full"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InActiveScreen;
