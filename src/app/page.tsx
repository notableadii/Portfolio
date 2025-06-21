"use client";
import Image from "next/image";
import styles from "./page.module.css";
import MultilingualLoader from "../components/MultilingualLoader";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
// import ScrollTextAnimation from "@/components/ScrollTextAnimation";
// import ScrollSplitText from "@/components/ScrollTextAnimation";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const h1Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const newtextRef = useRef<HTMLDivElement>(null);
  const destextRef = useRef<HTMLDivElement>(null);
  const aboutheaderRef = useRef<HTMLDivElement>(null);
  function handleLoadingComplete() {
    setIsLoading(false);
  }

  useEffect(() => {
    // Register the SplitText plugin
    gsap.registerPlugin(SplitText);

    // Only run animation after loading is complete and fonts are ready
    // if (!isLoading) {
    //   document.fonts.ready.then(() => {
    // Animation for h1
    if (h1Ref.current) {
      // Set initial opacity
      gsap.set(h1Ref.current, { opacity: 1 });

      // Create split text animation
      const splitH1 = new SplitText(h1Ref.current, {
        type: "words,lines",
        linesClass: "line",
      });

      // Create mask effect by setting overflow hidden on lines
      gsap.set(".line", { overflow: "hidden" });

      // Animate from bottom with stagger
      gsap.from(splitH1.lines, {
        duration: 0.8,
        yPercent: 100,
        opacity: 0,
        stagger: 0.15,
        ease: "expo.out",
      });
    }

    // Animation for subtext with slight delay
    if (subtextRef.current) {
      gsap.set(subtextRef.current, { opacity: 1 });

      const splitSubtext = new SplitText(subtextRef.current, {
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
        delay: 0.3, // Slight delay after h1 starts
      });
    }

    // destext animation
    if (destextRef.current) {
      gsap.set(destextRef.current, { opacity: 1 });

      const splitSubtext = new SplitText(destextRef.current, {
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
        delay: 0.5, // Slight delay after h1 starts
      });
    }

    // About header animation (optional, similar to destext)
    if (aboutheaderRef.current) {
      gsap.set(aboutheaderRef.current, { opacity: 1 });
      // Add animation here if needed
    }
  });
  // }, [isLoading]);

  return (
    <>
      {/* {isLoading && (
        <MultilingualLoader onLoadingComplete={handleLoadingComplete} />
      )} */}
      <div className={styles.container}>
        <NavBar />
        <div className={`${styles.h1} ${styles.split}`} ref={h1Ref}>
          Hi, I'm Aditya Shah
        </div>
        <div className={`${styles.subtext} ${styles.split}`} ref={subtextRef}>
          Business Owner & Front-end Dev
        </div>
        <div className={`${styles.destext} ${styles.split}`} ref={destextRef}>
          Running traditional businesses while building future-ready systems.
          Focused on growth, efficiency, and tech-powered execution.
        </div>
        <div
          className={`${styles.aboutheader} ${styles.split}`}
          ref={aboutheaderRef}
        >
          About Me
        </div>
        <div className={styles.subabout}>
          <div className={styles.text1}>
            I'm Aditya Shah — a business-minded tech enthusiast currently
            pursuing my BBA in India. While my academic focus is on business, my
            free time is all about creativity and problem-solving through code.
          </div>{" "}
          <div className={styles.text2}>
            {" "}
            I build websites for fun, explore emerging technologies, and love
            experimenting with tools like Python, JavaScript, and frameworks
            like Next.js. I'm also stepping into the world of entrepreneurship
            by helping scale my family businesses
          </div>
        </div>
      </div>
    </>
  );
}
