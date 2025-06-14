"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "dark";
    }
    return "dark";
  });

  const [accentColor, setAccentColor] = useState(() => {
    if (typeof window !== "undefined") {
      const savedAccent = localStorage.getItem("accentColor");
      return savedAccent || "#00d4ff";
    }
    return "#00d4ff";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  const updateAccentColor = (color) => {
    setAccentColor(color);
    if (typeof window !== "undefined") {
      localStorage.setItem("accentColor", color);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    root.style.setProperty("--primary-accent", accentColor);

    const secondaryColors = {
      "#00d4ff": "#8b5cf6",
      "#2563eb": "#7c3aed",
      "#10b981": "#059669",
      "#f59e0b": "#d97706",
      "#ec4899": "#db2777",
      "#14b8a6": "#0d9488",
    };
    root.style.setProperty(
      "--secondary-accent",
      secondaryColors[accentColor] || "#8b5cf6"
    );
  }, [theme, accentColor]);

  const value = {
    theme,
    accentColor,
    toggleTheme,
    updateAccentColor,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
