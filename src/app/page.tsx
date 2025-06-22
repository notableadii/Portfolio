"use client";
import Image from "next/image";
import styles from "./page.module.css";
import MultilingualLoader from "../components/MultilingualLoader";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const h1Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const newtextRef = useRef<HTMLDivElement>(null);
  const destextRef = useRef<HTMLDivElement>(null);
  const aboutheaderRef = useRef<HTMLDivElement>(null);
  const fixRef = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  function handleLoadingComplete() {
    setIsLoading(false);
  }

  useEffect(() => {
    // Register the plugins
    gsap.registerPlugin(SplitText, ScrollTrigger);

    // Store animations for cleanup
    const animations: gsap.core.Tween[] = [];

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Animation for h1
      if (h1Ref.current) {
        // Make sure element is visible first
        gsap.set(h1Ref.current, { opacity: 1 });

        const splitH1 = new SplitText(h1Ref.current, {
          type: "words,lines",
          linesClass: "line-h1",
        });

        gsap.set(".line-h1", { overflow: "hidden" });

        const h1Anim = gsap.from(splitH1.lines, {
          duration: 0.8,
          yPercent: 100,
          opacity: 0,
          stagger: 0.15,
          ease: "expo.out",
        });
        animations.push(h1Anim);
      }

      // Animation for subtext with slight delay
      if (subtextRef.current) {
        gsap.set(subtextRef.current, { opacity: 1 });

        const splitSubtext = new SplitText(subtextRef.current, {
          type: "words,lines",
          linesClass: "line-subtext",
        });

        gsap.set(".line-subtext", { overflow: "hidden" });

        const subtextAnim = gsap.from(splitSubtext.lines, {
          duration: 0.6,
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "expo.out",
          delay: 0.3,
        });
        animations.push(subtextAnim);
      }

      // destext animation
      if (destextRef.current) {
        gsap.set(destextRef.current, { opacity: 1 });

        const splitDestext = new SplitText(destextRef.current, {
          type: "words,lines",
          linesClass: "line-destext",
        });

        gsap.set(".line-destext", { overflow: "hidden" });

        const destextAnim = gsap.from(splitDestext.lines, {
          duration: 0.6,
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "expo.out",
          delay: 0.5,
        });
        animations.push(destextAnim);
      }

      // About header animation with scroll trigger
      if (aboutheaderRef.current) {
        console.log("Setting up aboutheader animation");

        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutheaderRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => console.log("About header entered"),
            onLeave: () => console.log("About header left"),
          },
        });

        aboutTl.fromTo(
          aboutheaderRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
        );
      }

      // Fixed animation for first text paragraph
      if (fixRef.current) {
        console.log("Setting up fixRef animation");

        const text1Tl = gsap.timeline({
          scrollTrigger: {
            trigger: fixRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => console.log("Text1 entered"),
            onLeave: () => console.log("Text1 left"),
          },
        });

        text1Tl.fromTo(
          fixRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
        );
      }

      // Animation for second text paragraph
      if (text2Ref.current) {
        console.log("Setting up text2Ref animation");

        const text2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: text2Ref.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => console.log("Text2 entered"),
            onLeave: () => console.log("Text2 left"),
          },
        });

        text2Tl.fromTo(
          text2Ref.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: 0.2 }
        );
      }

      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      animations.forEach((anim) => anim.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Alternative: Make sure text is visible on component mount
  useEffect(() => {
    // Fallback to ensure text is always visible
    const fallbackTimer = setTimeout(() => {
      if (fixRef.current && gsap.getProperty(fixRef.current, "opacity") === 0) {
        console.log("Fallback: Making text1 visible");
        gsap.set(fixRef.current, { opacity: 1 });
      }
      if (
        text2Ref.current &&
        gsap.getProperty(text2Ref.current, "opacity") === 0
      ) {
        console.log("Fallback: Making text2 visible");
        gsap.set(text2Ref.current, { opacity: 1 });
      }
      if (
        aboutheaderRef.current &&
        gsap.getProperty(aboutheaderRef.current, "opacity") === 0
      ) {
        console.log("Fallback: Making about header visible");
        gsap.set(aboutheaderRef.current, { opacity: 1 });
      }
    }, 2000); // 2 second fallback

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
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
      </div>
      <div className={styles.container}>
        <div
          className={`${styles.aboutheader} ${styles.split}`}
          ref={aboutheaderRef}
        >
          about me
        </div>
        <div className={styles.subabout}>
          <div className={styles.text1} ref={fixRef}>
            I'm Aditya Shah — a business-minded tech enthusiast currently
            pursuing my BBA in India. While my academic focus is on business, my
            free time is all about creativity and problem-solving through code.
          </div>
          <div className={styles.text2} ref={text2Ref}>
            I build websites for fun, explore emerging technologies, and love
            experimenting with tools like Python, JavaScript, and frameworks
            like Next.js. I'm also stepping into the world of entrepreneurship
            by helping scale my family businesses
          </div>
        </div>

        <div>Featured Projects</div>
      </div>
    </>
  );
}
