import { Game } from "./src/Game.js";

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    const canvas = document.querySelector("#game");
    if (!canvas) throw new Error("Canvas not found.");

    const game = new Game({
      canvas: canvas,
      resolutionWidth: 640,
      resolutionHeight: 480,
    });

    game.start();
  });
});
