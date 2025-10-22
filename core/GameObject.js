import { Vector2 } from "./Vector2.js";

export class GameObject {
  constructor({ position, processPriority = 0, zIndex = 0 }) {
    if (position !== undefined && !(position instanceof Vector2))
      throw new Error("Position must be an instance of Vector2.");
    if (typeof zIndex !== "number")
      throw new Error("Z-index must be an integer.");
    if (typeof processPriority !== "number")
      throw new Error("Z-index must be an integer.");

    this.position = position ?? new Vector2(0, 0);
    this.zIndex = zIndex;
    this.processPriority = processPriority;

    this.children = [];
    this.parent = null;
  }

  stepEntry(delta, root) {
    if (typeof delta !== "number") throw new Error("Delta must be a number.");
    if (!(root instanceof GameObject)) throw new Error("Invalid game object.");

    this.children
      .slice()
      .sort((a, b) => b.processPriority - a.processPriority)
      .forEach((child) => {
        child.stepEntry(delta, root);
      });

    this.step(delta, root);
  }

  step(_delta) {
    // defined by child
  }

  draw(ctx, x, y) {
    if (!(ctx instanceof CanvasRenderingContext2D))
      throw new Error("Invalid context.");

    if (typeof x !== "number" || typeof y !== "number")
      throw new Error("Drawing coordinates (x, y) must be numbers.");

    const drawPosX = this.position.x;
    const drawPosY = this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.children
      .slice()
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(ctx, x, y) {
    // defined by child
  }

  destroy() {
    this.children.forEach((child) => child.destroy());
    this.parent?.removeChild(this);
  }

  removeChild(gameObject) {
    if (!(gameObject instanceof GameObject))
      throw new Error("Invalid game object.");

    this.children = this.children.filter((child) => {
      return gameObject !== child;
    });
  }

  addChild(gameObject) {
    if (!(gameObject instanceof GameObject))
      throw new Error("Invalid game object.");

    gameObject.parent = this;
    this.children.push(gameObject);
  }
}
