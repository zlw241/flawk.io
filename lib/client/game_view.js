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
    this.listen();
  }

  listen() {
    this.socket.on("onConnected", this.start.bind(this));
    this.socket.on("new player", this.registerNewPlayer.bind(this));
    this.socket.on("draw", this.draw.bind(this));
    this.socket.on("update", this.update.bind(this));
  }

  start(data) {
    console.log( 'Connected successfully to the socket.io server. My server side ID is ' + data.id );
    console.log(data);
    this.currentPlayerId = data.id;
    this.game.addPlayer(data.id);
    this.game.setup();
    this.game.handleInput();
    // this.mouseMoveListener();
  }

  update(data) {
    Object.values(data).forEach((data) => {
      // debugger
      const player = this.game.players[data.id];
      if (player) {
        player.update()
      } else {
        // debugger
        const unregisteredPlayer = new Player(data.id, data.pos[0], data.pos[1], data.zombies.length, this.game, data.color);
        this.game.players[data.id] = unregisteredPlayer;
      }
    }, this);
  }

  registerNewPlayer(data) {
    console.log(data);
    const newPlayer = new Player(data.id, data.x, data.y, 75, this.game, data.color);
    this.game.players[data.id] = newPlayer;
  }


  updatePlayerPos(id, pos, speed, vel) {
    const player = this.game.players[id];
    if (player) {
      // debugger
      player.x = pos[0];
      player.y = pos[1];
      player.speed = speed;
      player.changeXVel(vel[0])
      player.changeYVel(vel[1])
    }
  }

  draw(data) {
    Object.values(data).forEach((player) => {
      // debugger
      this.updatePlayerPos(player.id, player.pos, player.speed, player.vel)
    }, this);
    this.game.draw();
  }

}


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  canvas.width = 700;
  canvas.height = 700;
  const context = canvas.getContext("2d");
  const socket = io();
  const game_view = new GameView(context, canvas, socket);

});
