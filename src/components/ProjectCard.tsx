import React from "react";
import Image from "next/image";
import styles from "./ProjectCard.module.css";
// import imageSrc from "./images/project1.png";

interface ProjectCardProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  className = "",
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {title && <div className={styles.title}>{title}</div>}
    </div>
  );
};

export default ProjectCard;
