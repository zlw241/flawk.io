const Util = require('../util');

class Nectar {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color || Util.randomColor();
  }

  relocate(width, height) {
    this.x = Util.getRandomInt(1, width);
    this.y = Util.getRandomInt(1, height);
  }

}

module.exports = Nectar;
