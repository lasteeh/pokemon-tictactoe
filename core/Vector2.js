export class Vector2 {
  constructor(x = 0, y = 0) {
    if (typeof x !== "number" || typeof y !== "number")
      throw new Error("X and Y must be integers.");

    this.x = x;
    this.y = y;
  }
}
