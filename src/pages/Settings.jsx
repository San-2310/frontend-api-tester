"use client";

import {
  Database,
  Download,
  Moon,
  Palette,
  RotateCcw,
  Sun,
  Upload,
  User,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import Button from "../components/common/Button";
import GlassCard from "../components/common/GlassCard";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Settings = ({ onNavigate }) => {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme, accentColor, updateAccentColor } = useTheme();

  const [settings, setSettings] = useState({
    requestTimeout: 30,
    maxRetries: 3,
    concurrentRequests: 5,
    verboseOutput: true,
    animationsEnabled: true,
    fontSize: "medium",
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      onNavigate("login");
    }
  }, [isAuthenticated, onNavigate]);

  const accentColors = [
    { name: "Electric Blue", value: "#00d4ff" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Orange", value: "#f59e0b" },
    { name: "Pink", value: "#ec4899" },
    { name: "Teal", value: "#14b8a6" },
  ];

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "appSettings",
        JSON.stringify({ ...settings, [key]: value })
      );
    }
  };

  const clearSessionData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("testSessions");
    }
    alert("Session data cleared successfully");
  };

  const exportSettings = () => {
    const data = {
      theme,
      accentColor,
      settings,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "api-tester-settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetToDefaults = () => {
    if (
      window.confirm("Are you sure you want to reset all settings to defaults?")
    ) {
      setSettings({
        requestTimeout: 30,
        maxRetries: 3,
        concurrentRequests: 5,
        verboseOutput: true,
        animationsEnabled: true,
        fontSize: "medium",
      });
      updateAccentColor("#00d4ff");
      if (typeof window !== "undefined") {
        localStorage.removeItem("appSettings");
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen aurora-bg">
      <Header onNavigate={onNavigate} />

      <div className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold theme-text-primary mb-4">
              Settings
            </h1>
            <p className="theme-text-secondary text-lg">
              Customize your API testing experience
            </p>
          </div>

          <div className="space-y-8">
            {/* Appearance Settings */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold theme-text-primary">
                  Appearance
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium theme-text-primary mb-1">
                      Theme
                    </h3>
                    <p className="theme-text-muted text-sm">
                      Choose your preferred color scheme
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="glass-button p-3 flex items-center gap-2"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-5 h-5" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-medium theme-text-primary mb-3">
                    Accent Color
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => updateAccentColor(color.value)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 relative ${
                          accentColor === color.value
                            ? "border-white scale-110 shadow-lg"
                            : "border-white/30 hover:border-white/60 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {accentColor === color.value && (
                          <div className="absolute inset-0 rounded-lg bg-white/20 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium theme-text-primary mb-1">
                      Font Size
                    </h3>
                    <p className="theme-text-muted text-sm">
                      Adjust text size for better readability
                    </p>
                  </div>
                  <select
                    value={settings.fontSize}
                    onChange={(e) =>
                      handleSettingChange("fontSize", e.target.value)
                    }
                    className="glass-input px-4 py-2"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium theme-text-primary mb-1">
                      Animations
                    </h3>
                    <p className="theme-text-muted text-sm">
                      Enable or disable UI animations
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.animationsEnabled}
                      onChange={(e) =>
                        handleSettingChange(
                          "animationsEnabled",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </GlassCard>

            {/* Testing Configuration */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold theme-text-primary">
                  Testing Configuration
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block theme-text-secondary text-sm font-medium mb-2">
                    Request Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={settings.requestTimeout}
                    onChange={(e) =>
                      handleSettingChange(
                        "requestTimeout",
                        Number.parseInt(e.target.value)
                      )
                    }
                    className="glass-input w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block theme-text-secondary text-sm font-medium mb-2">
                    Max Retries
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={settings.maxRetries}
                    onChange={(e) =>
                      handleSettingChange(
                        "maxRetries",
                        Number.parseInt(e.target.value)
                      )
                    }
                    className="glass-input w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block theme-text-secondary text-sm font-medium mb-2">
                    Concurrent Requests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={settings.concurrentRequests}
                    onChange={(e) =>
                      handleSettingChange(
                        "concurrentRequests",
                        Number.parseInt(e.target.value)
                      )
                    }
                    className="glass-input w-full px-4 py-3"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium theme-text-primary mb-1">
                      Verbose Output
                    </h3>
                    <p className="theme-text-muted text-sm">
                      Show detailed test information
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.verboseOutput}
                      onChange={(e) =>
                        handleSettingChange("verboseOutput", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
            </GlassCard>

            {/* Data Management */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold theme-text-primary">
                  Data Management
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium theme-text-primary mb-2">
                    Session Data
                  </h3>
                  <p className="theme-text-muted text-sm mb-4">
                    Clear all stored test sessions and results
                  </p>
                  <Button variant="danger" onClick={clearSessionData}>
                    Clear Session Data
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium theme-text-primary mb-2">
                    Settings Backup
                  </h3>
                  <p className="theme-text-muted text-sm mb-4">
                    Export or import your configuration
                  </p>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={exportSettings}>
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                    <Button variant="secondary">
                      <Upload className="w-4 h-4" />
                      Import
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Account Management */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold theme-text-primary">
                  Account
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium theme-text-primary">
                      {user?.name}
                    </h3>
                    <p className="theme-text-muted">{user?.email}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Button variant="danger" onClick={resetToDefaults}>
                    <RotateCcw className="w-4 h-4" />
                    Reset All Settings
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
