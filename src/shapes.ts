import { SHAPES } from "./constants";

export type Shape = {
  color?: number;
  squares: Array<Square>;
  rotate: () => Shape;
  moveRight: () => void;
  moveLeft: () => void;
  moveDown: () => void;
};

type Square = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
};

export function getRandomShape() {
  const randomInt = Math.floor(Math.random() * SHAPES.length);

  return SHAPES[randomInt];
}

export function createShape({
  color,
  squares,
  isAxisInMiddleBlock,
}: {
  color: number;
  squares: Array<Square>;
  isAxisInMiddleBlock: boolean;
}) {
  const nextShape: Shape = {
    color: color,
    squares: squares,
    rotate: function () {
      this.squares = rotateShape(this.squares, isAxisInMiddleBlock);
      return this;
    },
    moveRight: function () {
      this.squares = this.squares.map(({ y, ...rest }) => ({ y: y + 1, ...rest }));
    },
    moveLeft: function () {
      this.squares = this.squares.map(({ y, ...rest }) => ({ y: y - 1, ...rest }));
    },

    moveDown: function () {
      this.squares = this.squares.map(({ x, ...rest }) => ({ x: x + 1, ...rest }));
    },
  };

  return nextShape;
}

function rotateShape(squares: Array<Square>, isAxisInMiddleBlock: boolean) {
  let rotatedShape;

  if (isAxisInMiddleBlock) {
    rotatedShape = squares.map((square) => rotateRelativelyToCenterSquare(square));
  } else {
    rotatedShape = squares.map((square) => rotateSquare(square));
  }

  return rotatedShape;
}

function rotateRelativelyToCenterSquare(square: Square) {
  const baseX = square.baseX;
  const baseY = square.baseY;

  if (baseX === 0 && baseY === 0) return square;
  if (baseX === -1 && baseY === -1) return getRotatedSquare(square, 0, 2);
  if (baseX === -1 && baseY === 0) return getRotatedSquare(square, 1, 1);
  if (baseX === -1 && baseY === 1) return getRotatedSquare(square, 2, 0);
  if (baseX === 0 && baseY === -1) return getRotatedSquare(square, -1, 1);
  if (baseX === 0 && baseY === 1) return getRotatedSquare(square, 1, -1);
  if (baseX === 1 && baseY === -1) return getRotatedSquare(square, -2, 0);
  if (baseX === 1 && baseY === 0) return getRotatedSquare(square, -1, -1);
  if (baseX === 1 && baseY === 1) return getRotatedSquare(square, 0, -2);

  throw Error(`Cannot rotate square with baseX: ${baseX} and baseY: ${baseY}`);
}

function rotateSquare(square: Square) {
  const baseX = square.baseX;
  const baseY = square.baseY;

  if (baseX === -2 && baseY === -2) return getRotatedSquare(square, 0, 3);
  if (baseX === -2 && baseY === -1) return getRotatedSquare(square, 1, 2);
  if (baseX === -1 && baseY === -2) return getRotatedSquare(square, -1, 2);
  if (baseX === -1 && baseY === -1) return getRotatedSquare(square, 0, 1);
  if (baseX === -2 && baseY === 0) return getRotatedSquare(square, 2, 1);
  if (baseX === -2 && baseY === 1) return getRotatedSquare(square, 3, 0);
  if (baseX === -1 && baseY === 0) return getRotatedSquare(square, 1, 0);
  if (baseX === -1 && baseY === 1) return getRotatedSquare(square, 2, -1);
  if (baseX === 0 && baseY === 0) return getRotatedSquare(square, 0, -1);
  if (baseX === 0 && baseY === 1) return getRotatedSquare(square, 1, -2);
  if (baseX === 1 && baseY === 0) return getRotatedSquare(square, -1, -2);
  if (baseX === 1 && baseY === 1) return getRotatedSquare(square, 0, -3);
  if (baseX === 0 && baseY === -2) return getRotatedSquare(square, -2, 1);
  if (baseX === 0 && baseY === -1) return getRotatedSquare(square, -1, 0);
  if (baseX === 1 && baseY === -2) return getRotatedSquare(square, -3, 0);
  if (baseX === 1 && baseY === -1) return getRotatedSquare(square, -2, -1);

  throw Error(`Cannot rotate square with baseX: ${baseX} and baseY: ${baseY}`);
}

function getRotatedSquare(square: Square, shiftX: number, shiftY: number): Square {
  const newX = square.x + shiftX;
  const newY = square.y + shiftY;
  const newBaseX = square.baseX + shiftX;
  const newBaseY = square.baseY + shiftY;

  return { baseX: newBaseX, baseY: newBaseY, x: newX, y: newY };
}
