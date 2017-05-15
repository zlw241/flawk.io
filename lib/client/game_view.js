import Game from './game';
import * as Util from './util';
import Player from './player';


class GameView {
  constructor(context, canvas, socket) {
    this.canvas = canvas;
    this.context = context;
    this.socket = socket;
    this.game = new Game(this.context, this.canvas, this.socket);
    this.currentPlayerId = null;
    this.count = 0;
    this.moveNum = 0;
    this.listen();
  }

  listen() {
    this.socket.on("on connected", this.start.bind(this));
    // this.socket.on("new player", this.registerNewPlayer.bind(this));
    this.socket.on("update game", this.draw.bind(this));
    this.socket.on("update", this.update.bind(this));
    this.socket.on("player disconnected", this.onPlayerDisconnected.bind(this));
    this.socket.on("players", this.onReceivePlayers.bind(this));
    // this.socket.on("remove player", this.removePlayer.bind(this))
  }

  start(data) {
    console.log( 'Connected successfully to the socket.io server. My server side ID is ' + data.id );

    this.currentPlayerId = data.id;
    this.game.addPlayer(data.id);
    // debugger
    this.game.setup();
    // this.game.handleInput();
  }


  onReceivePlayers(data) {
    // console.log(data);
  }

  onPlayerDisconnected(data) {
    console.log(data);
    delete this.game.players[data]
  }

  updatePlayer(id, pos, speed, vel, radius, size, color, zombies, boosting) {
    const player = this.game.players[id];
    if (player) {
      player.x = pos[0];
      player.y = pos[1];
      // player.speedMultiplier = speed;
      player.color = color;
      player.boosting = boosting;
      player.radius = radius;
      player.size = size;
      player.zombies = zombies;
      player.changeXVel(vel[0])
      player.changeYVel(vel[1])
      // player.update(0, this.game.worldWidth, this.game.worldHeight)
    } else {
      const existingPlayer = new Player(id, pos[0], pos[1], zombies.length, this.game, color);
      existingPlayer.radius = radius;
      this.game.players[id] = existingPlayer;
    }
  }

  draw(data) {

    Object.values(data.players).forEach((player) => {
      this.updatePlayer(player.id, player.pos, player.speed, player.vel, player.radius, player.size, player.color, player.zombies, player.boosting);
      // console.log(this.game.players[player.id].x, this.game.players[player.id].y)
    }, this);
    Object.keys(this.game.players).forEach((id) => {
      if (!Object.keys(data.players).includes(id)) {
        delete this.game.players[id];
      }
    }, this);
    this.game.nectar = [];
    Object.values(data.nectar).forEach((nectar) => {
      if (nectar) {
        // console.log(nectar.shadow)
        this.game.addNectar(nectar.x, nectar.y, nectar.radius, nectar.color, nectar.shadow);
      }
    });
    if (this.game.players[this.currentPlayerId]) {
      const currentPlayer = this.game.players[this.currentPlayerId];
      this.game.viewport.update(currentPlayer.x, currentPlayer.y);
      // this.game.viewport.update(this.game.players[this.currentPlayerId].x, this.game.players[this.currentPlayerId].y);
    }
    this.game.draw();
  }

}


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d");
  const socket = io();
  const game_view = new GameView(context, canvas, socket);
});
