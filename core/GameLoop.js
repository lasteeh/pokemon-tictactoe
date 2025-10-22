export class GameLoop {
  constructor(update, render) {
    if (typeof update !== "function" || typeof render !== "function")
      throw new Error("Invalid function.");

    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 6;

    this.update = update;
    this.render = render;

    this.rafID = null;
    this.isRunning = false;
  }

  mainLoop = (timeStamp) => {
    if (typeof timeStamp !== "number")
      throw new Error("Timestamp must be a number.");

    if (!this.isRunning) return;

    let deltaTime = timeStamp - this.lastFrameTime;
    this.lastFrameTime = timeStamp;

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();
    this.rafID = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.rafID = requestAnimationFrame(this.mainLoop);
  }
}
