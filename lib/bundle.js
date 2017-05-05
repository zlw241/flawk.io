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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nectar__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(6);







class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.world = new __WEBPACK_IMPORTED_MODULE_0__world__["a" /* default */](5000, 5000);
    this.player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](50, 50, 75, this.randomColor());
    this.viewport = new __WEBPACK_IMPORTED_MODULE_2__viewport__["a" /* default */](0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);
    this.nectar = []
    this.nectarCount = 700;
    this.setup();
  }


  setup() {
    setTimeout(() => {
      this.handleInput();
    }, 3000);
    this.world.generate();
    this.viewport.follow(this.player, this.canvas.width / 2, this.canvas.height / 2);
    this.populate();


  }

  randomColor() {
    const colors = ['#9850FF', '#FE5F5C', '#FF5EAE', '#69FE60', '#5EFFE5', '#FEFB5B', '#695DFE', '#EDA14B'];
    return colors[Math.floor(Math.random() * colors.length)]
  }

  populate() {
    for (let i = 0; i < this.nectarCount; i++) {
      const x = __WEBPACK_IMPORTED_MODULE_4__util__["a" /* getRandomInt */](1, this.world.width);
      const y = __WEBPACK_IMPORTED_MODULE_4__util__["a" /* getRandomInt */](1, this.world.height);
      const color = this.randomColor();
      this.nectar.push(new __WEBPACK_IMPORTED_MODULE_3__nectar__["a" /* default */](x ,y, color))
    }
  }

  update(delta) {
    const normal_frame_time = 1000/60;
    const velocityScale = delta / normal_frame_time

    this.player.update(velocityScale, this.world.width, this.world.height);
    this.viewport.update();
    this.handleCollisions();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.draw(this.context, this.viewport.xView, this.viewport.yView);

    this.nectar.forEach((nectar) => nectar.draw(this.context, this.viewport.xView, this.viewport.yView))
    // this.nectar.draw(this.context, this.viewport.xView, this.viewport.yView);
    this.player.draw(this.context, this.viewport.xView, this.viewport.yView);
  }



  handleCollisions() {
    this.nectar.forEach((nectar) => {
      const centerDist = __WEBPACK_IMPORTED_MODULE_4__util__["b" /* dist */]([this.player.x, this.player.y], [nectar.x, nectar.y]);
      if (centerDist < (this.player.radius + nectar.radius)) {
        nectar.relocate(this.world.width, this.world.height);
        for (let i = 0; i < nectar.radius / 3; i++) {
          this.player.grow();
        }
      }
    })
  }

  start() {
    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(time) {
    if (!this.lastTime) {
      this.lastTime = time;
    }

    const delta = -(this.lastTime - time);

    this.update(delta);
    this.draw();

    this.lastTime = time;
    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  handleInput() {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.player.changeBoost(4);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        this.player.changeBoost(3);
      }
    });

    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.player.changeBoost(4);
    });

    document.addEventListener('mouseup', (e) => {
      e.preventDefault();
      this.player.changeBoost(3);
    })

    document.addEventListener('mousemove', (e) => {
      e.preventDefault();

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

      // const slope = calcSlope(oX, oY, mX, mY);
      const degrees = slopeToDegrees(dX, dY);


      // const [newX, newY] = newVector(degrees)
      const [newX, newY] = newVector(degrees);
      this.player.changeXVel(newX);
      this.player.changeYVel(newY);
    });
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas);

  game.start();

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


/* harmony default export */ __webpack_exports__["a"] = (World);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(6);


class Nectar {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* getRandomInt */](3,8);
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

/* harmony default export */ __webpack_exports__["a"] = (Nectar);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = dist;
/* unused harmony export randomPos */
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandomInt;



function dist(pos1, pos2) {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
}

function randomPos(width, height) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return [x, y];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map