import * as Util from './util';

class Nectar {
  constructor(x, y, radius, color, shadow) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color || Util.randomColor();
    this.shadow = shadow || 30;
  }

  rotate() {

  }

  relocate(width, height) {
    this.x = Util.getRandomInt(1, width);
    this.y = Util.getRandomInt(1, height);
  }

  draw(context, xView, yView) {
    context.save();
    context.beginPath();
    context.shadowColor = this.color;
    context.shadowBlur = this.shadow;
    // context.fillStyle = "#9850FF";
    context.fillStyle = this.color;
    // context.lineWidth = 1;
    context.arc(this.x+this.radius - xView, this.y+this.radius - yView, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
  }
}

export default Nectar;