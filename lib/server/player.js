// import * as Util from '../util';
const Util = require('../util')

class Player {
  constructor(id, x, y, size, game) {
    this.id = id;
    this.x = Util.getRandomInt(100,500);
    this.y = Util.getRandomInt(100,500);
    this.size = size;

    this.color = Util.randomColor();
    this.game = game

    this.velX = 0.7;
    this.velY = 0.7;

    this.speedMultiplier = 3;

    this.boosting = false;
    this.count = 0;

    this.radius = 15;
    this.zombies = [];
    for (let i = 0; i < this.size; i++) {
      this.zombies.push([this.x, this.y, [this.velX, this.velY]])
    }
  }

  grow() {
    const lastZombie = this.zombies[this.size-1]
    this.zombies.push([lastZombie[0], lastZombie[1], lastZombie[2]]);
    this.size += 1;
    this.radius += 0.02;
  }

  shrink() {
    if (this.count === 20) {
      const nectarCoords = this.zombies.pop();
      // this.purgeNectar(nectarCoords[0], nectarCoords[1], 5, this.color);
      this.game.addNectar(nectarCoords[0], nectarCoords[1], 5, this.color);
      this.size -= 1;
      this.radius -= 0.02;
      this.count = 0;
    }
    this.count += 1;
  }

  update(velocityScale, worldWidth, worldHeight) {
    let nextX = this.x;
    let nextY = this.y;
    let nextVel = [this.velX, this.velY];
    for (let i = 0; i < this.zombies.length; i++) {
      let zX = nextX;
      let zY = nextY;
      let zV = nextVel;
      nextX = this.zombies[i][0];
      nextY = this.zombies[i][1];
      nextVel = this.zombies[i][2];
      this.zombies[i] = [zX, zY, zV];
    }

    this.x += (this.velX * velocityScale) * this.speedMultiplier;
    this.y += (this.velY * velocityScale) * this.speedMultiplier;

    if (this.x - this.radius < 0) {
      this.x = this.radius
      // this.game.playerDie(this);
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius
      // this.game.playerDie(this);
    }
    if (this.x + this.radius > worldWidth) {
      this.x = worldWidth-this.radius;
      // this.game.playerDie(this);
    }
    if (this.y + this.radius > worldHeight) {
      this.y = worldHeight-this.radius;
      // this.game.playerDie(this);
    }

    if (this.boosting) {
      this.shrink();
    }
  }

  boost() {
    this.speedMultiplier = 4;
    this.boosting = true;
  }

  unboost() {
    this.speedMultiplier = 3;
    this.boosting = false;
  }

  changeXVel(x) {
    this.velX = x;
  }

  changeYVel(y) {
    this.velY = y;
  }

  changeBoost(speed) {
    this.speedMultiplier = speed;
  }
}

module.exports = Player;
