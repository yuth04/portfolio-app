"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useScrollDirection } from "@/hooks/use-scroll-direction.ts";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Helper to sanitize href into section ID (e.g., "/#about" -> "about", "#about" -> "about", "/about" -> "about")
function getSectionId(href: string): string {
  if (href === "/") return "home";
  return href.replace(/^[\/#]+/, "");
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const { isHidden } = useScrollDirection({ threshold: 100 });
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    // Only run scroll spy on the homepage
    if (pathname !== "/") return;

    const sectionIds = items.map((item) => getSectionId(item.href)).filter(Boolean);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    // Run on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, pathname]);

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: 80, opacity: 0 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="md:hidden fixed bottom-4 inset-x-0 z-50 flex justify-center items-center px-4 pointer-events-none"
    >
      <nav className="pointer-events-auto flex items-center justify-between gap-1 w-full max-w-md px-3 py-2 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-lg shadow-zinc-900/10 dark:shadow-none">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-0.5 px-2"
        >
          Sek<span className="text-blue-500">.</span>
        </Link>

        {/* Dynamic Nav Links */}
        <div className="flex items-center gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const targetId = getSectionId(item.href);

            // Match scroll position on homepage, or fallback to pathname for subpages
            const isActive =
              pathname === "/"
                ? activeSection === targetId
                : item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (pathname === "/") {
                    setActiveSection(targetId);
                  }
                }}
                className="relative"
              >
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className={cn(
                    "relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-colors min-w-[56px]",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill-mobile"
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px] tracking-tight">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-center px-1">
          <ThemeToggle />
        </div>
      </nav>
    </motion.div>
  );
}