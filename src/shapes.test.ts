import { moveShapeDown, moveShapeLeft, moveShapeRight, rotateShape } from "./shapes";

describe("Shape", () => {
  const shape = {
    color: 45,
    squares: [
      { x: 0, y: 3 },
      { x: 0, y: 4 },
      { x: 0, y: 5 },
      { x: 0, y: 6 },
    ],
    origin: { x: 0.5, y: 4.5 },
  };

  test("should move left", () => {
    const movedShape = moveShapeLeft(shape);

    expect(movedShape).toStrictEqual({
      color: 45,
      squares: [
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 0, y: 5 },
      ],
      origin: { x: 0.5, y: 3.5 },
    });
  });

  test("should move right", () => {
    const movedShape = moveShapeRight(shape);

    expect(movedShape).toStrictEqual({
      color: 45,
      squares: [
        { x: 0, y: 4 },
        { x: 0, y: 5 },
        { x: 0, y: 6 },
        { x: 0, y: 7 },
      ],
      origin: { x: 0.5, y: 5.5 },
    });
  });

  test("should move down", () => {
    const movedShape = moveShapeDown(shape);

    expect(movedShape).toStrictEqual({
      color: 45,
      squares: [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 },
        { x: 1, y: 6 },
      ],
      origin: { x: 1.5, y: 4.5 },
    });
  });

  test("should rotate", () => {
    let rotatedShape = rotateShape(shape);

    expect(rotatedShape).toStrictEqual({
      color: 45,
      squares: [
        { x: -1, y: 5 },
        { x: 0, y: 5 },
        { x: 1, y: 5 },
        { x: 2, y: 5 },
      ],
      origin: { x: 0.5, y: 4.5 },
    });

    rotatedShape = rotateShape(rotatedShape);
    expect(rotatedShape).toStrictEqual({
      color: 45,
      squares: [
        { x: 1, y: 6 },
        { x: 1, y: 5 },
        { x: 1, y: 4 },
        { x: 1, y: 3 },
      ],
      origin: { x: 0.5, y: 4.5 },
    });

    rotatedShape = rotateShape(rotatedShape);
    expect(rotatedShape).toStrictEqual({
      color: 45,
      squares: [
        { x: 2, y: 4 },
        { x: 1, y: 4 },
        { x: 0, y: 4 },
        { x: -1, y: 4 },
      ],
      origin: { x: 0.5, y: 4.5 },
    });

    rotatedShape = rotateShape(rotatedShape);
    expect(rotatedShape).toStrictEqual({
      color: 45,
      squares: [
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 0, y: 5 },
        { x: -0, y: 6 },
      ],
      origin: { x: 0.5, y: 4.5 },
    });
  });
});
