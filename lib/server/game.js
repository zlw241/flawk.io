
const Player = require('./player');
const Nectar = require('./nectar');
const Util = require('../util')
const UUID = require("node-uuid");


class Game {
  constructor(io) {
    // this.viewport = new Viewport(0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);
    this.io = io;
    this.nectar = [];
    this.players = {};
    this.nectarCount = 700;
    this.playerDie = this.playerDie.bind(this);
    this.playerCount = 0
    this.setup();
  }

  setup() {
    // this.world.generate();
    // this.viewport.follow(this.players, this.canvas.width / 2, this.canvas.height / 2);
    this.populate();
  }

  populate() {
    for (let i = 0; i < this.nectarCount; i++) {
      this.addNectar();
    }
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
    this.playerCount += 1;
    return player;
  }

  gameObjects() {
    return this.nectar.concat(Object.values(this.players))
  }

  addNectar(x, y, r, c) {
    const xPos = x || Util.getRandomInt(1, Game.DIM_X);
    const yPos = y || Util.getRandomInt(1, Game.DIM_Y);
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

  playerData() {
    const data = {}
    Object.values(this.players).forEach((player) => {
      data[player.id] = {
        id: player.id,
        pos: [player.x, player.y],
        vel: [player.velX, player.velY],
        zombies: player.zombies,
        radius: player.radius,
        speed: player.speedMultiplier,
        boosting: player.boosting,
        color: player.color
      }
    });

    return data;
  }

  update(delta) {
    // console.log(delta);
    const normal_frame_time = 1000/10;
    const velocityScale = delta / normal_frame_time;
    // console.log(delta, velocityScale);
    Object.values(this.players).forEach((player) => {
      player.update(velocityScale, Game.DIM_X, Game.DIM_Y);
    });
    // this.viewport.update();
    this.handleCollisions();
    return this.playerData();
  }

  handleCollisions() {
    this.nectar.forEach((nectar) => {
      Object.values(this.players).forEach((player) => {
        const centerDist = Util.dist([player.x, player.y], [nectar.x, nectar.y]);
        if (centerDist < (player.radius + nectar.radius)) {
          nectar.relocate(Game.DIM_X, Game.DIM_Y);
          for (let i = 0; i < nectar.radius / 3; i++) {
            player.grow();
          }
        }
      });
    });
  }

  start() {
    this.requestId = setInterval(this.gameLoop.bind(this), 1000/60);
  }

  stopGame() {
    clearInterval(this.requestId);
    this.game = null;
  }

  gameLoop() {
    if (!this.lastTime) {
      this.lastTime = Date.now()
    }
    const time = Date.now();
    const delta = -(this.lastTime - time);
    // this.socket.emit('player position', [this.players[window.playerId].x, this.players[window.playerId].y])
    this.update(delta);
    this.io.emit("server update", this.players);
    this.lastTime = time;
    // this.requestId = this.gameLoop.bind(this))
  }

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

}

Game.DIM_X = 700;
Game.DIM_Y = 700;


module.exports = Game;
