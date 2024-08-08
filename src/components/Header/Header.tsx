import React from "react";
import styles from "./Header.module.css";

function Header({ score }: { score: number }) {
  return (
    <div className={styles.header}>
      <p>Score: {score}</p>
    </div>
  );
}

export default React.memo(Header);
