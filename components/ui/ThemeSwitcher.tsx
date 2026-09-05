"use client";

import { useGlobalTheme } from "@/components/providers/ThemeProvider";
import { useState } from "react";
import { Settings2, X } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useGlobalTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: "noir", name: "Noir Old", bg: "#000000", alt: "#E0CD7F" },
    { id: "noir_new", name: "Noir New", bg: "#0A0A0A", alt: "#B8924A" },
    { id: "print", name: "Print Magazine", bg: "#FFFFFF", alt: "#FDFBF7" },
    { id: "stone", name: "Stone Studio", bg: "#F9F9F6", alt: "#EBEBE8" },
    { id: "minimalist", name: "The Minimalist", bg: "#FAFAFA", alt: "#EEEEEE" },
    { id: "heritage", name: "The Heritage", bg: "#1C281F", alt: "#C5B358" },
    { id: "gallery", name: "The Gallery", bg: "#1A1A1A", alt: "#F5F5F0" },
    { id: "brutalism", name: "Earthy Brutalism", bg: "#141414", alt: "#C4795A" },
    { id: "midnight", name: "Midnight Navy", bg: "#0A1128", alt: "#FAF3E0" },
    { id: "analog", name: "The Analog", bg: "#2B1E16", alt: "#E8DCC4" }
  ] as const;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {isOpen && (
        <div className="bg-primary-dark border border-brand-silver/20 shadow-2xl p-4 mb-4 flex flex-col gap-2 min-w-[200px] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="text-xs font-display tracking-widest text-brand-silver uppercase mb-2 pb-2 border-b border-brand-silver/20">
            Select Theme
          </div>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex items-center gap-3 w-full text-left p-2 transition-colors duration-300 ${
                theme === t.id ? "bg-brand-gold text-primary-dark" : "hover:bg-brand-silver/10 text-brand-silver hover:text-pure-white"
              }`}
            >
              <div className="flex w-6 h-6 border border-brand-silver/30 shadow-sm overflow-hidden">
                <div className="w-1/2 h-full" style={{ backgroundColor: t.bg }}></div>
                <div className="w-1/2 h-full" style={{ backgroundColor: t.alt }}></div>
              </div>
              <span className="text-xs font-display uppercase tracking-wider">{t.name}</span>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary-dark border border-brand-silver/30 shadow-xl flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-primary-dark hover:border-brand-gold transition-all duration-300 group"
        aria-label="Toggle Theme Switcher"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isOpen ? (
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        ) : (
          <Settings2 className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        )}
      </button>

    </div>
  );
}
