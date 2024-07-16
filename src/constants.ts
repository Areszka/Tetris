import { Shape, createShape } from "./shapes";

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
  createShape({
    color: COLORS.yellow,
    squares: [
      { baseX: -1, baseY: -1, x: 0, y: 4 },
      { baseX: -1, baseY: 0, x: 0, y: 5 },
      { baseX: 0, baseY: -1, x: 1, y: 4 },
      { baseX: 0, baseY: 0, x: 1, y: 5 },
    ],
    isAxisInMiddleBlock: false,
  }),

  createShape({
    color: COLORS.lightblue,
    squares: [
      { baseX: -1, baseY: -2, x: 0, y: 3 },
      { baseX: -1, baseY: -1, x: 0, y: 4 },
      { baseX: -1, baseY: 0, x: 0, y: 5 },
      { baseX: -1, baseY: 1, x: 0, y: 6 },
    ],
    isAxisInMiddleBlock: false,
  }),

  createShape({
    color: COLORS.purple,
    squares: [
      { baseX: -1, baseY: 0, x: 0, y: 5 },
      { baseX: 0, baseY: -1, x: 1, y: 4 },
      { baseX: 0, baseY: 0, x: 1, y: 5 },
      { baseX: 0, baseY: 1, x: 1, y: 6 },
    ],
    isAxisInMiddleBlock: true,
  }),
  createShape({
    color: COLORS.green,
    squares: [
      { baseX: -1, baseY: 0, x: 0, y: 4 },
      { baseX: -1, baseY: 1, x: 0, y: 5 },
      { baseX: 0, baseY: -1, x: 1, y: 3 },
      { baseX: 0, baseY: 0, x: 1, y: 4 },
    ],
    isAxisInMiddleBlock: true,
  }),
  createShape({
    color: COLORS.red,
    squares: [
      { baseX: -1, baseY: -1, x: 0, y: 3 },
      { baseX: -1, baseY: 0, x: 0, y: 4 },
      { baseX: 0, baseY: 0, x: 1, y: 4 },
      { baseX: 0, baseY: 1, x: 1, y: 5 },
    ],
    isAxisInMiddleBlock: true,
  }),
  createShape({
    color: COLORS.blue,
    squares: [
      { baseX: -1, baseY: -1, x: 0, y: 3 },
      { baseX: 0, baseY: -1, x: 1, y: 3 },
      { baseX: 0, baseY: 0, x: 1, y: 4 },
      { baseX: 0, baseY: 1, x: 1, y: 5 },
    ],
    isAxisInMiddleBlock: true,
  }),
  createShape({
    color: COLORS.orange,
    squares: [
      { baseX: -1, baseY: 1, x: 0, y: 5 },
      { baseX: 0, baseY: -1, x: 1, y: 3 },
      { baseX: 0, baseY: 0, x: 1, y: 4 },
      { baseX: 0, baseY: 1, x: 1, y: 5 },
    ],
    isAxisInMiddleBlock: true,
  }),
];
