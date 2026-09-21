"use client";

import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main >{children}</main>
    </div>
  );
}
