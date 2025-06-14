"use client";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../common/Button";
import GlassCard from "../common/GlassCard";

const Header = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <GlassCard className="flex items-center justify-between p-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AT</span>
          </div>
          <span className="text-xl font-bold theme-text-primary">
            API Tester
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate("home")}
            className="theme-text-secondary hover:theme-text-primary transition-colors"
          >
            Home
          </button>
          {isAuthenticated && (
            <>
              <button
                onClick={() => onNavigate("tool")}
                className="theme-text-secondary hover:theme-text-primary transition-colors"
              >
                Tool
              </button>
              <button
                onClick={() => onNavigate("logs")}
                className="theme-text-secondary hover:theme-text-primary transition-colors"
              >
                Logs
              </button>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-button transition-all duration-200"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate("settings")}>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </button>
              <div className="flex items-center gap-2 theme-text-secondary">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate("login")}>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </button>
              <button onClick={() => onNavigate("signup")}>
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </button>
            </div>
          )}
        </div>
      </GlassCard>
    </header>
  );
};

export default Header;
