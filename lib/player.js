

class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size
    this.color = color;

    this.velX = 0
    this.velY = 0

    this.speedMultiplier = 3;

    this.width = 50;
    this.height = 50;

    this.radius = 15;
    this.zombies = [];
    for (let i = 0; i < this.size; i++) {
      this.zombies.push([this.x, this.y])
    }

  }


  drawSegment(context, xPos, yPos, stroke) {
    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = "#000";
    context.lineWidth = 1;
    context.arc(xPos + this.radius, yPos + this.radius , this.radius, 0, Math.PI * 2, false);
    context.fill();
    if (stroke === true) {
      context.stroke();
    }
    context.restore();
  }

  grow() {
    const lastZombie = this.zombies[this.size-1]
    this.zombies.push([lastZombie[0], lastZombie[1]]);
    this.size += 1;
    this.radius += 0.01;
  }


  draw(context, xView, yView) {
    for (let i = this.zombies.length-1; i >= 0; i--) {
      if (i % 4 === 0) {
        const zombie = this.zombies[i];
        const zxPos = zombie[0] - this.radius - xView;
        const zyPos = zombie[1] - this.radius - yView;
        this.drawSegment(context, zxPos, zyPos, true)
      }
      // const zombie = this.zombies[i];
      // const zxPos = zombie[0] - this.radius - xView;
      // const zyPos = zombie[1] - this.radius - yView;
      // this.drawSegment(context, zxPos, zyPos, true)
    }

    const xPos = (this.x - this.radius) - xView;
    const yPos = (this.y - this.radius) - yView;

    this.drawSegment(context, xPos, yPos, true);
  }

  update(velocityScale, worldWidth, worldHeight) {

    let startX = this.x;
    let startY = this.y;

    for (let i = 0; i < this.zombies.length; i++) {
      let zX = this.zombies[i][0];
      let zY = this.zombies[i][1];

      // console.log(change);
      this.zombies[i][0] = startX;
      this.zombies[i][1] = startY;
      startX = zX;
      startY = zY;
    }

    this.x += (this.velX * velocityScale) * this.speedMultiplier;
    this.y += (this.velY * velocityScale) * this.speedMultiplier;

    if (this.x - this.radius < 0) {
      this.x = this.radius;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
    }
    if (this.x + this.radius > worldWidth) {
      this.x = worldWidth - this.radius;
    }
    if (this.y + this.radius > worldHeight) {
      this.y = worldHeight - this.radius;
    }
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

export default Player;
