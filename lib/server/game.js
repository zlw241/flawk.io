
const Player = require('./player');
const Nectar = require('./nectar');
const Util = require('../util')
const UUID = require("node-uuid");


class Game {
  constructor(io) {
    // this.viewport = new Viewport(0, 0, 700, 700, 700, 700);
    this.io = io;
    this.nectar = [];
    this.players = {};
    this.nectarCount = 100;
    this.playerDie = this.playerDie.bind(this);
    this.playerCount = 0
    this.hits = 0;
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
        const c = player.color
        this.addNectar(x, y, r, c);
      }
    }
    this.removePlayer(player.id);
  }

  removePlayer(id) {
    delete this.players[id];
  }

  playerData() {
    const data = {}
    Object.values(this.players).forEach((player) => {
      data[player.id] = {
        id: player.id,
        pos: [player.x, player.y],
        vel: [player.velX, player.velY],
        zombies: player.zombies,
        size: player.size,
        radius: player.radius,
        speed: player.speedMultiplier,
        boosting: player.boosting,
        color: player.color,
        moveNum: player.moveNum
      }
    });
    // console.log(this.players)
    return data;
  }

  update(delta) {
    const normal_frame_time = 1000/60;
    const velocityScale = delta / normal_frame_time;
    Object.values(this.players).forEach((player) => {
      player.update(velocityScale, Game.DIM_X, Game.DIM_Y);
    });
    // this.viewport.update();
    this.handleCollisions();
    return this.playerData();
  }


  handleCollisions() {
    Object.values(this.players).forEach((player1) => {
      Object.values(this.players).forEach((player2) => {
        if (player1.id !== player2.id) {
          if (player1.collideWith(player2) === true) {
            this.hits += 1;
            this.playerDie(player1);
          } else if (player2.collideWith(player1)) {
            this.hits += 1;
            this.playerDie(player2);
          }
        }
      })
    })
    //   console.log('here')
    //   for (let j = i+1; j < Object.values(this.players).length; j++) {
    //     console.log('here');
    //     const player1 = this.players[i];
    //     const player2 = this.players[j];
    //     if (player1.collideWith(player2)) {
    //       this.playerDie(player1);
    //     } else if (player2.collideWith(player1)) {
    //       this.playerDie(player2);
    //     }
    //   }
    // }



    this.nectar.forEach((nectar) => {
      Object.values(this.players).forEach((player) => {
        const centerDist = Util.dist([player.x, player.y], [nectar.x, nectar.y]);
        if (centerDist < (player.radius + nectar.radius + 25)) {
          const movement = nectar.vacuumMotion(player);
          console.log(movement);
          if (centerDist < (player.radius + nectar.radius)) {
            nectar.relocate(Game.DIM_X, Game.DIM_Y);
            for (let i = 0; i < nectar.radius / 3; i++) {
              player.grow();
            }
          } else if (centerDist < (player.radius + nectar.radius + 5)) {
            nectar.x += movement[0] * 3;
            nectar.y += movement[1] * 3;
          } else if (centerDist < (player.radius + nectar.radius + 10)) {
            nectar.x += movement[0] * 2;
            nectar.y += movement[1] * 2;
          } else if (centerDist < (player.radius + nectar.radius + 15)) {
            nectar.x += movement[0] * 1.5;
            nectar.y += movement[1] * 1.5;
          } else {
            nectar.x += movement[0];
            nectar.y += movement[1];
          }
          // nectar.x += movement[0];
          // nectar.y += movement[1];
          // console.log(nectar.vacuumMotion(player));
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
    // this.io.emit("server update", this.players);
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

Game.DIM_X = 3000;
Game.DIM_Y = 3000;


module.exports = Game;
