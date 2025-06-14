"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button";
import GlassCard from "../components/common/GlassCard";
import { useAuth } from "../context/AuthContext";

const Login = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onNavigate("tool");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen app-background flex items-center justify-center p-4 pt-32">
      <div className="w-full max-w-md">
        <GlassCard className="p-8 fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">AT</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 pr-4 py-3 text-white placeholder-white/50"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 pr-12 py-3 text-white placeholder-white/50"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-transparent border-white/30 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-white/70 text-sm">Remember me</span>
              </label>
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/70">
              Don't have an account?{" "}
              <button
                onClick={() => onNavigate("signup")}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
