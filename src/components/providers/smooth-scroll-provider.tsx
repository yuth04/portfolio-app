"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import React from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<any>(null);

  // Synchronize Lenis scrolling with Framer Motion frame loop
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time);
    }

    // Pass time to Lenis RAF on every animation frame
    requestAnimationFrame(update);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false} // Disable Lenis internal RAF loop to prevent double updates
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
