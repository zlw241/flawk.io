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
    this.socket.on("onConnected", this.start.bind(this));
    this.socket.on("new player", this.registerNewPlayer.bind(this));
    this.socket.on("draw", this.draw.bind(this));
    this.socket.on("update", this.update.bind(this));
    this.socket.on("player disconnected", this.onPlayerDisconnected.bind(this));
    this.socket.on("players", this.onReceivePlayers.bind(this));
    // this.socket.on("remove player", this.removePlayer.bind(this))
  }

  start(data) {
    console.log( 'Connected successfully to the socket.io server. My server side ID is ' + data.id );

    this.currentPlayerId = data.id;
    this.game.addPlayer(data.id);
    this.game.setup();
    // this.game.handleInput();
  }

  update(data) {
    // console.log("data.players", Object.keys(data.players))
    // console.log("this.game.players",Object.keys(this.game.players))
    // Object.values(data.players).forEach((d) => {
    //   const player = this.game.players[d.id];
    //   if (player) {
    //     this.moveNum = d.moveNum;
    //     player.update(0, this.game.worldWidth, this.game.worldHeight)
    //   } else {
    //     const existingPlayer = new Player(d.id, d.pos[0], d.pos[1], d.zombies.length, this.game, d.color);
    //     existingPlayer.radius = d.radius;
    //     this.game.players[d.id] = existingPlayer;
    //   }
    // }, this);
    // Object.keys(this.game.players).forEach((id) => {
    //   if (!Object.keys(data.players).includes(id)) {
    //     delete this.game.players[id];
    //   }
    // })
    // this.game.nectar = data.nectar;
  }

  onReceivePlayers(data) {
    console.log(data);
  }

  registerNewPlayer(data) {
    const newPlayer = new Player(data.id, data.x, data.y, 75, this.game, data.color);
    this.game.players[data.id] = newPlayer;
  }

  onPlayerDisconnected(data) {
    console.log(data);
    delete this.game.players[data]
  }

  // removePlayer(data) {
  //   this.game.removePlayer(data.userId);
  //   delete this.game.players[data];
  //   console.log(Object.values(this.game.players).length)
  // }

  updatePlayer(id, pos, speed, vel, radius, size, color, zombies, boosting) {
    const player = this.game.players[id];
    if (player) {
      // debugger
      player.x = pos[0];
      player.y = pos[1];
      // player.speedMultiplier = speed;
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
    }, this);
    Object.keys(this.game.players).forEach((id) => {
      if (!Object.keys(data.players).includes(id)) {
        delete this.game.players[id];
      }
    });
    this.game.nectar = []
    Object.values(data.nectar).forEach((nectar) => {
      if (nectar) {
        // console.log(nectar.shadow)
        this.game.addNectar(nectar.x, nectar.y, nectar.radius, nectar.color, nectar.shadow);
      }
    });
    if (this.game.players[this.currentPlayerId]) {
      this.game.viewport.update(this.game.players[this.currentPlayerId].x, this.game.players[this.currentPlayerId].y);
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