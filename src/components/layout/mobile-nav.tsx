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

function getSectionId(href: string): string {
  if (href === "/") return "home";
  return href.replace(/^[\/#]+/, "");
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const { isHidden } = useScrollDirection({ threshold: 100 });
  const [activeSection, setActiveSection] = useState<string>("home");

  // Scroll Spy functionality
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = items
      .map((item) => getSectionId(item.href))
      .filter(Boolean);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, pathname]);

  // Performs full browser refresh when clicking logo
  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: 100, opacity: 0 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="md:hidden fixed bottom-4 inset-x-0 z-50 flex justify-center items-center px-3 sm:px-6 pointer-events-none pb-[env(safe-area-inset-bottom)]"
    >
      <nav className="pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 w-full max-w-sm xs:max-w-md sm:max-w-lg px-2.5 sm:px-4 py-2 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl shadow-lg shadow-zinc-900/10 dark:shadow-none transition-all">
        {/* Brand Logo - Triggers full page reload */}
        <a
          href="/"
          onClick={handleRefresh}
          className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-0.5 px-1.5 sm:px-2 rounded-lg hover:opacity-80 transition-opacity cursor-pointer select-none"
        >
          Sek<span className="text-blue-500">.</span>
        </a>

        {/* Navigation Items Container */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 overflow-x-auto no-scrollbar">
          {items.map((item) => {
            const Icon = item.icon;
            const targetId = getSectionId(item.href);

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
                className="relative shrink-0"
              >
                <motion.div
                  whileTap={{ scale: 0.94 }}
                  className={cn(
                    "relative flex flex-col items-center justify-center py-1 px-2 sm:px-3 rounded-xl transition-colors min-w-[48px] xs:min-w-[54px] sm:min-w-[60px]",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
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
                  <Icon className="w-4 h-4 xs:w-4.5 xs:h-4.5 mb-0.5 shrink-0" />
                  <span className="text-[9px] xs:text-[10px] tracking-tight leading-none truncate max-w-[50px] xs:max-w-none">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center justify-center px-0.5 sm:px-1 shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </motion.div>
  );
}
