const Game = require('./game');
const UUID = require('node-uuid');

class GameServer {
  constructor(io) {
    this.io = io;
    this.players = {};
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
    socket.on("disconnect", () => this.onDisconnect(socket));
  }

  onNewPlayer(client) {
    if (!this.game) {
      this.startGame();
    }
    const player = this.game.addPlayer(client.userId);
    this.players[client.userId] = player;
    this.io.emit("new player", {id: player.id, x: player.x, y: player.y, color: player.color, velX: player.velX, velY: player.velY});
  }

  onDisconnect(socket) {
    delete this.players[socket.userId];
    this.game.removePlayer(socket.userId);
    console.log("disconnected", socket.userId);
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
    const playerData = this.game.update(timeDelta);

    this.io.emit("update", {players: playerData, nectar: this.game.nectar});
    this.io.emit("draw", {players: playerData, nectar: this.game.nectar});
    this.lastTime = currentTime;
  }

  onMovePlayer(data) {
    this.players[data.id].changeXVel(data.pos[0])
    this.players[data.id].changeYVel(data.pos[1])
    // this.game.players[data.id].changeXVel(data.pos[0])
    // this.game.players[data.id].changeYVel(data.pos[1])

  }

}

module.exports = GameServer;
