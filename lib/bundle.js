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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = dist;
/* unused harmony export randomPos */
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandomInt;
/* harmony export (immutable) */ __webpack_exports__["c"] = randomColor;



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

function randomColor() {
  const colors = ['#9850FF', '#FE5F5C', '#FF5EAE', '#69FE60', '#5EFFE5', '#FEFB5B', '#695DFE', '#EDA14B'];
  return colors[Math.floor(Math.random() * colors.length)]
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Nectar {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = __WEBPACK_IMPORTED_MODULE_0__util__["c" /* randomColor */]();
  }

  relocate(width, height) {
    this.x = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* getRandomInt */](1, width);
    this.y = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* getRandomInt */](1, height);
    console.log(this.x, this.y);
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Player {
  constructor(x, y, size, playerDie, addNectar) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.playerDie = playerDie;
    this.purgeNectar = addNectar;
    this.color = __WEBPACK_IMPORTED_MODULE_0__util__["c" /* randomColor */]();

    this.velX = 0
    this.velY = 0

    this.speedMultiplier = 3;

    this.width = 50;
    this.height = 50;

    this.boosting = false;
    this.count = 0;

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
    this.radius += 0.02;
  }

  shrink() {
    if (this.count === 20) {
      const nectarCoords = this.zombies.pop();
      this.purgeNectar(nectarCoords[0], nectarCoords[1], 5);
      this.size -= 1;
      this.radius -= 0.02;
      this.count = 0;
    }
    this.count += 1;
  }

  die() {
    const coords = []
    for (let i = 0; i < this.zombies.length; i++) {
      if (i % 4 === 0) {
        coords.push(this.zombies[i])
      }
    }
    this.playerDie(coords);
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

      // this.zombies[i][0] = startX;
      this.zombies[i] = [startX, startY];
      // this.zombies[i][1] = startY;
      startX = zX;
      startY = zY;
    }

    this.x += (this.velX * velocityScale) * this.speedMultiplier;
    this.y += (this.velY * velocityScale) * this.speedMultiplier;

    if (this.x - this.radius < 0) {

      this.die();
      // this.x = this.radius;
    }
    if (this.y - this.radius < 0) {
      this.die();
      // this.y = this.radius;
    }
    if (this.x + this.radius > worldWidth) {
      this.die();
      // this.x = worldWidth - this.radius;
    }
    if (this.y + this.radius > worldHeight) {
      this.die();
      // this.y = worldHeight - this.radius;
    }

    if (this.boosting) {

      this.shrink();
    }
  }

  boost() {
    this.speedMultiplier = 4;
    this.boosting = true;
  }

  unboost() {
    this.speedMultiplier = 3;
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

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rectangle__ = __webpack_require__(6);


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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nectar__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(0);







class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.world = new __WEBPACK_IMPORTED_MODULE_0__world__["a" /* default */](5000, 5000);
    this.player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](50, 50, 75, this.playerDie.bind(this), this.addNectar.bind(this));
    this.viewport = new __WEBPACK_IMPORTED_MODULE_2__viewport__["a" /* default */](0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);
    this.nectar = [];
    this.players = [this.player];
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

  populate() {
    // this.addPlayer();
    for (let i = 0; i < this.nectarCount; i++) {
      this.addNectar();
    }
  }

  add(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]) {
      this.players.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_3__nectar__["a" /* default */]) {
      this.nectar.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  addPlayer() {
    const player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](50, 50, 75, this.die, this.addNectar.bind(this));
    this.add(player);
  }

  gameObjects() {
    return [this.world].concat(this.nectar).concat(this.players);
  }

  addNectar(x, y, r) {
    const xPos = x || __WEBPACK_IMPORTED_MODULE_4__util__["a" /* getRandomInt */](1, this.world.width);
    const yPos = y || __WEBPACK_IMPORTED_MODULE_4__util__["a" /* getRandomInt */](1, this.world.width);
    const radius = r || __WEBPACK_IMPORTED_MODULE_4__util__["a" /* getRandomInt */](3, 8);
    const nectar = new __WEBPACK_IMPORTED_MODULE_3__nectar__["a" /* default */](xPos, yPos, radius);
    this.add(nectar);
  }

  playerDie(coords) {
    for (let i = 0; i < coords.length; i++) {
      const x = __WEBPACK_IMPORTED_MODULE_4__util__["a" /* getRandomInt */](coords[i][0] - 12, coords[i][0] + 12);
      const y = __WEBPACK_IMPORTED_MODULE_4__util__["a" /* getRandomInt */](coords[i][1] - 12, coords[i][1] + 12);
      this.addNectar(x, y);
    }
    this.players.splice(this.players.indexOf(this.player), 1);
    this.player = null;
  }

  update(delta) {
    const normal_frame_time = 1000/60;
    const velocityScale = delta / normal_frame_time
    this.players.forEach((player) => {
      player.update(velocityScale, this.world.width, this.world.height);
    })
    // if (this.player) {
    //   this.player.update(velocityScale, this.world.width, this.world.height);
    // }
    this.viewport.update();
    this.handleCollisions();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameObjects().forEach((object) => {
      object.draw(this.context, this.viewport.xView, this.viewport.yView);
    });
  }

  handleCollisions() {
    this.nectar.forEach((nectar) => {
      this.players.forEach((player) => {
        const centerDist = __WEBPACK_IMPORTED_MODULE_4__util__["b" /* dist */]([this.player.x, this.player.y], [nectar.x, nectar.y]);
        if (centerDist < (player.radius)) {
          nectar.relocate(this.world.width, this.world.height);
          for (let i = 0; i < nectar.radius / 3; i++) {
            player.grow();
          }
        }
      });
    });
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
        if (this.player) {
          this.player.boost();
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        if (this.player) {
          this.player.unboost();
        }
      }
    });

    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (this.player) {
        this.player.boost();
      }
    });

    document.addEventListener('mouseup', (e) => {
      e.preventDefault();
      if (this.player) {
        this.player.unboost();
      }
    })

    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (this.player) {
        const slopeToDegrees = (x, y) => {
          return Math.atan2(y, x)
        };

        const vectorToRadians = (x, y) => {
          return Math.atan2(y, x);
        }

        const radiansToVector = (radians) => {
          const y = Math.sin(radians);
          const x = Math.cos(radians);
          return [x, y];
        };

        const radiansToDegrees = (radians) => {
          return radians / (Math.PI / 180);
        }

        const degreesToRadians = (degrees) => {
          return degrees * (Math.PI / 180);
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

        const startRadians = vectorToRadians(this.player.velX, this.player.velY);

        const targetRadians = vectorToRadians(dX, dY);

        if (startRadians < 0 && targetRadians < 0) {
          if (startRadians < targetRadians) {
            var [newX, newY] = radiansToVector(startRadians + (Math.PI / 32));
          } else {
            var [newX, newY] = radiansToVector(startRadians - (Math.PI / 32));
          }
        } else if (startRadians > 0 && targetRadians > 0) {
          if (startRadians < targetRadians) {
            var [newX, newY] = radiansToVector(startRadians + (Math.PI / 32));
          } else {
            var [newX, newY] = radiansToVector(startRadians - (Math.PI / 32));
          }
        } else if (startRadians < 0 && targetRadians > 0) {
          if (targetRadians - degreesToRadians(180) > startRadians) {
            var [newX, newY] = radiansToVector(startRadians - (Math.PI / 32));
          } else {
            var [newX, newY] = radiansToVector(startRadians + (Math.PI / 32));
          }
        } else {
          if (targetRadians + degreesToRadians(180) > startRadians) {
            var [newX, newY] = radiansToVector(startRadians - (Math.PI / 32));
          } else {
            var [newX, newY] = radiansToVector(startRadians + (Math.PI / 32));
          }
        }

        this.player.changeXVel(newX);
        this.player.changeYVel(newY);
      }
    });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas);
  game.start();
})


/***/ }),
/* 6 */
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