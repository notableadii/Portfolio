"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollSplitTextProps {
  children: string;
  className?: string;
  trigger?: "top" | "center" | "bottom";
  duration?: number;
  stagger?: number;
  delay?: number;
  splitType?: "words" | "lines" | "both";
  animationType?: "slideUp" | "fadeIn" | "slideRight" | "slideLeft" | "scale";
  ease?: string;
}

export default function ScrollSplitText({
  children,
  className = "",
  trigger = "center",
  duration = 0.8,
  stagger = 0.1,
  delay = 0,
  splitType = "both",
  animationType = "slideUp",
  ease = "expo.out",
}: ScrollSplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      const element = textRef.current;

      // Advanced text splitting function
      const splitText = (el: HTMLElement) => {
        const text = el.textContent || "";
        const words = text.split(" ");

        el.innerHTML = "";

        const allElements: HTMLElement[] = [];
        let currentLine = document.createElement("div");
        currentLine.className = "split-line";
        currentLine.style.overflow = "hidden";
        currentLine.style.display = "block";

        let lineText = "";
        let wordCount = 0;

        words.forEach((word, index) => {
          const testText = lineText ? `${lineText} ${word}` : word;

          // Create test element for width measurement
          const testSpan = document.createElement("span");
          testSpan.textContent = testText;
          testSpan.style.visibility = "hidden";
          testSpan.style.position = "absolute";
          testSpan.style.whiteSpace = "nowrap";
          // Copy font styles for accurate measurement
          const computedStyle = window.getComputedStyle(el);
          testSpan.style.fontSize = computedStyle.fontSize;
          testSpan.style.fontFamily = computedStyle.fontFamily;
          testSpan.style.fontWeight = computedStyle.fontWeight;
          document.body.appendChild(testSpan);

          const testWidth = testSpan.offsetWidth;
          const containerWidth = Math.min(
            el.offsetWidth || window.innerWidth * 0.8,
            window.innerWidth * 0.9
          );

          document.body.removeChild(testSpan);

          // Check if we need a new line
          if (testWidth > containerWidth && lineText !== "") {
            // Finish current line
            if (splitType === "words" || splitType === "both") {
              // Split line into individual words
              const lineWords = lineText.split(" ");
              const lineContainer = document.createElement("div");
              lineContainer.className = "split-line";
              lineContainer.style.overflow = "hidden";
              lineContainer.style.display = "block";

              lineWords.forEach((lineWord, wordIndex) => {
                const wordSpan = document.createElement("span");
                wordSpan.className = "split-word";
                wordSpan.textContent =
                  lineWord + (wordIndex < lineWords.length - 1 ? " " : "");
                wordSpan.style.display = "inline-block";
                lineContainer.appendChild(wordSpan);
                allElements.push(wordSpan);
              });

              el.appendChild(lineContainer);
            } else {
              // Just split by lines
              currentLine.innerHTML = `<span class="split-line-content">${lineText}</span>`;
              allElements.push(
                currentLine.querySelector(".split-line-content") as HTMLElement
              );
              el.appendChild(currentLine);
            }

            // Start new line
            currentLine = document.createElement("div");
            currentLine.className = "split-line";
            currentLine.style.overflow = "hidden";
            currentLine.style.display = "block";
            lineText = word;
            wordCount++;
          } else {
            lineText = testText;
          }

          // Handle last word
          if (index === words.length - 1) {
            if (splitType === "words" || splitType === "both") {
              const lineWords = lineText.split(" ");
              const lineContainer = document.createElement("div");
              lineContainer.className = "split-line";
              lineContainer.style.overflow = "hidden";
              lineContainer.style.display = "block";

              lineWords.forEach((lineWord, wordIndex) => {
                const wordSpan = document.createElement("span");
                wordSpan.className = "split-word";
                wordSpan.textContent =
                  lineWord + (wordIndex < lineWords.length - 1 ? " " : "");
                wordSpan.style.display = "inline-block";
                lineContainer.appendChild(wordSpan);
                allElements.push(wordSpan);
              });

              el.appendChild(lineContainer);
            } else {
              currentLine.innerHTML = `<span class="split-line-content">${lineText}</span>`;
              allElements.push(
                currentLine.querySelector(".split-line-content") as HTMLElement
              );
              el.appendChild(currentLine);
            }
          }
        });

        return allElements;
      };

      // Set initial state and create animation based on type
      const getInitialState = () => {
        switch (animationType) {
          case "slideUp":
            return { y: "100%", opacity: 0 };
          case "slideRight":
            return { x: "-100%", opacity: 0 };
          case "slideLeft":
            return { x: "100%", opacity: 0 };
          case "scale":
            return { scale: 0, opacity: 0 };
          case "fadeIn":
          default:
            return { opacity: 0 };
        }
      };

      const getFinalState = () => {
        switch (animationType) {
          case "slideUp":
            return { y: "0%", opacity: 1 };
          case "slideRight":
          case "slideLeft":
            return { x: "0%", opacity: 1 };
          case "scale":
            return { scale: 1, opacity: 1 };
          case "fadeIn":
          default:
            return { opacity: 1 };
        }
      };

      // Wait for fonts and layout
      document.fonts.ready.then(() => {
        // Small delay to ensure layout is complete
        setTimeout(() => {
          const elements = splitText(element);

          // Set initial state
          gsap.set(elements, getInitialState());

          // Create scroll trigger animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: `top ${
                trigger === "top" ? "90%" : trigger === "center" ? "75%" : "60%"
              }`,
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              // markers: true, // Uncomment for debugging
            },
          });

          tl.to(elements, {
            duration: duration,
            ...getFinalState(),
            stagger: stagger,
            ease: ease,
            delay: delay,
          });
        }, 100);
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [trigger, duration, stagger, delay, splitType, animationType, ease]);

  return (
    <div
      ref={textRef}
      className={`scroll-split-text ${className}`}
      style={{
        willChange: "transform",
        opacity: 1, // Keep visible for measurement
      }}
    >
      {children}
    </div>
  );
}

// Usage Examples:

// Basic usage:
// <ScrollSplitText>
//   This text will split and animate on scroll!
// </ScrollSplitText>

// Advanced usage:
// <ScrollSplitText
//   className="text-4xl font-bold"
//   trigger="center"
//   duration={1.2}
//   stagger={0.08}
//   delay={0.2}
//   splitType="words"
//   animationType="slideUp"
//   ease="back.out(1.7)"
// >
//   Your epic scroll-triggered split text animation!
// </ScrollSplitText>
