"use client";
import styles from "./NavBar.module.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NavBar() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register the SplitText plugin
    gsap.registerPlugin(SplitText, ScrollTrigger);

    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 1 });

      const splitSubtext = new SplitText(logoRef.current, {
        type: "words,lines",
        linesClass: "line-subtext",
      });

      gsap.set(".line-subtext", { overflow: "hidden" });

      gsap.from(splitSubtext.lines, {
        duration: 0.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.3,
      });
    }
  }, []);

  return (
    <div className={styles.logo} ref={logoRef}>
      <Link href="/">aditya</Link>
    </div>
  );
}
