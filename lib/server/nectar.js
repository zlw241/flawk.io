"use strict";

const Util = require('../util');

class Nectar {
  constructor(id, x, y, radius, color, shadow) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.vel = [0, 0];
    this.radius = radius;
    this.color = color || Util.randomColor();
    this.shadow = shadow || 30;
  }

  vacuumMotion(player) {
    const vector = Math.atan2((player.y - this.y), (player.x - this.x))
    return Util.radiansToVector(vector);
  }

  relocate(width, height) {
    this.x = Util.getRandomInt(1, width);
    this.y = Util.getRandomInt(1, height);
  }

}

module.exports = Nectar;
