import Game from './game';


class ClientEngine {
  constructor(context, canvas, socket) {
    this.canvas = canvas
    this.context = context
    this.socket = socket;
    this.game = new Game(this.context, this.canvas, this.socket);
    this.listen();
  }

  listen() {
    this.socket.on("onconnected", (data) => {
      console.log( 'Connected successfully to the socket.io server. My server side ID is ' + data.id );
      window.playerId = data.id;
      this.game.addPlayer(window.playerId);
      this.game.setup();
      this.game.start();
      Object.values(data.existingPlayers).forEach((player) => {
        this.game.addPlayer(player.id);
        this.game.players[player.id].x = player.position[0];
        this.game.players[player.id].y = player.position[1];
      });
    });

    this.socket.on("new player", (data) => {
      this.game.addPlayer(data.id);
    })
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  const context = canvas.getContext("2d");
  const socket = io();
  const clientEngine = new ClientEngine(context, canvas, socket);

})
