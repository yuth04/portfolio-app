"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80" />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const getThemeDetails = () => {
    switch (theme) {
      case "light":
        return { icon: Sun, label: "Theme: Light (Click for Dark)" };
      case "dark":
        return { icon: Moon, label: "Theme: Dark (Click for System)" };
      default:
        return { icon: Monitor, label: "Theme: System (Click for Light)" };
    }
  };

  const { icon: MobileIcon, label } = getThemeDetails();

  const desktopOptions = [
    { value: "light", icon: Sun, label: "Light theme" },
    { value: "dark", icon: Moon, label: "Dark theme" },
    { value: "system", icon: Monitor, label: "System theme" },
  ];

  return (
    <>
      {/* Mobile Only: Single Cycling Button */}
      <button
        onClick={cycleTheme}
        aria-label={label}
        title={label}
        className="md:hidden relative cursor-pointer flex items-center justify-center w-9 h-9 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ y: -12, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 12, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <MobileIcon className="w-4 h-4" />
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Desktop Only: Full 3-Option Toggle */}
      <div className="hidden md:flex items-center gap-0.5 p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80">
        {desktopOptions.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.value;

          return (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className="relative p-1.5 rounded-lg text-xs font-medium transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              aria-label={option.label}
            >
              {isActive && (
                <motion.div
                  layoutId="theme-toggle-desktop-pill"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-lg shadow-sm -z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`w-4 h-4 relative z-10 transition-colors ${
                  isActive ? "text-blue-600 dark:text-blue-400" : ""
                }`}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}