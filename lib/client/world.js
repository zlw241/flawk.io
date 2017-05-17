'use strict';


class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  generate() {
    let ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    const rows = ~~(this.width/88) + 1;
    const columns = ~~(this.height/88) + 1;

    ctx.fillStyle = "#070B0F";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.save();

    for (let x = 0; x < rows; x++) {
      ctx.beginPath();
      for (let y = 0; y < columns; y++) {
        ctx.rect(x*88, y*88, 84, 84);
      }
      ctx.fillStyle = "#23292E";
      ctx.fill();
      ctx.closePath();
    }

    ctx.restore();

    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");
    ctx = null;
  }

  draw(context, xView, yView) {
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      -xView,
      -yView,
      this.image.width,
      this.image.height
    );
  }
}


export default World;
