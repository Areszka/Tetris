import React from "react";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../constants";
import { Shape, getRandomShape } from "../../shapes";
import useKeydown from "../../hooks/use-keydown";

type BoardSquare = { isOccupied: boolean; color?: number };

export type Board = Array<Array<BoardSquare>>;

export type ArrowKey = "left" | "right" | "down" | "up";

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
  const [score, setScore] = React.useState<number>(0);

  useKeydown("ArrowRight", () => handleArrowKey("right"));
  useKeydown("ArrowLeft", () => handleArrowKey("left"));
  useKeydown("ArrowUp", () => handleArrowKey("up"));

  React.useEffect(() => {
    if (gameStatus === "running") {
      const intervalId = setInterval(() => {
        setTimer((t) => t + 1);
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [gameStatus]);

  React.useEffect(() => {
    handleShapeDrop();
  }, [timer]);

  function handleShapeDrop() {
    if (gameStatus !== "running") {
      return;
    }

    const blockCanGoDown = checkIfShapeCanMoveDown(board, currentShape);

    if (blockCanGoDown) {
      moveCurrentShape("down");
    } else {
      addBlock();
      const nextShape = getRandomShape();
      const nextShapeOverlapsWithCurrentShape = checkIfTwoShapesOverlaps(currentShape, nextShape);

      if (nextShapeOverlapsWithCurrentShape) {
        setGameStatus("lost");
      } else {
        setCurrentShape(nextShape);
      }
    }
  }

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
      setScore((currentScore) => currentScore + indexesOfFullRows.length * 100);
      setBoard(nextBoard);
    }
  }, [board]);

  function moveCurrentShape(direction: ArrowKey) {
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
      default: {
        console.error(`Direction ${direction} is not supported`);
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

  const handleArrowKey = (key: ArrowKey) => {
    if (gameStatus !== "running") {
      return;
    }
    if (key === "up") {
      rotateShape();
    } else {
      moveCurrentShape(key);
    }
  };

  function toggleGameStatus() {
    if (gameStatus === "running") {
      setGameStatus("paused");
    } else {
      setGameStatus("running");
    }
  }

  function resetGame() {
    setBoard(initialBoard);
    setCurrentShape(() => getRandomShape());
    setGameStatus("running");
    setScore(0);
  }

  return {
    board,
    currentShape,
    gameStatus,
    resetGame,
    score,
    toggleGameStatus,
  };
}

function checkIfShapeOverlapsWithPreviousShapes(board: Board, shape: Shape) {
  return shape.squares.some(({ x, y }) => {
    const shapeIsBeyondBoard = x < 0 || y < 0 || x >= BOARD_HEIGHT || y >= BOARD_WIDTH;

    return shapeIsBeyondBoard || board[x][y].isOccupied;
  });
}

function checkIfShapeCanMoveDown(board: Board, shape: Shape) {
  const nextShape: Shape = { ...shape };

  nextShape.moveDown();
  return !checkIfShapeOverlapsWithPreviousShapes(board, nextShape);
}

function checkIfTwoShapesOverlaps(shapeOne: Shape, shapeTwo: Shape) {
  const shapesOverlap = shapeOne.squares.some(({ x: nextX, y: nextY }) =>
    shapeTwo.squares.some(({ x, y }) => x === nextX && y === nextY)
  );
  return shapesOverlap;
}
