import { useState, useContext } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";

export default function Signup() {
  const { baseUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const promise = axios.post(`${baseUrl}/users/create`, form);

      await showPromiseToast(promise, {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: "Failed to create account",
      });

      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
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
            <CardTitle className="text-3xl font-bold text-white">
              Create account
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400">
              Enter your details to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* name */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  disabled={loading}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="h-11 bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              {/* email */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  disabled={loading}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="h-11 bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              {/* password */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  disabled={loading}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="h-11 bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              {/* role */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Role</Label>
                <select
                  value={form.role}
                  disabled={loading}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full h-11 rounded-lg bg-zinc-950 border border-zinc-800 text-white px-3"
                >
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-white text-black hover:bg-zinc-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <p className="text-sm text-center text-zinc-500 mt-6">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-white cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  );
}
