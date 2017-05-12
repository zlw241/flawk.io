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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.dist = dist;
exports.randomPos = randomPos;
exports.getRandomInt = getRandomInt;
exports.randomColor = randomColor;
exports.slopeToDegrees = slopeToDegrees;
exports.vectorToRadians = vectorToRadians;
exports.radiansToVector = radiansToVector;
exports.radiansToDegrees = radiansToDegrees;
exports.degreesToRadians = degreesToRadians;
exports.calculateNewVector = calculateNewVector;
function dist(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
}

function randomPos(width, height) {
  var x = Math.random() * width;
  var y = Math.random() * height;
  return [x, y];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  var colors = ['#9850FF', '#FE5F5C', '#FF5EAE', '#69FE60', '#5EFFE5', '#FEFB5B', '#695DFE', '#EDA14B'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function slopeToDegrees(x, y) {
  return Math.atan2(y, x);
};

function vectorToRadians(x, y) {
  return Math.atan2(y, x);
}

function radiansToVector(radians) {
  var y = Math.sin(radians);
  var x = Math.cos(radians);
  return [x, y];
};

function radiansToDegrees(radians) {
  return radians / (Math.PI / 180);
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateNewVector(startRadians, targetRadians) {
  if (startRadians < 0 && targetRadians < 0) {
    if (startRadians < targetRadians) {
      var _radiansToVector = radiansToVector(startRadians + Math.PI / 16),
          _radiansToVector2 = _slicedToArray(_radiansToVector, 2),
          newX = _radiansToVector2[0],
          newY = _radiansToVector2[1];
    } else {
      var _radiansToVector3 = radiansToVector(startRadians - Math.PI / 16),
          _radiansToVector4 = _slicedToArray(_radiansToVector3, 2),
          newX = _radiansToVector4[0],
          newY = _radiansToVector4[1];
    }
  } else if (startRadians > 0 && targetRadians > 0) {
    if (startRadians < targetRadians) {
      var _radiansToVector5 = radiansToVector(startRadians + Math.PI / 16),
          _radiansToVector6 = _slicedToArray(_radiansToVector5, 2),
          newX = _radiansToVector6[0],
          newY = _radiansToVector6[1];
    } else {
      var _radiansToVector7 = radiansToVector(startRadians - Math.PI / 16),
          _radiansToVector8 = _slicedToArray(_radiansToVector7, 2),
          newX = _radiansToVector8[0],
          newY = _radiansToVector8[1];
    }
  } else if (startRadians < 0 && targetRadians > 0) {
    if (targetRadians - degreesToRadians(180) > startRadians) {
      var _radiansToVector9 = radiansToVector(startRadians - Math.PI / 16),
          _radiansToVector10 = _slicedToArray(_radiansToVector9, 2),
          newX = _radiansToVector10[0],
          newY = _radiansToVector10[1];
    } else {
      var _radiansToVector11 = radiansToVector(startRadians + Math.PI / 16),
          _radiansToVector12 = _slicedToArray(_radiansToVector11, 2),
          newX = _radiansToVector12[0],
          newY = _radiansToVector12[1];
    }
  } else {
    if (targetRadians + degreesToRadians(180) > startRadians) {
      var _radiansToVector13 = radiansToVector(startRadians - Math.PI / 16),
          _radiansToVector14 = _slicedToArray(_radiansToVector13, 2),
          newX = _radiansToVector14[0],
          newY = _radiansToVector14[1];
    } else {
      var _radiansToVector15 = radiansToVector(startRadians + Math.PI / 16),
          _radiansToVector16 = _slicedToArray(_radiansToVector15, 2),
          newX = _radiansToVector16[0],
          newY = _radiansToVector16[1];
    }
  }
  return [newX, newY];
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(id, x, y, size, game, color) {
    _classCallCheck(this, Player);

    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;

    this.color = color || Util.randomColor();
    this.game = game;

    this.velX = 0.7;
    this.velY = 0.7;

    this.speedMultiplier = 6;

    this.width = 50;
    this.height = 50;

    this.boosting = false;
    this.count = 0;

    this.radius = 15;
    this.zombies = [];
    for (var i = 0; i < this.size; i++) {
      this.zombies.push([this.x, this.y, [this.velX, this.velY]]);
    }
  }

  _createClass(Player, [{
    key: "drawSegment",
    value: function drawSegment(context, xPos, yPos, stroke) {
      context.save();
      context.beginPath();
      context.fillStyle = this.color;
      context.strokeStyle = "#ccc";
      context.lineWidth = 1;
      if (this.boosting) {
        context.shadowColor = this.color;
        context.shadowBlur = 20;
      }
      context.arc(xPos + this.radius, yPos + this.radius, this.radius, 0, Math.PI * 2, false);
      context.fill();
      context.stroke();
      context.closePath();
      context.restore();
    }
  }, {
    key: "grow",
    value: function grow() {
      var lastZombie = this.zombies[this.size - 1];
      this.zombies.push(lastZombie);
      this.size += 1;
      this.radius += 0.02;
    }
  }, {
    key: "shrink",
    value: function shrink() {
      if (this.count === 10) {
        var nectarCoords = this.zombies.pop();
        // this.purgeNectar(nectarCoords[0], nectarCoords[1], 5, this.color);
        this.game.addNectar(nectarCoords[0], nectarCoords[1], 5, this.color);
        this.size -= 1;
        this.radius -= 0.02;
        this.count = 0;
      } else {
        this.count += 1;
      }
      // console.log(this.zombies.length);
    }
  }, {
    key: "draw",
    value: function draw(context, xView, yView) {
      for (var i = this.zombies.length - 1; i >= 0; i--) {
        if (i % 2 === 0) {
          var zombie = this.zombies[i];
          var zxPos = zombie[0] - this.radius - xView;
          var zyPos = zombie[1] - this.radius - yView;
          this.drawSegment(context, zxPos, zyPos, true);
        }
      }
      var xPos = this.x - this.radius - xView;
      var yPos = this.y - this.radius - yView;
      this.drawSegment(context, xPos, yPos, true);
    }

    // update(velocityScale, worldWidth, worldHeight) {
    //   if (this.size > this.zombies.length) {
    //     for (let i = 0; i < this.size-this.zombies.length; i++) {
    //       this.zombies.push([])
    //     }
    //   }
    //   let nextX = this.x;
    //   let nextY = this.y;
    //   let nextVel = [this.velX, this.velY];
    //   for (let i = 0; i < this.zombies.length; i++) {
    //     let zX = nextX;
    //     let zY = nextY;
    //     let zV = nextVel;
    //     nextX = this.zombies[i][0];
    //     nextY = this.zombies[i][1];
    //     nextVel = this.zombies[i][2];
    //     this.zombies[i] = [zX, zY, zV];
    //   }
    //
    //   this.x += (this.velX * velocityScale) * this.speedMultiplier;
    //   this.y += (this.velY * velocityScale) * this.speedMultiplier;
    //
    //   if (this.x - this.radius < 0) {
    //     // this.die();
    //     this.x = this.radius
    //     // this.game.playerDie(this);
    //   }
    //   if (this.y - this.radius < 0) {
    //     // this.die();
    //     this.y = this.radius
    //     // this.game.playerDie(this);
    //   }
    //   if (this.x + this.radius > worldWidth) {
    //     // this.die();
    //     this.x = this.worldWidth-this.radius
    //     // this.game.playerDie(this);
    //   }
    //   if (this.y + this.radius > worldHeight) {
    //     // this.die();
    //     this.y = this.worldHeight-this.radius
    //     // this.game.playerDie(this);
    //   }
    //
    //   if (this.boosting) {
    //     this.shrink();
    //   }
    // }

  }, {
    key: "boost",
    value: function boost() {
      this.speedMultiplier = 10;
      this.boosting = true;
    }
  }, {
    key: "unboost",
    value: function unboost() {
      this.speedMultiplier = 6;
      this.boosting = false;
    }
  }, {
    key: "changeXVel",
    value: function changeXVel(x) {
      this.velX = x;
    }
  }, {
    key: "changeYVel",
    value: function changeYVel(y) {
      this.velY = y;
    }
  }, {
    key: "changeBoost",
    value: function changeBoost(speed) {
      this.speedMultiplier = speed;
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _world = __webpack_require__(6);

var _world2 = _interopRequireDefault(_world);

var _player = __webpack_require__(1);

var _player2 = _interopRequireDefault(_player);

var _viewport = __webpack_require__(5);

var _viewport2 = _interopRequireDefault(_viewport);

var _nectar = __webpack_require__(4);

var _nectar2 = _interopRequireDefault(_nectar);

var _util = __webpack_require__(0);

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(context, canvas, socket) {
    _classCallCheck(this, Game);

    this.canvas = canvas;
    this.context = context;
    this.socket = socket;
    this.world = new _world2.default(3000, 3000);
    this.viewport = new _viewport2.default(0, 0, this.canvas.width, this.canvas.height, this.world.width, this.world.height);
    this.nectar = [];
    this.players = {};
    // this.playersArr = Object.values(this.players);
    this.nectarCount = 300;
    this.currentPlayerId = null;
    // this.setup();
    this.inputs = 0;
  }

  _createClass(Game, [{
    key: 'setup',
    value: function setup() {
      this.handleInput();
      this.world.generate();
      this.viewport.follow(this.players[this.currentPlayerId], this.canvas.width / 2, this.canvas.height / 2);
      // this.start()
    }
  }, {
    key: 'populate',
    value: function populate() {
      for (var i = 0; i < this.nectarCount; i++) {
        this.addNectar();
      }
    }
  }, {
    key: 'setCurrentPlayerId',
    value: function setCurrentPlayerId(id) {
      this.currentPlayerId = id;
    }
  }, {
    key: 'add',
    value: function add(object) {
      if (object instanceof _player2.default) {
        this.players[object.id] = object;
        // this.players.push(object);
      } else if (object instanceof _nectar2.default) {
        this.nectar.push(object);
      } else {
        throw "unknown type of object";
      }
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(id) {
      var player = new _player2.default(id, 50, 50, 75, this);
      this.add(player);
      this.setCurrentPlayerId(id);
    }
  }, {
    key: 'gameObjects',
    value: function gameObjects() {
      return [this.world].concat(this.nectar).concat(Object.values(this.players));
    }
  }, {
    key: 'addNectar',
    value: function addNectar(x, y, r, c) {
      var xPos = x || Util.getRandomInt(1, this.world.width);
      var yPos = y || Util.getRandomInt(1, this.world.width);
      var radius = r || Util.getRandomInt(3, 8);
      var color = c || Util.randomColor();
      var nectar = new _nectar2.default(xPos, yPos, radius, c);
      this.add(nectar);
    }

    // playerDie(player) {
    //   const coords = player.zombies;
    //   for (let i = 0; i < coords.length; i++) {
    //     if (i % 4 === 0) {
    //       const x = Util.getRandomInt(coords[i][0] - 12, coords[i][0] + 12);
    //       const y = Util.getRandomInt(coords[i][1] - 12, coords[i][1] + 12);
    //       const r = Util.getRandomInt(3, 8);
    //       const c = this.players[player.id].color
    //       this.addNectar(x, y, r, c);
    //     }
    //   }
    //   this.removePlayer(player);
    // }

  }, {
    key: 'removePlayer',
    value: function removePlayer(player) {
      delete this.players[player.id];
    }

    // update(delta) {
    //   const normal_frame_time = 1000/60;
    //   const velocityScale = delta / normal_frame_time
    //   Object.values(this.players).forEach((player) => {
    //     player.update(velocityScale, this.world.width, this.world.height);
    //   })
    //   this.viewport.update(this.players[this.currentPlayerId].x, this.players[this.currentPlayerId].y);
    //   this.handleCollisions();
    // }

  }, {
    key: 'draw',
    value: function draw() {
      var _this = this;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.gameObjects().forEach(function (object) {
        object.draw(_this.context, _this.viewport.xView, _this.viewport.yView);
      });
    }

    // handleCollisions() {
    //   this.nectar.forEach((nectar) => {
    //     Object.values(this.players).forEach((player) => {
    //       const centerDist = Util.dist([player.x, player.y], [nectar.x, nectar.y]);
    //       if (centerDist < (player.radius + nectar.radius)) {
    //         nectar.relocate(this.world.width, this.world.height);
    //         for (let i = 0; i < nectar.radius / 3; i++) {
    //           player.grow();
    //         }
    //       }
    //     });
    //   });
    // }

  }, {
    key: 'start',
    value: function start() {
      this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    // gameLoop(time) {
    //   if (!this.lastTime) {
    //     this.lastTime = time;
    //   }
    //   const delta = -(this.lastTime - time);
    //   // this.socket.emit('player position', [this.players[window.playerId].x, this.players[window.playerId].y])
    //   this.update(delta);
    //   this.draw();
    //   this.lastTime = time;
    //   this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this))
    // }

    // calculateNewVector(startRadians, targetRadians) {
    //   if (startRadians < 0 && targetRadians < 0) {
    //     if (startRadians < targetRadians) {
    //       var [newX, newY] = Util.radiansToVector(startRadians + (Math.PI / 32));
    //     } else {
    //       var [newX, newY] = Util.radiansToVector(startRadians - (Math.PI / 32));
    //     }
    //   } else if (startRadians > 0 && targetRadians > 0) {
    //     if (startRadians < targetRadians) {
    //       var [newX, newY] = Util.radiansToVector(startRadians + (Math.PI / 32));
    //     } else {
    //       var [newX, newY] = Util.radiansToVector(startRadians - (Math.PI / 32));
    //     }
    //   } else if (startRadians < 0 && targetRadians > 0) {
    //     if (targetRadians - Util.degreesToRadians(180) > startRadians) {
    //       var [newX, newY] = Util.radiansToVector(startRadians - (Math.PI / 32));
    //     } else {
    //       var [newX, newY] = Util.radiansToVector(startRadians + (Math.PI / 32));
    //     }
    //   } else {
    //     if (targetRadians + Util.degreesToRadians(180) > startRadians) {
    //       var [newX, newY] = Util.radiansToVector(startRadians - (Math.PI / 32));
    //     } else {
    //       var [newX, newY] = Util.radiansToVector(startRadians + (Math.PI / 32));
    //     }
    //   }
    //   return [newX, newY];
    // }

  }, {
    key: 'handleInput',
    value: function handleInput() {
      var _this2 = this;

      var down = false;
      document.addEventListener("keydown", function (e) {

        if (e.key === " ") {
          e.preventDefault();
          if (down) {
            return;
          }
          _this2.socket.emit("boost", { id: _this2.currentPlayerId, status: "on" });
          down = true;
        }
      });

      document.addEventListener("keyup", function (e) {
        e.preventDefault();
        if (e.key === " ") {
          if (down) {
            down = false;
          }
          _this2.socket.emit("boost", { id: _this2.currentPlayerId, status: "off" });
        }
      });

      document.addEventListener('mousedown', function (e) {
        e.preventDefault();
        _this2.socket.emit("boost", { id: _this2.currentPlayerId, status: "on" });
      });

      document.addEventListener('mouseup', function (e) {
        e.preventDefault();
        _this2.socket.emit("boost", { id: _this2.currentPlayerId, status: "off" });
      });

      document.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (_this2.players[_this2.currentPlayerId]) {
          // top-left coordinates of the canvas on the document
          var canvasCoords = _this2.canvas.getBoundingClientRect();

          // the 'origin' -> coordinates of the player relative to the top-left corner of the canvas
          var oX = canvasCoords.left + (_this2.players[_this2.currentPlayerId].x - _this2.viewport.xView);
          var oY = canvasCoords.top + (_this2.players[_this2.currentPlayerId].y - _this2.viewport.yView);

          // coordinates of mouse position on document
          var mX = e.clientX;
          var mY = e.clientY;

          // difference between mouse coords and origin coords
          var dX = mX - oX;
          var dY = mY - oY;

          var startRadians = Util.vectorToRadians(_this2.players[_this2.currentPlayerId].velX, _this2.players[_this2.currentPlayerId].velY);
          var targetRadians = Util.vectorToRadians(dX, dY);

          var _Util$calculateNewVec = Util.calculateNewVector(startRadians, targetRadians),
              _Util$calculateNewVec2 = _slicedToArray(_Util$calculateNewVec, 2),
              newX = _Util$calculateNewVec2[0],
              newY = _Util$calculateNewVec2[1];

          _this2.socket.emit("player move", {
            id: _this2.currentPlayerId,
            pos: [newX, newY],
            num: _this2.inputs += 1,
            timestamp: Date.now()
          });
        }
        // this.players[this.currentPlayerId].changeXVel(newX);
        // this.players[this.currentPlayerId].changeYVel(newY);
      });
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

var _util = __webpack_require__(0);

var Util = _interopRequireWildcard(_util);

var _player = __webpack_require__(1);

var _player2 = _interopRequireDefault(_player);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(context, canvas, socket) {
    _classCallCheck(this, GameView);

    this.canvas = canvas;
    this.context = context;
    this.socket = socket;
    this.game = new _game2.default(this.context, this.canvas, this.socket);
    this.currentPlayerId = null;
    this.count = 0;
    this.moveNum = 0;
    this.listen();
  }

  _createClass(GameView, [{
    key: 'listen',
    value: function listen() {
      this.socket.on("onConnected", this.start.bind(this));
      this.socket.on("new player", this.registerNewPlayer.bind(this));
      this.socket.on("draw", this.draw.bind(this));
      this.socket.on("update", this.update.bind(this));
      this.socket.on("player disconnected", this.onPlayerDisconnected.bind(this));
      this.socket.on("players", this.onReceivePlayers.bind(this));
      // this.socket.on("remove player", this.removePlayer.bind(this))
    }
  }, {
    key: 'start',
    value: function start(data) {
      console.log('Connected successfully to the socket.io server. My server side ID is ' + data.id);

      this.currentPlayerId = data.id;
      this.game.addPlayer(data.id);
      this.game.setup();
      // this.game.handleInput();
    }
  }, {
    key: 'update',
    value: function update(data) {
      // console.log("data.players", Object.keys(data.players))
      // console.log("this.game.players",Object.keys(this.game.players))
      // Object.values(data.players).forEach((d) => {
      //   const player = this.game.players[d.id];
      //   if (player) {
      //     this.moveNum = d.moveNum;
      //     player.update(0, this.game.worldWidth, this.game.worldHeight)
      //   } else {
      //     const existingPlayer = new Player(d.id, d.pos[0], d.pos[1], d.zombies.length, this.game, d.color);
      //     existingPlayer.radius = d.radius;
      //     this.game.players[d.id] = existingPlayer;
      //   }
      // }, this);
      // Object.keys(this.game.players).forEach((id) => {
      //   if (!Object.keys(data.players).includes(id)) {
      //     delete this.game.players[id];
      //   }
      // })
      // this.game.nectar = data.nectar;
    }
  }, {
    key: 'onReceivePlayers',
    value: function onReceivePlayers(data) {
      console.log(data);
    }
  }, {
    key: 'registerNewPlayer',
    value: function registerNewPlayer(data) {
      var newPlayer = new _player2.default(data.id, data.x, data.y, 75, this.game, data.color);
      this.game.players[data.id] = newPlayer;
    }
  }, {
    key: 'onPlayerDisconnected',
    value: function onPlayerDisconnected(data) {
      console.log(data);
      delete this.game.players[data];
    }

    // removePlayer(data) {
    //   this.game.removePlayer(data.userId);
    //   delete this.game.players[data];
    //   console.log(Object.values(this.game.players).length)
    // }

  }, {
    key: 'updatePlayer',
    value: function updatePlayer(id, pos, speed, vel, radius, size, color, zombies, boosting) {
      var player = this.game.players[id];
      if (player) {
        // debugger
        player.x = pos[0];
        player.y = pos[1];
        // player.speedMultiplier = speed;
        player.boosting = boosting;
        player.radius = radius;
        player.size = size;
        player.zombies = zombies;
        player.changeXVel(vel[0]);
        player.changeYVel(vel[1]);
        // player.update(0, this.game.worldWidth, this.game.worldHeight)
      } else {
        var existingPlayer = new _player2.default(id, pos[0], pos[1], zombies.length, this.game, color);
        existingPlayer.radius = radius;
        this.game.players[id] = existingPlayer;
      }
    }
  }, {
    key: 'draw',
    value: function draw(data) {
      var _this = this;

      Object.values(data.players).forEach(function (player) {
        _this.updatePlayer(player.id, player.pos, player.speed, player.vel, player.radius, player.size, player.color, player.zombies, player.boosting);
      }, this);
      Object.keys(this.game.players).forEach(function (id) {
        if (!Object.keys(data.players).includes(id)) {
          delete _this.game.players[id];
        }
      });
      this.game.nectar = [];
      Object.values(data.nectar).forEach(function (nectar) {
        if (nectar) {
          // console.log(nectar.shadow)
          _this.game.addNectar(nectar.x, nectar.y, nectar.radius, nectar.color, nectar.shadow);
        }
      });
      if (this.game.players[this.currentPlayerId]) {
        this.game.viewport.update(this.game.players[this.currentPlayerId].x, this.game.players[this.currentPlayerId].y);
      }
      this.game.draw();
    }
  }]);

  return GameView;
}();

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById('game-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var context = canvas.getContext("2d");
  var socket = io();
  var game_view = new GameView(context, canvas, socket);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nectar = function () {
  function Nectar(x, y, radius, color, shadow) {
    _classCallCheck(this, Nectar);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color || Util.randomColor();
    this.shadow = shadow || 30;
  }

  _createClass(Nectar, [{
    key: 'rotate',
    value: function rotate() {}
  }, {
    key: 'relocate',
    value: function relocate(width, height) {
      this.x = Util.getRandomInt(1, width);
      this.y = Util.getRandomInt(1, height);
    }
  }, {
    key: 'draw',
    value: function draw(context, xView, yView) {
      context.save();
      context.beginPath();
      context.shadowColor = this.color;
      context.shadowBlur = this.shadow;
      // context.fillStyle = "#9850FF";
      context.fillStyle = this.color;
      // context.lineWidth = 1;
      context.arc(this.x + this.radius - xView, this.y + this.radius - yView, this.radius, 0, Math.PI * 2, false);
      context.fill();
      context.closePath();
      context.restore();
    }
  }]);

  return Nectar;
}();

exports.default = Nectar;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Viewport = function () {
  function Viewport(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {
    _classCallCheck(this, Viewport);

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

  _createClass(Viewport, [{
    key: "follow",
    value: function follow(gameObject, xDeadZone, yDeadZone) {
      this.followed = gameObject;
      this.xDeadZone = xDeadZone;
      this.yDeadZone = yDeadZone;
    }
  }, {
    key: "update",
    value: function update(x, y) {
      // console.log(this.followed.x)
      this.followed.x = x;
      this.followed.y = y;
      if (this.followed.x - this.xView + this.xDeadZone > this.wView) {
        this.xView = this.followed.x - (this.wView - this.xDeadZone);
      } else if (this.followed.x - this.xDeadZone < this.xView) {
        this.xView = this.followed.x - this.xDeadZone;
      }

      if (this.followed.y - this.yView + this.yDeadZone > this.hView) {
        this.yView = this.followed.y - (this.hView - this.yDeadZone);
      } else if (this.followed.y - this.yDeadZone < this.yView) {
        this.yView = this.followed.y - this.yDeadZone;
      }

      if (this.xView < 0) {
        this.xView = 0;
      }
      if (this.yView < 0) {
        this.yView = 0;
      }
      if (this.xView + this.wView > this.worldWidth) {
        this.xView = this.worldWidth - this.wView;
      }
      if (this.yView + this.hView > this.worldHeight) {
        this.yView = this.worldHeight - this.hView;
      }
      // }
    }
  }]);

  return Viewport;
}();

exports.default = Viewport;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
  function World(width, height) {
    _classCallCheck(this, World);

    this.width = width;
    this.height = height;
  }

  _createClass(World, [{
    key: "generate",
    value: function generate() {
      var ctx = document.createElement("canvas").getContext("2d");
      ctx.canvas.width = this.width;
      ctx.canvas.height = this.height;

      var rows = ~~(this.width / 88) + 1;
      var columns = ~~(this.height / 88) + 1;

      ctx.fillStyle = "#070B0F";
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.save();

      for (var x = 0; x < rows; x++) {
        ctx.beginPath();
        for (var y = 0; y < columns; y++) {
          ctx.rect(x * 88, y * 88, 84, 84);
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
  }, {
    key: "draw",
    value: function draw(context, xView, yView) {
      context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);
    }
  }]);

  return World;
}();

exports.default = World;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map