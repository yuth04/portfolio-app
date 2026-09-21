"use client";
import React from "react";
import { Home, FolderCode, User, Mail } from "lucide-react";
import { DesktopNav } from "./desktop-nav";
import { MobileNav, NavItem } from "./mobile-nav";
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Projects", href: "/projects", icon: FolderCode },
  { label: "Contact", href: "/contact", icon: Mail },
];
export function Navbar() {
  return (
    <>
      <DesktopNav items={NAV_ITEMS} />
      <MobileNav items={NAV_ITEMS} />
    </>
  );
}
