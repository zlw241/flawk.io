import World from './world';
import Player from './player';
import Viewport from './viewport';


class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.world = new World(1000, 1000);
    this.player = new Player(50, 50);
    this.viewport = new Viewport(0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);

    this.setup();
  }

  setup() {
    this.world.generate();
    this.viewport.follow(this.player, this.canvas.width / 2, this.canvas.height / 2);
  }

  update(delta) {
    const normal_frame_time = 1000/60;
    const velocityScale = delta / normal_frame_time

    this.player.update(velocityScale, this.world.width, this.world.height);
    // this.player.x += 1 * velocityScale;
    // this.player.y += 1 * velocityScale;
    this.viewport.update();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.draw(this.context, this.viewport.xView, this.viewport.yView);
    this.player.draw(this.context, this.viewport.xView, this.viewport.yView);
  }

  start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(time) {
    if (!this.lastTime) {
      this.lastTime = time;
    }

    const delta = -(this.lastTime - time);

    this.update(delta);
    this.draw();
    this.lastTime = time;
    requestAnimationFrame(this.gameLoop.bind(this))
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas);

  game.start();

})









//
// const canvas = document.getElementById("game-canvas");
// const context = canvas.getContext("2d");
//
// const world = new World(1000, 1000);
// world.generate();
//
// const player = new Player(50, 50);
//
// const viewport = new Viewport(0, 0, canvas.width, canvas.height, world.width, world.height);
// viewport.follow(player, canvas.width / 2, canvas.height / 2);
//
// function update() {
//   player.x += 2;
//   player.y += 2;
//   viewport.update();
// }
//
// function draw() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   world.draw(context, viewport.xView, viewport.yView);
//   player.draw(context, viewport.xView, viewport.yView);
// }
//
//
//
//
// setInterval(() => {
//   update();
//   draw();
// }, 1000/60)
