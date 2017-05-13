"use strict";

const Game = require('./game');
const UUID = require('node-uuid');
const Util = require('../util');

class GameServer {
  constructor(io) {
    this.io = io;
    // this.players = {};
    this.game = new Game(this.io);
    this.setup();
    this.count = 0;
  }

  setup() {
    this.io.on("connection", this.onSocketConnection.bind(this));
  }

  onSocketConnection(socket) {
    socket.userId = UUID();
    socket.emit("on connected", {id: socket.userId});
    console.log('\t socket.io:: player ' + socket.userId + ' connected');
    this.onNewPlayer(socket);
    socket.on("player move", this.onMovePlayer.bind(this));
    socket.on("boost", this.onBoost.bind(this))
    socket.on("disconnect", this.onDisconnect.bind(this, socket));
  }

  onNewPlayer(client) {
    const numPlayers = Object.values(this.game.players).length;
    let player = this.game.addPlayer(client.userId);
    if (numPlayers === 0) {
      // player = this.game.addPlayer(client.userId);
      this.startGame();
    }
    // } else {
    //   player = this.game.addPlayer(client.userId);
    // }
    // this.players[client.userId] = player;
    // this.io.emit("new player", {id: player.id, x: player.x, y: player.y, color: player.color, velX: player.velX, velY: player.velY});
  }

  onDisconnect(socket) {
    console.log("player disconnected", socket.userId)
    delete this.game.players[socket.userId];
    console.log("player count", Object.values(this.game.players).length)
    this.game.removePlayer(socket.userId);
    this.io.emit("player disconnected", socket.userId);

  }

  startGame() {
    // this.game = new Game(this.io);
    this.lastTime = Date.now();
    this.physicsLoop = setInterval(this.stepGame.bind(this), Game.PHYSICS_FRAME_RATE);
    this.updateLoop = setInterval(this.updateGame.bind(this), Game.UPDATE_FRAME_RATE);
  }

  stopGame() {
    clearInterval(this.physicsLoop);
    clearInterval(this.updateLoop);
    this.physicsLoop = null;
    this.updateLoop = null;
    this.game = null;
  }

  stepGame() {
    const time = Date.now();
    const timeDelta = time - this.lastTime;

    const startTime = Date.now();
    // const playerData = this.game.update(timeDelta);
    this.game.update(timeDelta);
    const endTime = Date.now();

    // console.log(nectar[0])
    // this.io.emit("draw", {players: playerData, nectar: this.game.nectar, timeDelta: timeDelta});
    this.lastTime = time;
  }

  updateGame() {
    const time = Date.now();
    const playerData = this.game.playerData();
    this.io.emit("draw", {players: playerData, nectar: this.game.nectar, time: time})
  }

  onMovePlayer(data) {
    // console.log(data)
    if (this.game.players[data.id]) {
      this.game.players[data.id].lastProcessInput = data.num;
      // this.game.players[data.id].changeXVel(data.pos[0])
      // this.game.players[data.id].changeYVel(data.pos[1])
      this.game.updatePlayerVelocity(data.id, data.pos)
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
