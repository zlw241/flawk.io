import World from './world';
import Player from './player';
import Viewport from './viewport';
import Nectar from './nectar';
import * as Util from './util';


class Game {
  constructor(context, canvas, socket) {
    this.canvas = canvas;
    this.context = context;
    this.socket = socket;
    this.world = new World(3000, 3000);
    this.viewport = new Viewport(0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);
    this.nectar = [];
    this.players = {};
    // this.playersArr = Object.values(this.players);
    this.nectarCount = 100;
    this.currentPlayerId = null;
    // this.setup();
    this.inputs = 0;

    this.addPlayer = this.addPlayer.bind(this);
  }

  setup() {
    // debugger
    this.handleInput();
    this.world.generate();
    this.viewport.follow(this.players[this.currentPlayerId], this.canvas.width / 2, this.canvas.height / 2);
    this.start(); // run client physics loop
  }

  populate() {
    for (let i = 0; i < this.nectarCount; i++) {
      this.addNectar();
    }
  }

  setCurrentPlayerId(id) {
    this.currentPlayerId = id;
  }

  add(object) {
    if (object instanceof Player) {
      this.players[object.id] = object
      // this.players.push(object);
    } else if (object instanceof Nectar) {
      this.nectar.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  addPlayer(id) {
    const player = new Player(id, 50, 50, 20, this);
    this.add(player);
    this.setCurrentPlayerId(id);
  }

  gameObjects() {
    return [this.world].concat(this.nectar).concat(Object.values(this.players))
  }

  addNectar(x, y, r, c) {
    const xPos = x || Util.getRandomInt(1, this.world.width);
    const yPos = y || Util.getRandomInt(1, this.world.width);
    const radius = r || Util.getRandomInt(3, 8);
    const color = c || Util.randomColor();
    const nectar = new Nectar(xPos, yPos, radius, c);
    this.add(nectar);
  }

  // playerDie(player) {
  //   const coords = player.zombies;
  //   for (let i = 0; i < coords.length; i++) {
  //     if (i % 4 === 0) {
  //       const x = Util.getRandomInt(coords[i][0] - 12, coords[i][0] + 12);
  //       const y = Util.getRandomInt(coords[i][1] - 12, coords[i][1] + 12);
  //       const r = Util.getRandomInt(3, 8);
  //       const c = this.players[player.id].color
  //       this.addNectar(x, y, r, c);
  //     }
  //   }
  //   this.removePlayer(player);
  // }

  removePlayer(player) {
    delete this.players[player.id];
  }

  update(delta) {
    const normal_frame_time = Game.PHYSICS_FRAME_RATE;
    const velocityScale = delta / normal_frame_time

    Object.values(this.players).forEach((player) => {
      player.update(velocityScale, this.world.width, this.world.height);
    });

    if (this.players[this.currentPlayerId]) {
      this.viewport.update(this.players[this.currentPlayerId].x, this.players[this.currentPlayerId].y);
    }
    // this.handleCollisions();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameObjects().forEach((object) => {
      object.draw(this.context, this.viewport.xView, this.viewport.yView);
    });
  }

  // handleCollisions() {
  //   this.nectar.forEach((nectar) => {
  //     Object.values(this.players).forEach((player) => {
  //       const centerDist = Util.dist([player.x, player.y], [nectar.x, nectar.y]);
  //       if (centerDist < (player.radius + nectar.radius)) {
  //         nectar.relocate(this.world.width, this.world.height);
  //         for (let i = 0; i < nectar.radius / 3; i++) {
  //           player.grow();
  //         }
  //       }
  //     });
  //   });
  // }

  start() {
    this.lastTime = Date.now();
    this.requestId = window.setInterval(this.physicsLoop.bind(this), Game.PHYSICS_FRAME_RATE);
  }

  physicsLoop() {
    // if (!this.lastTime) {
    //   this.lastTime = Date.now();
    // }
    const time = Date.now();
    const delta = time - this.lastTime;
    // console.log(delta);
    // this.socket.emit('player position', [this.players[window.playerId].x, this.players[window.playerId].y])
    this.update(delta);
    this.draw();
    this.lastTime = time;
    // this.requestId = window.requestAnimationFrame(this.physicsLoop.bind(this))
  }

  updateLoop() {

  }

  updatePlayerVelocity(targetRadians) {
    const player = this.players[this.currentPlayerId]
    if (player) {
      // send client input to server
      this.socket.emit("player move", {
        id: this.currentPlayerId,
        pos: targetRadians,
        num: this.inputs += 1,
        timestamp: Date.now()
      });

      // radians corresponding to players current velocity
      const startRadians =  Util.vectorToRadians(player.velX, player.velY);
      // player current velocity moved in the direction of the target velocity by PI/32 radians
      const [newX, newY] = Util.calculateNewVector(startRadians, targetRadians);
      // player.inputs.push({ seq: this.inputs, x: player.x, y: player.y })
      player.changeXVel(newX);
      player.changeYVel(newY);
      // console.log(player.zombies.length, player.size);
      // console.log(`last input id: ${this.inputs}\txVel: ${newX}\tyVel: ${newY}\tx: ${player.x}\ty: ${player.y}`);
    }
  }

  handleInput() {
    let down = false;
    document.addEventListener("keydown", (e) => {

      if (e.key === " ") {
        e.preventDefault();
        if (down) {
          return
        }
        this.socket.emit("boost", { id: this.currentPlayerId, status: "on"} );
        this.players[this.currentPlayerId].boost();
        down = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      e.preventDefault()
      if (e.key === " ") {
        if (down) {
          down = false;
        }
        this.socket.emit("boost", { id: this.currentPlayerId, status: "off"});
        this.players[this.currentPlayerId].unboost();
      }
    });

    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.socket.emit("boost", { id: this.currentPlayerId, status: "on"});
      this.players[this.currentPlayerId].boost();
    });

    document.addEventListener('mouseup', (e) => {
      e.preventDefault();
      this.socket.emit("boost", { id: this.currentPlayerId, status: "off"});
      this.players[this.currentPlayerId].unboost();
    });

    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (this.players[this.currentPlayerId]) {
        // top-left coordinates of the canvas on the document
        const canvasCoords = this.canvas.getBoundingClientRect();

        // the 'origin' -> coordinates of the player relative to the top-left corner of the canvas
        const oX = canvasCoords.left + (this.players[this.currentPlayerId].x - this.viewport.xView);
        const oY = canvasCoords.top + (this.players[this.currentPlayerId].y - this.viewport.yView);

        // console.log(oX, oY)
        // coordinates of mouse position on document
        const mX = e.clientX;
        const mY = e.clientY;

        // difference between mouse coords and origin coords
        const dX = (mX - oX);
        const dY = (mY - oY);

        // radians that correspond to vector from origin to mouse coords
        const targetRadians = Util.vectorToRadians(dX, dY);
        this.updatePlayerVelocity(targetRadians);

      }
    });
  }
}

Game.WORLD_WIDTH = 3000;
Game.WORLD_HEIGHT = 3000;
Game.PHYSICS_FRAME_RATE = 1000/66.666;

export default Game;
