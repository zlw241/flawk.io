import * as Util from './util';

class Nectar {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Util.getRandomInt(3,8);
    this.color = color;
  }

  relocate(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(context, xView, yView) {
    context.save();
    context.beginPath();
    context.fillStyle = "#9850FF";
    context.fillStyle = this.color;
    context.strokeStyle = "#000";
    context.lineWidth = 1;
    context.arc(this.x+this.radius - xView, this.y+this.radius - yView, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
  }
}

export default Nectar;
