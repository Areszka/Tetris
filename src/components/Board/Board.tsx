import React from "react";

import styles from "./Board.module.css";
import { BOARD_WIDTH } from "../../constants";
import { Board as BoardType, GameStatus } from "./useBoard";
import { Shape } from "../../shapes";

function Board({
  board,
  currentShape,
  gameStatus,
}: {
  board: BoardType;
  currentShape: Shape;
  gameStatus: GameStatus;
}) {
  const wrapperStyle = { "--columns": BOARD_WIDTH } as React.CSSProperties;

  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      {board.map((rows, x) => {
        return rows.map((space, y) => {
          let squareColor = space.color;

          for (const square of currentShape.squares) {
            if (square.x === x && square.y === y) {
              squareColor = currentShape.color;
            }
          }
          return <Square color={squareColor} key={`${x}${y}`} />;
        });
      })}
      {gameStatus === "paused" && <div className={styles.overlay}>Paused</div>}
    </div>
  );
}

function Square({ color }: { color?: number }) {
  return (
    <div
      className={`${styles.square} ${color !== undefined ? styles.colored : ""}`}
      style={
        {
          "--color": color,
        } as React.CSSProperties
      }
    ></div>
  );
}

export default Board;
