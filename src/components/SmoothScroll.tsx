// components/SmoothScroll.tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Create a ref to store the Lenis instance
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with configuration options
    const lenis = new Lenis({
      duration: 1.2, // Animation duration in seconds (how long scroll takes)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function for smooth acceleration/deceleration
      touchMultiplier: 2, // Multiplier for touch events
      infinite: false, // Disable infinite scrolling
    });

    // Store the Lenis instance in our ref
    lenisRef.current = lenis;

    // Create the animation loop function
    function raf(time: number) {
      // Update Lenis on each animation frame
      lenis.raf(time);
      // Request the next animation frame to keep the loop running
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Optional: Add scroll event listener for debugging or additional functionality
    lenis.on("scroll", (e: any) => {
      // Uncomment the line below to see scroll progress in console
      // console.log('Scroll progress:', e.progress);
    });

    // Cleanup function to destroy Lenis instance when component unmounts
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Return children as-is (Lenis works globally once initialized)
  return <>{children}</>;
}
