

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.velocity = [2, 2]

    this.width = 50;
    this.height = 50;

  }

  draw(context, xView, yView) {
    context.save();
    context.fillStyle = "black";
    context.fillRect((this.x - this.width/2) - xView, (this.y - this.height/2) - yView, this.width, this.height);
    context.restore();
  }

  update(velocityScale, worldWidth, worldHeight) {

    this.x += this.velocity[0] * velocityScale;
    this.y += this.velocity[1] * velocityScale;

    if (this.x - this.width / 2 < 0) {
      // this.x = this.width/2;
      this.velocity[0] *= -1
    }
    if (this.y - this.height / 2 < 0) {
      // this.y = this.height/2;
      this.velocity[1] *= -1
    }
    if (this.x + this.width / 2 > worldWidth) {
      // this.x = worldWidth - this.width / 2;
      this.velocity[0] *= -1
    }
    if (this.y + this.height/2 > worldHeight) {
      // this.y = worldHeight - this.height / 2;
      this.velocity[1] *= -1
    }
  }
}

export default Player;
