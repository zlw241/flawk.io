import World from './world';
import Player from './player';
import Viewport from './viewport';
import Nectar from './nectar';
import * as Util from './util';


class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.world = new World(5000, 5000);
    this.player = new Player(50, 50, 75, this.playerDie.bind(this), this.addNectar.bind(this));
    this.viewport = new Viewport(0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);
    this.nectar = [];
    this.players = [this.player];
    this.nectarCount = 700;
    this.setup();
  }

  setup() {
    setTimeout(() => {
      this.handleInput();
    }, 3000);
    this.world.generate();
    this.viewport.follow(this.player, this.canvas.width / 2, this.canvas.height / 2);
    this.populate();
  }

  populate() {
    // this.addPlayer();
    for (let i = 0; i < this.nectarCount; i++) {
      this.addNectar();
    }
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof Nectar) {
      this.nectar.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  addPlayer() {
    const player = new Player(50, 50, 75, this.die, this.addNectar.bind(this));
    this.add(player);
  }

  gameObjects() {
    return [this.world].concat(this.nectar).concat(this.players);
  }

  addNectar(x, y, r) {
    const xPos = x || Util.getRandomInt(1, this.world.width);
    const yPos = y || Util.getRandomInt(1, this.world.width);
    const radius = r || Util.getRandomInt(3, 8);
    const nectar = new Nectar(xPos, yPos, radius);
    this.add(nectar);
  }

  playerDie(coords) {
    for (let i = 0; i < coords.length; i++) {
      const x = Util.getRandomInt(coords[i][0] - 12, coords[i][0] + 12);
      const y = Util.getRandomInt(coords[i][1] - 12, coords[i][1] + 12);
      this.addNectar(x, y);
    }
    this.players.splice(this.players.indexOf(this.player), 1);
    this.player = null;
  }

  update(delta) {
    const normal_frame_time = 1000/60;
    const velocityScale = delta / normal_frame_time
    this.players.forEach((player) => {
      player.update(velocityScale, this.world.width, this.world.height);
    })
    // if (this.player) {
    //   this.player.update(velocityScale, this.world.width, this.world.height);
    // }
    this.viewport.update();
    this.handleCollisions();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameObjects().forEach((object) => {
      object.draw(this.context, this.viewport.xView, this.viewport.yView);
    });
  }

  handleCollisions() {
    this.nectar.forEach((nectar) => {
      this.players.forEach((player) => {
        const centerDist = Util.dist([this.player.x, this.player.y], [nectar.x, nectar.y]);
        if (centerDist < (player.radius)) {
          nectar.relocate(this.world.width, this.world.height);
          for (let i = 0; i < nectar.radius / 3; i++) {
            player.grow();
          }
        }
      });
    });
  }

  start() {
    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(time) {
    if (!this.lastTime) {
      this.lastTime = time;
    }
    const delta = -(this.lastTime - time);
    this.update(delta);
    this.draw();
    this.lastTime = time;
    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  handleInput() {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        if (this.player) {
          this.player.boost();
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        if (this.player) {
          this.player.unboost();
        }
      }
    });

    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (this.player) {
        this.player.boost();
      }
    });

    document.addEventListener('mouseup', (e) => {
      e.preventDefault();
      if (this.player) {
        this.player.unboost();
      }
    })

    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (this.player) {
        const slopeToDegrees = (x, y) => {
          return Math.atan2(y, x)
        };

        const vectorToRadians = (x, y) => {
          return Math.atan2(y, x);
        }

        const radiansToVector = (radians) => {
          const y = Math.sin(radians);
          const x = Math.cos(radians);
          return [x, y];
        };

        const radiansToDegrees = (radians) => {
          return radians / (Math.PI / 180);
        }

        const degreesToRadians = (degrees) => {
          return degrees * (Math.PI / 180);
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

        const startRadians = vectorToRadians(this.player.velX, this.player.velY);

        const targetRadians = vectorToRadians(dX, dY);

        if (startRadians < 0 && targetRadians < 0) {
          if (startRadians < targetRadians) {
            var [newX, newY] = radiansToVector(startRadians + (Math.PI / 32));
          } else {
            var [newX, newY] = radiansToVector(startRadians - (Math.PI / 32));
          }
        } else if (startRadians > 0 && targetRadians > 0) {
          if (startRadians < targetRadians) {
            var [newX, newY] = radiansToVector(startRadians + (Math.PI / 32));
          } else {
            var [newX, newY] = radiansToVector(startRadians - (Math.PI / 32));
          }
        } else if (startRadians < 0 && targetRadians > 0) {
          if (targetRadians - degreesToRadians(180) > startRadians) {
            var [newX, newY] = radiansToVector(startRadians - (Math.PI / 32));
          } else {
            var [newX, newY] = radiansToVector(startRadians + (Math.PI / 32));
          }
        } else {
          if (targetRadians + degreesToRadians(180) > startRadians) {
            var [newX, newY] = radiansToVector(startRadians - (Math.PI / 32));
          } else {
            var [newX, newY] = radiansToVector(startRadians + (Math.PI / 32));
          }
        }

        this.player.changeXVel(newX);
        this.player.changeYVel(newY);
      }
    });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas);
  game.start();
})
