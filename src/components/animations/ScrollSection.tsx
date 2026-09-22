"use client";

import { ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function ScrollSection({ children, id, className }: ScrollSectionProps) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}