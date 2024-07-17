import { SHAPES } from "./constants";

export type Shape = {
  color?: number;
  squares: Array<Coordinates>;
  origin: Coordinates;
};

type Coordinates = {
  x: number;
  y: number;
};

export function getRandomShape(): Shape {
  const randomInt = Math.floor(Math.random() * SHAPES.length);

  return SHAPES[randomInt];
}

export function rotateShape({ squares, origin, color }: Shape) {
  const beta = (-90 * Math.PI) / 180.0;
  const rotatedSquares: Array<Coordinates> = [];

  squares.forEach((square) => {
    const x0 = square.x - origin.x;
    const y0 = square.y - origin.y;
    const xDash = x0 * Math.cos(beta) - y0 * Math.sin(beta) + origin.x;
    const yDash = x0 * Math.sin(beta) + y0 * Math.cos(beta) + origin.y;

    rotatedSquares.push({ x: Math.round(xDash), y: Math.round(yDash) });
  });

  return { squares: rotatedSquares, origin, color };
}

export function moveShapeDown({ squares, origin, color }: Shape) {
  const newOrigin = { x: origin.x + 1, y: origin.y };
  const newSquares = squares.map(({ x, ...rest }) => {
    return { x: x + 1, ...rest };
  });

  return { squares: newSquares, origin: newOrigin, color };
}

export function moveShapeLeft({ squares, origin, color }: Shape) {
  const newOrigin = { x: origin.x, y: origin.y - 1 };
  const newSquares = squares.map(({ y, ...rest }) => {
    return { y: y - 1, ...rest };
  });

  return { squares: newSquares, origin: newOrigin, color };
}

export function moveShapeRight({ squares, origin, color }: Shape) {
  const newOrigin = { x: origin.x, y: origin.y + 1 };
  const newSquares = squares.map(({ y, ...rest }) => {
    return { y: y + 1, ...rest };
  });

  return { squares: newSquares, origin: newOrigin, color };
}
