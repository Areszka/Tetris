import React from "react";
import { GameStatus } from "../Board/useBoard";
import styles from "./Header.module.css";

function Header({ gameStatus, score }: { gameStatus: GameStatus; score: number }) {
  return (
    <div className={styles.header}>
      <p>Game status : {gameStatus}</p>
      <p>Score: {score}</p>
    </div>
  );
}

export default React.memo(Header);
