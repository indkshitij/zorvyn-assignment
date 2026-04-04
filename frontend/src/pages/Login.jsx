import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { showPromiseToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";

export default function Login() {
  const { login } = useContext(AuthContext);
  const { baseUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // validation
  const validate = () => {
    const newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const promise = axios.post(`${baseUrl}/auth/login`, form);

      const res = await showPromiseToast(promise, {
        loading: "Logging in...",
        success: (res) => res.data.message || "Login successful!",
        error: (err) =>
          err?.response?.data?.message || err.message || "Login failed",
      });

      if (!res?.data?.token || !res?.data?.user) {
        throw new Error("Invalid response from server");
      }

      login(res.data);
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[92vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md border border-zinc-800 bg-zinc-900/80 backdrop-blur shadow-2xl px-5 py-8 rounded-lg">
          <CardHeader className="text-center space-y-2 pb-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Welcome back 👋
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  autoFocus
                  placeholder="Enter your email"
                  value={form.email}
                  disabled={loading}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-11 bg-zinc-950 border-zinc-800 text-white"
                />

                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  disabled={loading}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="h-11 bg-zinc-950 border-zinc-800 text-white"
                />

                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-white text-black hover:bg-zinc-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-sm text-center text-zinc-500 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-white font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  );
}
