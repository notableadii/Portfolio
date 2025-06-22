// Create this file: src/components/AnimatedTextWithUnderline.tsx

"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AnimatedTextWithUnderline.module.css";

interface AnimatedTextWithUnderlineProps {
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
  underlineHeight?: number;
  animationDelay?: number;
  triggerStart?: string;
  direction?: "left" | "right"; // Direction the underline comes from
}

export default function AnimatedTextWithUnderline({
  children,
  className = "",
  underlineColor = "linear-gradient(90deg, #4a5568, #718096)",
  underlineHeight = 4,
  animationDelay = 0,
  triggerStart = "top 90%",
  direction = "right",
}: AnimatedTextWithUnderlineProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current && underlineRef.current) {
      // Set initial state
      gsap.set(textRef.current, { opacity: 0, y: 50 });
      gsap.set(underlineRef.current, { scaleX: 0 });

      // Set transform origin based on direction
      gsap.set(underlineRef.current, {
        transformOrigin: direction === "right" ? "right" : "left",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: triggerStart,
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Text animation
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
        delay: animationDelay,
      });

      // Underline animation
      tl.to(
        underlineRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.4"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === textRef.current) {
          trigger.kill();
        }
      });
    };
  }, [
    underlineColor,
    underlineHeight,
    animationDelay,
    triggerStart,
    direction,
  ]);

  return (
    <div className={`${styles.animatedText} ${className}`} ref={textRef}>
      {children}
      <div
        className={styles.underline}
        ref={underlineRef}
        style={{
          background: underlineColor,
          height: `${underlineHeight}px`,
        }}
      ></div>
    </div>
  );
}
