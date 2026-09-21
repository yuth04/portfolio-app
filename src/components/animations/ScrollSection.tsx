"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ScrollSection({
  children,
  className = "",
  id,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of each section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll transformations for opacity, position, and slight scaling
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95],
  );

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{
        opacity,
        y,
        scale,
      }}
      className={`transition-colors duration-500 ${className}`}
    >
      {children}
    </motion.section>
  );
}
