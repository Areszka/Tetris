import { Shape } from "./shapes";

export const BOARD_HEIGHT = 10;
export const BOARD_WIDTH = 10;

const COLORS = {
  purple: 255,
  yellow: 45,
  green: 110,
  red: 0,
  lightblue: 185,
  blue: 240,
  orange: 24,
};

export const SHAPES: Array<Shape> = [
  {
    color: COLORS.yellow,
    squares: [
      { x: 0, y: 4 },
      { x: 0, y: 5 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
    ],
    origin: { x: 0.5, y: 4.5 },
  },
  {
    color: COLORS.lightblue,
    squares: [
      { x: 0, y: 3 },
      { x: 0, y: 4 },
      { x: 0, y: 5 },
      { x: 0, y: 6 },
    ],
    origin: { x: 0.5, y: 4.5 },
  },
  {
    color: COLORS.purple,
    squares: [
      { x: 0, y: 4 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
    ],
    origin: { x: 1, y: 4 },
  },
  {
    color: COLORS.green,
    squares: [
      { x: 0, y: 4 },
      { x: 0, y: 5 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
    ],
    origin: { x: 1, y: 4 },
  },
  {
    color: COLORS.red,
    squares: [
      { x: 0, y: 3 },
      { x: 0, y: 4 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
    ],
    origin: { x: 1, y: 4 },
  },
  {
    color: COLORS.blue,
    squares: [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
    ],
    origin: { x: 1, y: 4 },
  },
  {
    color: COLORS.orange,
    squares: [
      { x: 0, y: 5 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
    ],
    origin: { x: 1, y: 4 },
  },
];
