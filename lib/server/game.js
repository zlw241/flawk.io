"use strict";


const Player = require('./player');
const Nectar = require('./nectar');
const Util = require('../util')
const UUID = require("node-uuid");


class Game {
  constructor(io) {
    this.io = io;
    this.nectar = [];
    this.players = {};
    this.nectarCount = Game.NECTAR_COUNT;
    this.playerDie = this.playerDie.bind(this);
    this.playerCount = 0
    this.hits = 0;
    this.setup();
  }

  setup() {
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
    } else if (object instanceof Nectar) {
      this.nectar.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  addPlayer(id) {
    const player = new Player(id, 50, 50, 20, this);
    this.add(player);
    this.playerCount += 1;
    return player;
  }

  gameObjects() {
    return this.nectar.concat(Object.values(this.players))
  }

  addNectar(x, y, r, c, s) {
    const xPos = x || Util.getRandomInt(1, Game.DIM_X);
    const yPos = y || Util.getRandomInt(1, Game.DIM_Y);
    const radius = r || Util.getRandomInt(3, 8);
    const color = c || Util.randomColor();
    const shadow = s || 30;
    const nectar = new Nectar(xPos, yPos, radius, color, shadow);
    this.add(nectar);
  }

  playerDie(player) {
    const coords = player.zombies;
    for (let i = 0; i < coords.length; i++) {
      if (i % 4 === 0) {
        const x = Util.getRandomInt(coords[i][0] - 12, coords[i][0] + 12);
        const y = Util.getRandomInt(coords[i][1] - 12, coords[i][1] + 12);
        // const r = Util.getRandomInt(3, 8);
        const r = 8;
        const c = player.color
        const s = 20;
        this.addNectar(x, y, r, c, s);
      }
    }
    this.removePlayer(player.id);
  }

  removePlayer(id) {
    delete this.players[id];
  }

  playerData() {
    const data = {}
    // const stringData = [];

    Object.values(this.players).forEach((player) => {
      data[player.id] = {
        id: player.id,
        pos: [player.x, player.y],
        vel: [player.velX, player.velY],
        zombies: player.zombies,
        size: player.size,
        radius: player.radius,
        // speed: player.speedMultiplier,
        boosting: player.boosting,
        color: player.color,
        moveNum: player.moveNum,
        lastInput: player.lastProcessInput
      }

    });

    return data;
  }

  update(delta) {
    const velocityScale = delta / Game.PHYSICS_FRAME_RATE;
    // console.log(delta, Game.PHYSICS_FRAME_RATE, velocityScale)
    // console.log(velocityScale)
    const startTime = Date.now();
    Object.values(this.players).forEach((player) => {
      player.update(velocityScale, Game.DIM_X, Game.DIM_Y);
      // console.log(`${Date.now() - player.lastProcessInput}\r`)
    });
    this.handleCollisions();
    const endTime = Date.now();
    // console.log(endTime-startTime);
    return this.playerData();

  }


  handleCollisions() {
    const players = Object.values(this.players);
    players.forEach((player1) => {
      players.forEach((player2) => {
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

    });

    this.nectar.forEach((nectar, i) => {
      players.forEach((player) => {
        const centerDist = Util.dist([player.x, player.y], [nectar.x, nectar.y]);
        if (centerDist < (player.radius + nectar.radius + 50)) {
          const movement = nectar.vacuumMotion(player);
          // movement[0] = 2;
          // movement[1] = 2;
          if (centerDist < (player.radius + nectar.radius)) {
            for (let i = 0; i < nectar.radius / 3; i++) {
              player.grow();
            }
            // if (this.nectar.length > 400) {
            this.nectar.splice(i, 1);
            // } else {
            //   nectar.relocate(Game.DIM_X, Game.DIM_Y);
            // }
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
        }
      });
    });
  }

  // start() {
  //   this.lastTime = Date.now();
  //   this.requestId = setInterval(this.gameLoop.bind(this), Game.FRAME_RATE);
  // }
  //
  // stopGame() {
  //   clearInterval(this.requestId);
  //   this.game = null;
  // }
  //
  // gameLoop() {
  //
  //   const time = Date.now();
  //   const delta = time - this.lastTime
  //   // this.socket.emit('player position', [this.players[window.playerId].x, this.players[window.playerId].y])
  //   this.update(delta);
  //   // this.io.emit("server update", this.players);
  //   this.lastTime = time;
  //   // this.requestId = this.gameLoop.bind(this))
  // }

  updatePlayerVelocity(playerId, targetRadians) {
    const player = this.players[playerId]
    if (player) {

      // radians corresponding to players current velocity
      const startRadians =  Util.vectorToRadians(player.velX, player.velY);
      // player current velocity moved in the direction of the target velocity by PI/32 radians
      const [newX, newY] = Util.calculateNewVector(startRadians, targetRadians);
      // console.log(`last input id: ${player.lastProcessInput}\txVel: ${newX}\tyVel: ${newY}\tx: ${player.x}\ty: ${player.y}`);
      player.changeXVel(newX);
      player.changeYVel(newY);

    }
  }

}


Game.NECTAR_COUNT = 200;
Game.DIM_X = 3000;
Game.DIM_Y = 3000;
// Game.FRAME_RATE = 1000/66.66;
Game.PHYSICS_FRAME_RATE = 1000/66.666;
Game.UPDATE_FRAME_RATE = 1000/22.222;

module.exports = Game;
