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
    // this.socket.on("update", this.update.bind(this));
    this.socket.on("player disconnected", this.onPlayerDisconnected.bind(this));
    this.socket.on("players", this.onReceivePlayers.bind(this));
    this.socket.on("nectar update", this.onReceiveNectar.bind(this));

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


  onReceiveNectar(data) {
    // console.log(data);
    Object.keys(this.game.nectar).forEach((id) => {
      if (!Object.keys(data).includes(id)) {
        delete this.game.nectar[id];
      }
    });
    Object.values(data).forEach((nectar) => {
      if (nectar) {
        this.game.addNectar(nectar.id, nectar.x, nectar.y, nectar.radius, nectar.color, nectar.shadow);
      }
    });
  }

  updatePlayer(id, pos, speed, vel, radius, size, color, zombies, boosting) {
    const player = this.game.players[id];
    if (player) {
      // if (Util.dist([player.x, player.y], pos) > 10) {
      //   console.log('popped to position');
      //   console.log(Util.dist([player.x, player.y], pos))
      //   player.x = pos[0];
      //   player.y = pos[1];
      // }

      player.x = ((9*player.x) + pos[0]) / 10;
      player.y = ((9*player.y) + pos[1]) / 10;

      player.speedMultiplier = speed;
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
    // console.log(JSON.stringify(data).length)

    Object.values(data.players).forEach((player) => {
      // console.log(player.speed)
      this.updatePlayer(player.id, player.pos, player.speed, player.vel, player.radius, player.size, player.color, player.zombies, player.boosting);
    }, this);
    Object.keys(this.game.players).forEach((id) => {
      if (!Object.keys(data.players).includes(id)) {
        delete this.game.players[id];
      }
    }, this);
    data.nectar.deleted.forEach((id) => {
      delete this.game.nectar[id];
    });
    // console.log(data.nectar.moved);
    data.nectar.moved.forEach((nectar) => {
      const n = this.game.nectar[nectar[0]];
      if (n) {
        n.x = nectar[1];
        n.y = nectar[2];
      // }
      }
      // console.log(this.game.nectar[nectar[0]])
      // console.log(nectar);
      // this.game.nectar[nectar[0]].x = nectar[1];
      // this.game.nectar[nectar[0]].y = nectar[2];
    });
    // Object.keys(this.game.nectar).forEach((id) => {
    //   if (!Object.keys(data.nectar).includes(id)) {
    //     delete this.game.nectar[id];
    //   }
    // });
    // Object.values(data.nectar).forEach((nectar) => {
    //   if (nectar) {
    //     this.game.addNectar(nectar.id, nectar.x, nectar.y, nectar.radius, nectar.color, nectar.shadow);
    //   }
    // });
    if (this.game.players[this.currentPlayerId]) {
      const currentPlayer = this.game.players[this.currentPlayerId];
      console.log(currentPlayer.inputs[currentPlayer.inputs.length-1], data.players[this.currentPlayerId].lastInput)
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
