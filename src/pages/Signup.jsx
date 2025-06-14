"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button";
import GlassCard from "../components/common/GlassCard";
import { useAuth } from "../context/AuthContext";

const Signup = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const result = await signup(
        formData.name,
        formData.email,
        formData.password
      );
      if (result.success) {
        onNavigate("tool");
      } else {
        setError(result.error || "Signup failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen aurora-bg flex items-center justify-center p-4 pt-32">
      <div className="w-full max-w-md">
        <GlassCard className="p-8 fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">AT</span>
            </div>
            <h1 className="text-3xl font-bold theme-text-primary mb-2">
              Create Account
            </h1>
            <p className="theme-text-secondary">
              Join us to start testing your APIs
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block theme-text-secondary text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 pr-4 py-3"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block theme-text-secondary text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 pr-4 py-3"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block theme-text-secondary text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 pr-12 py-3"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 theme-text-muted hover:theme-text-secondary"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block theme-text-secondary text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="glass-input w-full pl-12 pr-12 py-3"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 theme-text-muted hover:theme-text-secondary"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 bg-transparent border-white/30 rounded focus:ring-blue-500 mt-1"
                required
              />
              <span className="ml-2 theme-text-secondary text-sm">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Privacy Policy
                </button>
              </span>
            </div>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="theme-text-secondary">
              Already have an account?{" "}
              <button
                onClick={() => onNavigate("login")}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Signup;
