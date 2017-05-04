

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.velX = 0
    this.velY = 0

    this.speedMultiplier = 3;

    this.width = 50;
    this.height = 50;

    this.zombies = [];
    for (let i = 0; i < 150; i++) {
      this.zombies.push([this.x, this.y])
    }

    // this.handleInput();
  }


  drawSegment(context, xPos, yPos, stroke) {
    context.save();
    context.beginPath();
    context.fillStyle = "#9850FF";
    context.strokeStyle = "#000";
    context.lineWidth = 1;
    context.arc(xPos+25, yPos+25, 25, 0, Math.PI * 2, false);
    context.fill();
    if (stroke === true) {
      context.stroke();
    }
    context.restore();
  }


  draw(context, xView, yView) {


    for (let i = this.zombies.length-1; i > 0; i--) {
      const zombie = this.zombies[i];
      const zxPos = (zombie[0] - (this.width / 2)) - xView;
      const zyPos = (zombie[1] - (this.height / 2)) - yView;
      this.drawSegment(context, zxPos, zyPos, true)
    }
    // this.zombies.forEach((zombie) => {
    //     const zxPos = (zombie[0] - (this.width / 2)) - xView;
    //     const zyPos = (zombie[1] - (this.height / 2)) - yView;
    //     this.drawSegment(context, zxPos, zyPos)
    // });

    const xPos = (this.x - (this.width / 2)) - xView;
    const yPos = (this.y - (this.height / 2)) - yView;

    this.drawSegment(context,xPos, yPos, true);
  }

  update(velocityScale, worldWidth, worldHeight) {

    let startX = this.x;
    let startY = this.y;

    for (let i = 0; i < this.zombies.length; i++) {
      let zX = this.zombies[i][0];
      let zY = this.zombies[i][1];
      this.zombies[i][0] = startX;
      this.zombies[i][1] = startY;
      startX = zX;
      startY = zY;
    }

    this.x += (this.velX * velocityScale) * this.speedMultiplier;
    this.y += (this.velY * velocityScale) * this.speedMultiplier;

    if (this.x - this.width / 2 < 0) {
      this.x = this.width/2;
    }
    if (this.y - this.height / 2 < 0) {
      this.y = this.height/2;
    }
    if (this.x + this.width / 2 > worldWidth) {
      this.x = worldWidth - this.width / 2;
    }
    if (this.y + this.height/2 > worldHeight) {
      this.y = worldHeight - this.height / 2;
    }

  }

  changeXVel(x) {

    this.velX = x;

    // this.velX = x;
  }

  changeYVel(y) {
    this.velY = y;
  }

  changeBoost(speed) {
    this.speedMultiplier = speed;
  }

}

export default Player;
