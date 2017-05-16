import * as Util from './util';

class Player {
  constructor(id, x, y, size, game, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;

    this.color = color || Util.randomColor();
    this.game = game

    this.velX = 0.7;
    this.velY = 0.7;

    this.speedMultiplier = Player.NORMAL_SPEED;

    // this.width = 50;
    // this.height = 50;

    this.boosting = false;
    this.count = 0;

    this.radius = 15;
    this.zombies = [];
    for (let i = 0; i < this.size; i++) {
      this.zombies.push([this.x, this.y])
    }

    this.inputs = [];
  }

  drawSegment(context, xPos, yPos, stroke) {
    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = "#ccc";
    context.lineWidth = 1;
    if (this.boosting) {
      context.shadowColor = this.color;
      context.shadowBlur = 20;
    }
    context.arc(xPos + this.radius, yPos + this.radius , this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
    context.closePath();
    context.restore();

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
        // this.game.addNectar(nectarCoords[0], nectarCoords[1], 5, this.color);
        this.size -= 2;
        this.radius -= 0.02;
        this.count = 0;
      }
      this.count += 1;
    }
    // console.log(this.zombies.length);
  }

  draw(context, xView, yView) {
    for (let i = this.zombies.length-1; i >= 0; i--) {
      if (i % 3 === 0) {
        const zombie = this.zombies[i];
        const zxPos = zombie[0] - this.radius - xView;
        const zyPos = zombie[1] - this.radius - yView;
        this.drawSegment(context, zxPos, zyPos, true)
      }
    }
    const xPos = (this.x - this.radius) - xView;
    const yPos = (this.y - this.radius) - yView;
    this.drawSegment(context, xPos, yPos, true);
  }

  update(velocityScale, worldWidth, worldHeight) {
    if (this.size > this.zombies.length) {
      for (let i = 0; i < this.size-this.zombies.length; i++) {
        this.zombies.push([])
      }
    }
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
    // this.x += this.velX * this.speedMultiplier; // remove velocity scale from physics update loop
    // this.y += this.velY * this.speedMultiplier; // remove velocity scale from physics update loop

    if (this.x - this.radius < 0) {
      // this.die();
      this.x = this.radius
      // this.game.playerDie(this);
    }
    if (this.y - this.radius < 0) {
      // this.die();
      this.y = this.radius
      // this.game.playerDie(this);
    }
    if (this.x + this.radius > worldWidth) {
      // this.die();
      this.x = worldWidth-this.radius;
      // this.game.playerDie(this);
    }
    if (this.y + this.radius > worldHeight) {
      // this.die();
      this.y = worldHeight-this.radius
      // this.game.playerDie(this);
    }

    if (this.boosting) {
      this.shrink();
    }
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

export default Player;
