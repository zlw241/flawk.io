
class Viewport {
  constructor(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {
    this.xView = xView || 0;
    this.yView = yView || 0;

    // distance from followed object to border before camera starts to move
    this.xDeadZone = 0;
    this.yDeadZone = 0;

    // viewport dimensions
    this.wView = canvasWidth;
    this.hView = canvasHeight;

    this.followed = null;

    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
  }

  follow(gameObject, xDeadZone, yDeadZone) {
    this.followed = gameObject;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }

  update() {
    if ((this.followed.x - this.xView + this.xDeadZone) > this.wView) {
      this.xView = this.followed.x - (this.wView - this.xDeadZone);
    } else if (this.followed.x - this.xDeadZone < this.xView) {
      this.xView = this.followed.x - this.xDeadZone;
    }

    if ((this.followed.y - this.yView + this.yDeadZone) > this.hView) {
      this.yView = this.followed.y - (this.hView - this.yDeadZone);
    } else if (this.followed.y - this.yDeadZone < this.yView) {
      this.yView = this.followed.y - this.yDeadZone;
    }

    if (this.xView < 0) {
      this.xView = 0
    }
    if (this.yView < 0) {
      this.yView = 0
    }
    if (this.xView + this.wView > this.worldWidth) {
      this.xView = this.worldWidth - this.wView;
    }
    if (this.yView + this.hView > this.worldHeight) {
      this.yView = this.worldHeight - this.hView;
    }
    // }
  }
}

export default Viewport;
