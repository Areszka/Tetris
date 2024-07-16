import React from "react";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../constants";
import { Shape, getRandomShape } from "../../shapes";
import useKeydown from "../../hooks/use-keydown";

export type Board = Array<Array<BoardSquare>>;

type BoardSquare = { isOccupied: boolean; color?: number };

export type Direction = "left" | "right" | "down";

export type GameStatus = "running" | "lost" | "paused";

const initialBoard = Array(BOARD_HEIGHT)
  .fill(0)
  .map(() =>
    Array<BoardSquare>(BOARD_WIDTH).fill({
      isOccupied: false,
    })
  );

export default function useBoard() {
  const [board, setBoard] = React.useState<Board>(initialBoard);
  const [currentShape, setCurrentShape] = React.useState<Shape>(() => getRandomShape());
  const [gameStatus, setGameStatus] = React.useState<GameStatus>("running");
  const [timer, setTimer] = React.useState<number>(0);

  React.useEffect(() => {
    if (gameStatus === "running") {
      const intervalId = setInterval(() => {
        setTimer((t) => t + 1);
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [gameStatus]);

  React.useEffect(() => {
    if (gameStatus === "running") {
      const blockCanGoDown = checkIfCurrentShapeCanMoveDown();

      if (blockCanGoDown) {
        moveCurrentShape("down");
      } else {
        addBlock();
        const nextShape = getRandomShape();
        const nextBlockOverlaps = checkIfBlockOverlaps({
          currentShape: currentShape,
          nextShape: nextShape,
        });

        if (nextBlockOverlaps) {
          setGameStatus("lost");
        } else {
          setCurrentShape(nextShape);
        }
      }
    }
  }, [timer]);

  const handleArrowKey = (direction: Direction) => {
    if (gameStatus !== "running") {
      return;
    }
    moveCurrentShape(direction);
  };

  useKeydown("ArrowRight", () => handleArrowKey("right"));
  useKeydown("ArrowLeft", () => handleArrowKey("left"));
  useKeydown("ArrowUp", () => {
    if (gameStatus !== "running") {
      return;
    }
    console.log("ONE");
    rotateShape();
  });

  React.useEffect(() => {
    const nextBoard: Board = JSON.parse(JSON.stringify(board));
    const indexesOfFullRows = [];

    for (let i = 0; i < BOARD_HEIGHT; i++) {
      const rowIsComplete = board[i].every((square) => square.isOccupied);
      if (rowIsComplete) {
        indexesOfFullRows.push(i);
      }
    }

    indexesOfFullRows.forEach((index) => {
      for (let x = index; x >= 0; x--) {
        for (let i = 0; i < BOARD_WIDTH; i++) {
          if (x === 0) {
            nextBoard[x][i] = { isOccupied: false };
          } else {
            nextBoard[x][i] = nextBoard[x - 1][i];
          }
        }
      }
    });

    if (indexesOfFullRows.length > 0) {
      setBoard(nextBoard);
    }
  }, [board]);

  function moveCurrentShape(direction: Direction) {
    const nextShape: Shape = { ...currentShape };

    switch (direction) {
      case "down":
        nextShape.moveDown();
        break;
      case "left":
        nextShape.moveLeft();
        break;
      case "right": {
        nextShape.moveRight();
        break;
      }
    }

    if (!checkIfShapeOverlapsWithPreviousShapes(board, nextShape)) {
      setCurrentShape(nextShape);
    }
  }

  function rotateShape() {
    const rotatedShape: Shape = { ...currentShape }.rotate();

    const rotatedShapeOverlapsWithBoard = checkIfShapeOverlapsWithPreviousShapes(
      board,
      rotatedShape
    );

    if (!rotatedShapeOverlapsWithBoard) {
      setCurrentShape(rotatedShape);
    }
  }

  function addBlock() {
    setBoard((currentBoard) => {
      const nextBoard: Board = JSON.parse(JSON.stringify(currentBoard));
      currentShape.squares.forEach(({ x, y }) => {
        nextBoard[x][y].isOccupied = true;
        nextBoard[x][y].color = currentShape.color;
      });
      return nextBoard;
    });
  }

  function checkIfCurrentShapeCanMoveDown() {
    const nextShape: Shape = { ...currentShape };

    nextShape.moveDown();
    return !checkIfShapeOverlapsWithPreviousShapes(board, nextShape);
  }

  function checkIfBlockOverlaps({
    nextShape,
    currentShape,
  }: {
    nextShape: Shape;
    currentShape: Shape;
  }) {
    const shapeOverlapsWithBoard = nextShape.squares.some(({ x, y }) => board[x][y].isOccupied);
    const currentShapeOverlapsWithNextShape = nextShape.squares.some(({ x: nextX, y: nextY }) =>
      currentShape.squares.some(({ x, y }) => x === nextX && y === nextY)
    );
    return shapeOverlapsWithBoard || currentShapeOverlapsWithNextShape;
  }

  return {
    board,
    currentShape,
    gameStatus,
  };
}

function checkIfShapeOverlapsWithPreviousShapes(board: Board, shape: Shape) {
  return shape.squares.some(({ x, y }) => {
    const shapeIsBeyondBoard = x < 0 || y < 0 || x >= BOARD_HEIGHT || y >= BOARD_WIDTH;

    return shapeIsBeyondBoard || board[x][y].isOccupied;
  });
}
