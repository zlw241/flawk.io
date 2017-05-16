"use strict";

// import * as Util from '../util';
const Util = require('../util')

class Player {
  constructor(id, x, y, size, game) {
    this.id = id;
    this.x = Util.getRandomInt(100,600);
    this.y = Util.getRandomInt(100,600);
    this.size = size;

    this.color = Util.randomColor();
    this.game = game

    this.velX = 0.7;
    this.velY = 0.7;

    this.speedMultiplier = Player.NORMAL_SPEED;

    this.boosting = false;
    this.count = 0;

    this.moveNum = 0;
    this.radius = 15;
    this.zombies = [];
    for (let i = 0; i < this.size; i++) {
      this.zombies.push([this.x, this.y])
    }
  }

  grow() {
    const lastZombie = this.zombies[this.size-1]
    this.zombies.push(lastZombie);
    this.size += 1;
    this.radius += 0.02;
  }

  shrink() {
    if (this.size > 20) {
      if (this.count === 20) {
        const nectarCoords = this.zombies.pop();
        this.zombies.pop();
        this.game.addNectar(nectarCoords[0], nectarCoords[1], 5, this.color);
        this.size -= 2;
        this.radius -= 0.02;
        this.count = 0;
      }
      this.count += 1;
    }
  }

  update(velocityScale, worldWidth, worldHeight) {

    let nextX = this.x;
    let nextY = this.y;
    for (let i = 0; i < this.zombies.length; i++) {
      let zX = nextX;
      let zY = nextY;
      nextX = this.zombies[i][0];
      nextY = this.zombies[i][1];
      this.zombies[i] = [zX, zY];
    }

    if (this.size <= 20) {
      this.boosting = false;
      this.speedMultiplier = Player.NORMAL_SPEED;
    }

    this.x += (this.velX * velocityScale) * this.speedMultiplier;
    this.y += (this.velY * velocityScale) * this.speedMultiplier;
    // this.x += this.velX * this.speedMultiplier; // remove velocity scale for physics loop
    // this.y += this.velY * this.speedMultiplier; // remove velocity scale for physics loop

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

  collideWith(otherPlayer) {
    let contact = false

    for (let i = 0; i < otherPlayer.zombies.length; i++) {
      const segment = otherPlayer.zombies[i];
      const centerDist = Util.dist([this.x, this.y], [segment[0], segment[1]])
      if (centerDist < (this.radius + otherPlayer.radius)) {
        contact = true;
        break
      }
    }
    return contact;
    // otherPlayer.zombies.forEach((segment) => {
    //   const centerDist = Util.dist([this.x, this.y], [segment[0], segment[1]])
    //   if (centerDist < (this.radius + otherPlayer.radius)) {
    //     contact = true;
    //     break
    //   }
    // });
    // return contact;
    // return false;
  }

  boost() {
    this.speedMultiplier = Player.BOOSTED_SPEED;
    this.boosting = true;
  }

  unboost() {
    this.speedMultiplier = Player.NORMAL_SPEED;
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


Player.NORMAL_SPEED = 3;
Player.BOOSTED_SPEED = 5;

module.exports = Player;
