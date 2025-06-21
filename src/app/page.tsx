"use client";
import Image from "next/image";
import styles from "./page.module.css";
import MultilingualLoader from "../components/MultilingualLoader";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  function handleLoadingComplete() {
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && (
        <MultilingualLoader onLoadingComplete={handleLoadingComplete} />
      )}
      <div className={styles.container}>
        <div className={styles.h1}>Hey, I'm Aditya Shah</div>
        <div className={styles.subtext}>
          Business-minded. Tech-driven. Obsessed with execution.
        </div>
      </div>
    </>
  );
}
