import styles from "./NavBar.module.css";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className={styles.logo}>
      <Link href="/">aditya</Link>
    </div>
  );
}
