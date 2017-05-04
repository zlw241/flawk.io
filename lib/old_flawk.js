const NORMAL_FRAME_TIME_DELTA = 1000/60;

class Bird {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

    this.handleInput();
  }

  handleInput() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.key === "a") {
        this.vel[0] -= 0.05;
      } else if (e.key === "s") {
        this.vel[1] += 0.05;
      } else if (e.key === "d") {
        this.vel[0] += 0.05;
      } else if (e.key === "w") {
        this.vel[1] -= 0.05;
      }
    });
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }


}

class GameView {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.game.lastTime = time;

    // every call to animate causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

}


class Game {
  constructor() {
    this.flawk = [];
  }

  addBird() {
    const bird = new Bird({
      pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
      vel: [0, 0],
      game: this,
      radius: 20,
      color: '#000'
    });

    this.flawk.push(bird);
  }

  moveFlawk(delta) {
    this.flawk.forEach((bird) => {
      bird.move(delta);
    })
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.flawk.forEach((bird) => {
      bird.draw(ctx);
    });
  }

  step(delta) {
    this.moveFlawk(delta);
  }

}



Game.BG_COLOR = '#fff';
Game.DIM_X = 500;
Game.DIM_Y = 500;
