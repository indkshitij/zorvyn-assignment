import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black text-white px-4">
      <div className="w-full max-w-xl text-center space-y-6">
        <h1 className="text-5xl sm:text-[120px] md:text-[180px] lg:text-[220px] font-extrabold tracking-wider leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          404
        </h1>
        <div className="space-y-2">
          <p className="text-xl sm:text-3xl font-semibold text-white">
            Page not found
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
            The page you’re trying to access doesn’t exist or may have been
            moved. Please check the URL or navigate back to a valid section.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 w-full sm:w-auto cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>

          <Link to={user ? "/dashboard" : "/"}>
            <Button
              size="lg"
              variant="secondary"
              className="flex items-center gap-2 w-full sm:w-auto cursor-pointer"
            >
              <Home size={16} />
              {user ? "Go to Dashboard" : "Go Home"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
