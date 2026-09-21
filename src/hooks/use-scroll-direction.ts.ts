"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface ScrollOptions {
  threshold?: number; // Distance in px before triggering hide (default: 100)
}

export function useScrollDirection({ threshold = 100 }: ScrollOptions = {}) {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Check if scrolled past threshold
    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Determine direction past threshold
    if (latest > previous && latest > threshold) {
      setScrollDirection("down");
    } else if (latest < previous) {
      setScrollDirection("up");
    }
  });

  return {
    scrollDirection,
    isScrolled,
    isHidden: scrollDirection === "down",
    scrollY,
  };
}