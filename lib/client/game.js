import World from './world';
import Player from './player';
import Viewport from './viewport';
import Nectar from './nectar';
import * as Util from './util';


class Game {
  constructor(context, canvas, socket) {
    this.canvas = canvas;
    this.context = context;
    this.socket = socket;
    this.world = new World(700, 700);
    this.viewport = new Viewport(0, 0, 700, 700, this.world.width, this.world.height);
    this.nectar = [];
    this.players = {};
    // this.playersArr = Object.values(this.players);
    this.nectarCount = 700;
    this.currentPlayerId = null;
    // this.setup();
  }

  setup() {
    this.handleInput();
    this.world.generate();
    this.viewport.follow(this.players[this.currentPlayerId], this.canvas.width / 2, this.canvas.height / 2);
  }

  populate() {
    // this.addPlayer();
    for (let i = 0; i < this.nectarCount; i++) {
      this.addNectar();
    }
  }

  setCurrentPlayerId(id) {
    this.currentPlayerId = id;
  }

  add(object) {
    if (object instanceof Player) {
      this.players[object.id] = object
      // this.players.push(object);
    } else if (object instanceof Nectar) {
      this.nectar.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  addPlayer(id) {
    const player = new Player(id, 50, 50, 75, this);
    this.add(player);
    this.setCurrentPlayerId(id);
  }

  gameObjects() {
    return [this.world].concat(this.nectar).concat(Object.values(this.players))
  }

  addNectar(x, y, r, c) {
    const xPos = x || Util.getRandomInt(1, this.world.width);
    const yPos = y || Util.getRandomInt(1, this.world.width);
    const radius = r || Util.getRandomInt(3, 8);
    const color = c || Util.randomColor();
    const nectar = new Nectar(xPos, yPos, radius, c);
    this.add(nectar);
  }

  playerDie(player) {
    const coords = player.zombies;
    for (let i = 0; i < coords.length; i++) {
      if (i % 4 === 0) {
        const x = Util.getRandomInt(coords[i][0] - 12, coords[i][0] + 12);
        const y = Util.getRandomInt(coords[i][1] - 12, coords[i][1] + 12);
        const r = Util.getRandomInt(3, 8);
        const c = this.players[player.id].color
        this.addNectar(x, y, r, c);
      }
    }
    this.removePlayer(player);
  }

  removePlayer(player) {
    delete this.players[player.id];
  }

  update(delta) {
    const normal_frame_time = 1000/60;
    const velocityScale = delta / normal_frame_time
    Object.values(this.players).forEach((player) => {
      player.update(velocityScale, this.world.width, this.world.height);
    })
    this.viewport.update();
    this.handleCollisions();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameObjects().forEach((object) => {
      // console.log(this.viewport.xView, this.viewport.yView)
      object.draw(this.context, this.viewport.xView, this.viewport.yView);
    });
  }

  handleCollisions() {
    this.nectar.forEach((nectar) => {
      Object.values(this.players).forEach((player) => {
        const centerDist = Util.dist([player.x, player.y], [nectar.x, nectar.y]);
        if (centerDist < (player.radius + nectar.radius)) {
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
    // this.socket.emit('player position', [this.players[window.playerId].x, this.players[window.playerId].y])
    this.update(delta);
    this.draw();
    this.lastTime = time;
    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  // handleServerInput() {
  //   this.socket.on('server update', (data) => {
  //     Object.values(this.players).forEach((player) => {
  //       if (player.id !== window.playerId) {
  //         player.x = data[player.id][0];
  //         player.y = data[player.id][1];
  //       }
  //     })
  //   })
  // }

  // updatePlayerPos(mouseX, mouseY) {
  //
  // }

  calculateNewVector(startRadians, targetRadians) {
    if (startRadians < 0 && targetRadians < 0) {
      if (startRadians < targetRadians) {
        var [newX, newY] = Util.radiansToVector(startRadians + (Math.PI / 32));
      } else {
        var [newX, newY] = Util.radiansToVector(startRadians - (Math.PI / 32));
      }
    } else if (startRadians > 0 && targetRadians > 0) {
      if (startRadians < targetRadians) {
        var [newX, newY] = Util.radiansToVector(startRadians + (Math.PI / 32));
      } else {
        var [newX, newY] = Util.radiansToVector(startRadians - (Math.PI / 32));
      }
    } else if (startRadians < 0 && targetRadians > 0) {
      if (targetRadians - Util.degreesToRadians(180) > startRadians) {
        var [newX, newY] = Util.radiansToVector(startRadians - (Math.PI / 32));
      } else {
        var [newX, newY] = Util.radiansToVector(startRadians + (Math.PI / 32));
      }
    } else {
      if (targetRadians + Util.degreesToRadians(180) > startRadians) {
        var [newX, newY] = Util.radiansToVector(startRadians - (Math.PI / 32));
      } else {
        var [newX, newY] = Util.radiansToVector(startRadians + (Math.PI / 32));
      }
    }
    return [newX, newY];
  }


  handleInput() {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        if (this.players[window.playerId]) {
          this.players[window.playerId].boost();
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        if (this.players[window.playerId]) {
          this.players[window.playerId].unboost();
        }
      }
    });

    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (this.players[window.playerId]) {
        this.players[window.playerId].boost();
      }
    });

    document.addEventListener('mouseup', (e) => {
      e.preventDefault();
      if (this.players[window.playerId]) {
        this.players[window.playerId].unboost();
      }
    })

    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      // if (this.players[this.currentPlayerId]) {
      // top-left coordinates of the canvas on the document
      const canvasCoords = this.canvas.getBoundingClientRect();

      // the 'origin' -> coordinates of the player relative to the top-left corner of the canvas
      const oX = canvasCoords.left + (this.players[this.currentPlayerId].x - this.viewport.xView);
      const oY = canvasCoords.top + (this.players[this.currentPlayerId].y - this.viewport.yView);

      // coordinates of mouse position on document
      const mX = e.clientX;
      const mY = e.clientY;

      // difference between mouse coords and origin coords
      const dX = (mX - oX);
      const dY = (mY - oY);

      const startRadians =  Util.vectorToRadians(this.players[this.currentPlayerId].velX, this.players[this.currentPlayerId].velY);
      const targetRadians = Util.vectorToRadians(dX, dY);
      const [newX, newY] = this.calculateNewVector(startRadians, targetRadians);

      this.socket.emit("player move", {
        id: this.currentPlayerId,
        pos: [newX, newY],

      });
      // this.players[this.currentPlayerId].changeXVel(newX);
      // this.players[this.currentPlayerId].changeYVel(newY);
    });
  }
}


export default Game;
