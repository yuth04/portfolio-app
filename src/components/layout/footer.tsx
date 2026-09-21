"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: "/not-found", label: "GitHub" },
    { icon: FaLinkedin, href: "/not-found", label: "LinkedIn" },
    { icon: FaFacebook, href: "/not-found", label: "Facebook" },
    { icon: FaInstagram, href: "/not-found", label: "Instagram" },
    { icon: FaTelegram, href: "/not-found", label: "Telegram" },
  ];

  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-zinc-400 pt-12 pb-28 md:pb-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-0.5"
            >
              Sek<span className="text-blue-500">.</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Crafting modern web applications, interactive user interfaces, and
              clean digital experiences.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-100">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              {["Home", "Projects", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Availability */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-100">
              Status
            </h4>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400">
                Available for freelance
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed pt-1">
              Have an idea or project in mind? Feel free to reach out via
              Telegram or email.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-zinc-400">
          <p>© {currentYear} YuTH Dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
