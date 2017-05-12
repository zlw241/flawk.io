"use strict";

const Game = require('./game');
const UUID = require('node-uuid');

class GameServer {
  constructor(io) {
    this.io = io;
    // this.players = {};
    this.setup();
    this.count = 0;
  }

  setup() {
    this.io.on("connection", this.onSocketConnection.bind(this));
  }

  onSocketConnection(socket) {
    socket.userId = UUID();
    socket.emit("onConnected", {id: socket.userId});
    console.log('\t socket.io:: player ' + socket.userId + ' connected');
    this.onNewPlayer(socket);
    socket.on("player move", this.onMovePlayer.bind(this));
    socket.on("boost", this.onBoost.bind(this))
    socket.on("disconnect", this.onDisconnect.bind(this, socket));
  }

  onNewPlayer(client) {
    if (!this.game) {
      this.startGame();
    }
    const player = this.game.addPlayer(client.userId);
    // this.players[client.userId] = player;
    this.io.emit("new player", {id: player.id, x: player.x, y: player.y, color: player.color, velX: player.velX, velY: player.velY});
  }

  onDisconnect(socket) {
    console.log("player disconnected", socket.userId)
    delete this.game.players[socket.userId];
    // delete this.players[socket.userId]
    console.log("player count", Object.values(this.game.players).length)
    this.game.removePlayer(socket.userId);
    this.io.emit("player disconnected", socket.userId);
    // socket.emit("remove player", socket.userId);
  }

  startGame() {
    this.game = new Game();
    this.lastTime = Date.now();
    this.gameLoop = setInterval(this.stepGame.bind(this), 1000/30);
  }

  stopGame() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.game = null;
  }

  stepGame() {
    const currentTime = Date.now();
    const timeDelta = currentTime - this.lastTime;
    // console.log(timeDelta)
    const startTime = Date.now();
    const playerData = this.game.update(timeDelta);
    const endTime = Date.now();
    console.log(endTime - startTime);
    // console.log(this.players);
    // this.io.emit("update", {players: playerData, nectar: this.game.nectar});
    this.io.emit("draw", {players: playerData, nectar: this.game.nectar, timeDelta: timeDelta});
    this.lastTime = currentTime;
  }

  onMovePlayer(data) {
    if (this.game.players[data.id]) {
      this.game.players[data.id].lastProcessInput = data.timestamp;
      // this.players[data.id].changeXVel(data.pos[0]);
      // this.players[data.id].changeYVel(data.pos[1]);
      this.game.players[data.id].changeXVel(data.pos[0])
      this.game.players[data.id].changeYVel(data.pos[1])
    }

  }

  onBoost(data) {
    if (data.status === "on") {
      // this.players[data.id].boost();
      if (this.game.players[data.id]) {
        this.game.players[data.id].boost();
      }
    } else {
      // this.players[data.id].unboost();
      if (this.game.players[data.id]) {
        this.game.players[data.id].unboost();
      }
    }
  }

}

module.exports = GameServer;
