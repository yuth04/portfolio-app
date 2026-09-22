"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { NavItem } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

interface DesktopNavProps {
  items: NavItem[];
  /** Optional custom max width for the expanded state (e.g., "max-w-6xl", "max-w-5xl") */
  widthClass?: string;
}

// Helper function to extract section ID from href (e.g., "/#about" -> "about", "#about" -> "about")
function getSectionId(href: string): string {
  if (href === "/" || href === "#home" || href === "/#home") return "home";
  return href.replace(/^[\/#]+/, "");
}

export function DesktopNav({
  items,
  widthClass = "max-w-6xl",
}: DesktopNavProps) {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Track page scroll position for header shrink animation
  const { scrollY } = useScroll();

  // Animate inner padding and max-width mapping based on scroll position
  const paddingY = useTransform(scrollY, [0, 100], ["0.625rem", "0.375rem"]);
  const paddingX = useTransform(scrollY, [0, 100], ["1rem", "0.75rem"]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.92]);
  const router = useRouter();
  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  };
  // ScrollSpy logic to detect current section on scroll
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = items
      .map((item) => getSectionId(item.href))
      .filter(Boolean);

    const handleScroll = () => {
      // Zone threshold placed near 1/3 down the viewport
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

    handleScroll(); // Run once on mount

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, pathname]);

  return (
    <header className="hidden md:flex fixed top-4 inset-x-0 z-50 justify-center items-center px-4 pointer-events-none">
      <motion.div
        style={{
          scale: navScale,
        }}
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-lg shadow-zinc-900/5 dark:shadow-none transition-all duration-300 w-full",
          widthClass,
        )}
      >
        <motion.div
          style={{
            paddingTop: paddingY,
            paddingBottom: paddingY,
            paddingLeft: paddingX,
            paddingRight: paddingX,
          }}
          className="flex items-center justify-between w-full"
        >
          {/* Brand Logo */}
          <motion.div style={{ scale: logoScale }} className="origin-left">
            <Link
              href="/"
              onClick={handleRefresh}
              className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1 hover:opacity-80 transition-opacity pl-1"
            >
              Sek<span className="text-blue-500">.</span>
            </Link>
          </motion.div>

          {/* Dynamic Nav Links with Sliding Pill */}
          <nav
            className="flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {items.map((item) => {
              const targetId = getSectionId(item.href);

              // 1. Matches active section when on homepage
              // 2. Fallback to route matching on subpages
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
                  onMouseEnter={() => setHoveredTab(item.href)}
                  onClick={() => {
                    if (pathname === "/") {
                      setActiveSection(targetId);
                    }
                  }}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-xl flex items-center justify-center",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
                  )}
                >
                  {/* Active Indicator Background */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill-desktop"
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover Indicator Background */}
                  <AnimatePresence>
                    {hoveredTab === item.href && !isActive && (
                      <motion.div
                        layoutId="hover-nav-pill-desktop"
                        className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA / Theme Toggle */}
          <div className="flex items-center gap-3 pr-1">
            <ThemeToggle />
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
