/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewport__ = __webpack_require__(3);





class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.world = new __WEBPACK_IMPORTED_MODULE_0__world__["a" /* default */](5000, 5000);
    this.player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](50, 50);
    this.viewport = new __WEBPACK_IMPORTED_MODULE_2__viewport__["a" /* default */](0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);
    this.setup();
  }

  setup() {
    this.world.generate();
    this.viewport.follow(this.player, this.canvas.width / 2, this.canvas.height / 2);
    this.handleInput();
  }

  update(delta) {
    const normal_frame_time = 1000/60;
    const velocityScale = delta / normal_frame_time

    this.player.update(velocityScale, this.world.width, this.world.height);
    // this.player.x += 1 * velocityScale;
    // this.player.y += 1 * velocityScale;
    this.viewport.update();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.draw(this.context, this.viewport.xView, this.viewport.yView);
    this.player.draw(this.context, this.viewport.xView, this.viewport.yView);
  }

  start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(time) {
    if (!this.lastTime) {
      this.lastTime = time;
    }

    const delta = -(this.lastTime - time);

    this.update(delta);
    this.draw();
    this.lastTime = time;
    requestAnimationFrame(this.gameLoop.bind(this))
  }

  handleInput() {
    // document.addEventListener("keydown", (e) => {
    //   switch(e.key) {
    //     case "a": {
    //       this.player.changeXVel(-1);
    //       break;
    //     }
    //     case "s": {
    //       this.player.changeYVel(1);
    //       break;
    //     }
    //     case "d": {
    //       this.player.changeXVel(1);
    //       break;
    //     }
    //     case "w": {
    //       this.player.changeYVel(-1);
    //       break;
    //     }
    //     case " ": {
    //       this.player.changeBoost(6);
    //       break;
    //     }
    //     default: {
    //       console.log(e.key )
    //     }
    //   }
    // })
    //
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.player.changeBoost(6);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        this.player.changeBoost(3);
      }
    });


    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      const calcSlope = (x1, y1, x2, y2) => {
        return (y2-y1) / (x2-x1)
      }

      const slopeToDegrees = (x, y) => {
        return Math.atan2(y, x) / (Math.PI / 180)
      }

      const newVector = (degrees) => {
        const x = Math.sin(degrees * (Math.PI / 180))
        const y = Math.cos(degrees * (Math.PI / 180))
        return [y, x]
      }

      // top-left coordinates of the canvas on the document
      const canvasCoords = this.canvas.getBoundingClientRect();

      // the 'origin' -> coordinates of the player relative to the top-left corner of the canvas
      const oX = canvasCoords.left + (this.player.x - this.viewport.xView);
      const oY = canvasCoords.top + (this.player.y - this.viewport.yView);

      // coordinates of mouse position on document
      const mX = e.clientX;
      const mY = e.clientY;

      // difference between mouse coords and origin coords
      const dX = (mX - oX);
      const dY = (mY - oY);

      const slope = calcSlope(oX, oY, mX, mY);
      const degrees = slopeToDegrees(dX, dY);
      // console.log(slope, degrees);
      // console.log(slope, degrees);

      const [newX, newY] = newVector(degrees)
      this.player.changeXVel(newX);
      this.player.changeYVel(newY)
      // console.log(newX);

    });
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas);
  document.addEventListener('click', (e) => {
    e.preventDefault();
    game.start();
  })
  // const canvas = document.getElementById("game-canvas");
  // const game = new Game(canvas);
  // game.start();

})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  generate() {
    let ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    const rows = ~~(this.width/44) + 1;
    const columns = ~~(this.height/44) + 1;

    ctx.fillStyle = "#070B0F";
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.save();

    for (let x = 0; x < rows; x++) {
      ctx.beginPath();
      for (let y = 0; y < columns; y++) {
        ctx.rect(x*44, y*44, 40, 40);
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


/* harmony default export */ __webpack_exports__["a"] = (World);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rectangle__ = __webpack_require__(4);


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

    // Consider removing rectangle, they seem unnecessary
    // this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);
    // this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);

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

    // this.viewportRect.set(this.xView, this.yView);

    // if (!this.viewportRect.within(this.worldRect)) {
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

/* harmony default export */ __webpack_exports__["a"] = (Viewport);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Rectangle {
  constructor(left = 0, top = 0, width = 0, height = 0) {
    this.left = left;
    this.top = top;
    this. width = width;
    this.height = height;

    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  set(left, top, width, height) {
    this.left = left
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height;

    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  within(r) {
    return (r.left <= this.left && r.right >= this.right &&
              r.top <= this.top && r.bottom >= this.bottom);
  }

  overlaps(r) {
    return (this.left < r.right && r.left < this.right &&
              this.top < r.bottom && r.top < this.bottom);
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Rectangle);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map