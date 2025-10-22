import { GameController } from "./GameController.js";
import { GameLoop } from "../core/GameLoop.js";

export class Game {
  constructor({ canvas, resolutionWidth = 1920, resolutionHeight = 1080 }) {
    if (!canvas || !(canvas instanceof Element))
      throw new Error("Canvas not found.");

    if (
      typeof resolutionHeight !== "number" ||
      typeof resolutionWidth !== "number"
    )
      throw new Error("Resolution width and height must be integers.");

    this.canvas = canvas;
    this.canvas.width = 1920;

    this.aspectRatio = resolutionWidth / resolutionHeight;
    this.canvas.style.aspectRatio = this.aspectRatio;
    this.canvas.height = this.canvas.width / this.aspectRatio;

    this.pixelRatio = this.canvas.width / resolutionWidth;

    this.context = this.canvas.getContext("2d");
    this.context.scale(this.pixelRatio, this.pixelRatio);
  }

  load = (bool) => {
    if (typeof bool !== "boolean")
      throw new Error(`Invalid bool type: ${typeof bool}`);

    this.canvas.setAttribute("data-loading", bool);
  };

  update = (delta) => {
    if (typeof delta !== "number") throw new Error("Delta must be a number.");

    this.gameController.stepEntry(delta, this.gameController);
  };

  render = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameController.draw(this.context, 0, 0);
  };

  start() {
    const gameController = new GameController();
    this.gameController = gameController;

    const gameLoop = new GameLoop(this.update, this.render);
    gameLoop.start();

    this.load(false);
  }
}
