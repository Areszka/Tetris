import React from "react";

import styles from "./Board.module.css";
import { BOARD_WIDTH } from "../../constants";
import { Board as BoardType } from "./useBoard";
import { Shape } from "../../shapes";

function Board({ board, currentShape }: { board: BoardType; currentShape: Shape }) {
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
