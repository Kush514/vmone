"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "noir" | "print" | "stone" | "minimalist" | "heritage" | "gallery" | "brutalism" | "midnight" | "analog";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("noir");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem("vmone-global-theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Update HTML attribute and local storage
    if (theme === "noir") {
      document.documentElement.removeAttribute("data-global-theme");
    } else {
      document.documentElement.setAttribute("data-global-theme", theme);
    }
    localStorage.setItem("vmone-global-theme", theme);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useGlobalTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useGlobalTheme must be used within a ThemeProvider");
  }
  return context;
}
