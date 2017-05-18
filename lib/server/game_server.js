"use strict";

const Game = require('./game');
const UUID = require('node-uuid');
const Util = require('../util');

class GameServer {
  constructor(io) {
    this.io = io;
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
      console.log("STARTING GAME")
      this.startGame();
    }

  }

  onDisconnect(socket) {
    console.log("player disconnected", socket.userId)
    delete this.game.players[socket.userId];
    console.log("player count", Object.values(this.game.players).length)
    this.game.removePlayer(socket.userId);
    this.io.emit("player disconnected", socket.userId);
    if (Object.values(this.game.players).length === 0) {
      this.stopGame();
    }
  }

  startGame() {
    this.lastTime = Date.now();
    this.physicsLoop = setInterval(this.stepGame.bind(this), Game.PHYSICS_FRAME_RATE);
    this.updateLoop = setInterval(this.updateGame.bind(this), Game.UPDATE_FRAME_RATE);
    this.nectarUpdateLoop = setInterval(this.nectarUpdate.bind(this), 1000);
  }

  stopGame() {
    clearInterval(this.physicsLoop);
    clearInterval(this.updateLoop);
    clearInterval(this.nectarUpdateLoop);
    this.physicsLoop = null;
    this.updateLoop = null;
    this.nectarUpdateLoop = null;
  }

  stepGame() {
    const time = Date.now();
    const timeDelta = time - this.lastTime;
    const startTime = Date.now();
    this.game.update(timeDelta);
    const endTime = Date.now();

    this.lastTime = time;
  }

  nectarUpdate() {
    this.io.emit("nectar update", this.game.nectar);
  }

  updateGame() {
    const time = Date.now();
    const playerData = this.game.playerData();
    this.io.emit("update game", {
      players: playerData,
      nectar: {
        deleted: this.game.deletedNectar,
        moved: this.game.movedNectar,
        added: this.game.addedNectar
      },
      time: time})
    this.game.deletedNectar = [];
    this.game.movedNectar = [];
    this.game.addedNectar = [];
  }

  onMovePlayer(data) {
    if (this.game.players[data.id]) {
      this.game.players[data.id].lastProcessInput = data.num;
      this.game.updatePlayerVelocity(data.id, data.pos)
    }
  }

  onBoost(data) {
    if (data.status === "on") {
      if (this.game.players[data.id]) {
        this.game.players[data.id].boost();
      }
    } else {
      if (this.game.players[data.id]) {
        this.game.players[data.id].unboost();
      }
    }
  }

}

module.exports = GameServer;
