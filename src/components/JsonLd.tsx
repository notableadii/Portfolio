"use client";

import { useEffect } from "react";

export default function JsonLd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Aditya Shah",
        url: "next-portfolio-vert-seven.vercel.app",
        jobTitle: "Front-end Hobby Developer",
        description:
          "Front-end Hobby Developer specializing in Next.js, React, and modern web technologies",
        image: "https://yourwebsite.com/profile-image.jpg",
        sameAs: [
          "https://linkedin.com/in/adityashahh",
          "https://github.com/notableadii",
          "https://twitter.com/TheMostRealAdii",
          "https://instagram.com/ewww_adii",
        ],
        knowsAbout: [
          "JavaScript",
          "Python",
          "React",
          "Next.js",
          "Node.js",
          "Web Development",
        ],
      },
      null,
      2
    );

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
