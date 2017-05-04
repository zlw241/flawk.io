import World from './world';
import Player from './player';
import Viewport from './viewport';


class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.world = new World(5000, 5000);
    this.player = new Player(50, 50);
    this.viewport = new Viewport(0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);
    this.setup();
  }

  setup() {
    this.world.generate();
    this.viewport.follow(this.player, this.canvas.width / 2, this.canvas.height / 2);
    this.handleInput();
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

  handleInput() {
    // document.addEventListener("keydown", (e) => {
    //   switch(e.key) {
    //     case "a": {
    //       this.player.changeXVel(-1);
    //       break;
    //     }
    //     case "s": {
    //       this.player.changeYVel(1);
    //       break;
    //     }
    //     case "d": {
    //       this.player.changeXVel(1);
    //       break;
    //     }
    //     case "w": {
    //       this.player.changeYVel(-1);
    //       break;
    //     }
    //     case " ": {
    //       this.player.changeBoost(6);
    //       break;
    //     }
    //     default: {
    //       console.log(e.key )
    //     }
    //   }
    // })
    //
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.player.changeBoost(6);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        this.player.changeBoost(3);
      }
    });


    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      const calcSlope = (x1, y1, x2, y2) => {
        return (y2-y1) / (x2-x1)
      }

      const slopeToDegrees = (x, y) => {
        return Math.atan2(y, x) / (Math.PI / 180)
      }

      const newVector = (degrees) => {
        const x = Math.sin(degrees * (Math.PI / 180))
        const y = Math.cos(degrees * (Math.PI / 180))
        return [y, x]
      }

      // top-left coordinates of the canvas on the document
      const canvasCoords = this.canvas.getBoundingClientRect();

      // the 'origin' -> coordinates of the player relative to the top-left corner of the canvas
      const oX = canvasCoords.left + (this.player.x - this.viewport.xView);
      const oY = canvasCoords.top + (this.player.y - this.viewport.yView);

      // coordinates of mouse position on document
      const mX = e.clientX;
      const mY = e.clientY;

      // difference between mouse coords and origin coords
      const dX = (mX - oX);
      const dY = (mY - oY);

      const slope = calcSlope(oX, oY, mX, mY);
      const degrees = slopeToDegrees(dX, dY);
      // console.log(slope, degrees);
      // console.log(slope, degrees);

      const [newX, newY] = newVector(degrees)
      this.player.changeXVel(newX);
      this.player.changeYVel(newY)
      // console.log(newX);

    });
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas);
  document.addEventListener('click', (e) => {
    e.preventDefault();
    game.start();
  })
  // const canvas = document.getElementById("game-canvas");
  // const game = new Game(canvas);
  // game.start();

})
