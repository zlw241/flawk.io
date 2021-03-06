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
      var _radiansToVector = radiansToVector(startRadians + Math.PI / 32),
          _radiansToVector2 = _slicedToArray(_radiansToVector, 2),
          newX = _radiansToVector2[0],
          newY = _radiansToVector2[1];
    } else {
      var _radiansToVector3 = radiansToVector(startRadians - Math.PI / 32),
          _radiansToVector4 = _slicedToArray(_radiansToVector3, 2),
          newX = _radiansToVector4[0],
          newY = _radiansToVector4[1];
    }
  } else if (startRadians > 0 && targetRadians > 0) {
    if (startRadians < targetRadians) {
      var _radiansToVector5 = radiansToVector(startRadians + Math.PI / 32),
          _radiansToVector6 = _slicedToArray(_radiansToVector5, 2),
          newX = _radiansToVector6[0],
          newY = _radiansToVector6[1];
    } else {
      var _radiansToVector7 = radiansToVector(startRadians - Math.PI / 32),
          _radiansToVector8 = _slicedToArray(_radiansToVector7, 2),
          newX = _radiansToVector8[0],
          newY = _radiansToVector8[1];
    }
  } else if (startRadians < 0 && targetRadians > 0) {
    if (targetRadians - degreesToRadians(180) > startRadians) {
      var _radiansToVector9 = radiansToVector(startRadians - Math.PI / 32),
          _radiansToVector10 = _slicedToArray(_radiansToVector9, 2),
          newX = _radiansToVector10[0],
          newY = _radiansToVector10[1];
    } else {
      var _radiansToVector11 = radiansToVector(startRadians + Math.PI / 32),
          _radiansToVector12 = _slicedToArray(_radiansToVector11, 2),
          newX = _radiansToVector12[0],
          newY = _radiansToVector12[1];
    }
  } else {
    if (targetRadians + degreesToRadians(180) > startRadians) {
      var _radiansToVector13 = radiansToVector(startRadians - Math.PI / 32),
          _radiansToVector14 = _slicedToArray(_radiansToVector13, 2),
          newX = _radiansToVector14[0],
          newY = _radiansToVector14[1];
    } else {
      var _radiansToVector15 = radiansToVector(startRadians + Math.PI / 32),
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

    this.speedMultiplier = Player.NORMAL_SPEED;

    // this.width = 50;
    // this.height = 50;

    this.boosting = false;
    this.count = 0;

    this.radius = 15;
    this.zombies = [];
    for (var i = 0; i < this.size; i++) {
      this.zombies.push([this.x, this.y]);
    }

    this.inputs = [];
  }

  _createClass(Player, [{
    key: 'drawSegment',
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
    key: 'grow',
    value: function grow() {
      var lastZombie = this.zombies[this.size - 1];
      this.zombies.push(lastZombie);
      this.size += 1;
      this.radius += 0.02;
    }
  }, {
    key: 'shrink',
    value: function shrink() {
      if (this.size > 20) {
        if (this.count === 20) {
          var nectarCoords = this.zombies.pop();
          this.zombies.pop();
          // this.game.addNectar(nectarCoords[0], nectarCoords[1], 5, this.color);
          this.size -= 2;
          this.radius -= 0.02;
          this.count = 0;
        }
        this.count += 1;
      }
      // console.log(this.zombies.length);
    }
  }, {
    key: 'draw',
    value: function draw(context, xView, yView) {
      for (var i = this.zombies.length - 1; i >= 0; i--) {
        if (i % 3 === 0) {
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
  }, {
    key: 'update',
    value: function update(velocityScale, worldWidth, worldHeight) {
      if (this.size > this.zombies.length) {
        for (var i = 0; i < this.size - this.zombies.length; i++) {
          this.zombies.push([]);
        }
      }
      var nextX = this.x;
      var nextY = this.y;
      for (var _i = 0; _i < this.zombies.length; _i++) {
        var zX = nextX;
        var zY = nextY;
        nextX = this.zombies[_i][0];
        nextY = this.zombies[_i][1];
        this.zombies[_i] = [zX, zY];
      }

      if (this.size <= 20) {
        this.boosting = false;
        this.speedMultiplier = Player.NORMAL_SPEED;
      }

      this.x += this.velX * velocityScale * this.speedMultiplier;
      this.y += this.velY * velocityScale * this.speedMultiplier;
      // this.x += this.velX * this.speedMultiplier; // remove velocity scale from physics update loop
      // this.y += this.velY * this.speedMultiplier; // remove velocity scale from physics update loop

      if (this.x - this.radius < 0) {
        // this.die();
        this.x = this.radius;
        // this.game.playerDie(this);
      }
      if (this.y - this.radius < 0) {
        // this.die();
        this.y = this.radius;
        // this.game.playerDie(this);
      }
      if (this.x + this.radius > worldWidth) {
        // this.die();
        this.x = worldWidth - this.radius;
        // this.game.playerDie(this);
      }
      if (this.y + this.radius > worldHeight) {
        // this.die();
        this.y = worldHeight - this.radius;
        // this.game.playerDie(this);
      }

      if (this.boosting) {
        this.shrink();
      }
    }
  }, {
    key: 'boost',
    value: function boost() {
      this.speedMultiplier = Player.BOOSTED_SPEED;
      this.boosting = true;
    }
  }, {
    key: 'unboost',
    value: function unboost() {
      this.speedMultiplier = Player.NORMAL_SPEED;
      this.boosting = false;
    }
  }, {
    key: 'changeXVel',
    value: function changeXVel(x) {
      this.velX = x;
    }
  }, {
    key: 'changeYVel',
    value: function changeYVel(y) {
      this.velY = y;
    }
  }, {
    key: 'changeBoost',
    value: function changeBoost(speed) {
      this.speedMultiplier = speed;
    }
  }]);

  return Player;
}();

Player.NORMAL_SPEED = 3;
Player.BOOSTED_SPEED = 5;

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
    this.nectar = {};
    this.players = {};
    this.nectarCount = 100;
    this.currentPlayerId = null;
    this.inputs = 0;
    this.addPlayer = this.addPlayer.bind(this);
  }

  _createClass(Game, [{
    key: 'setup',
    value: function setup() {
      this.handleInput();
      this.world.generate();
      this.viewport.follow(this.players[this.currentPlayerId], this.canvas.width / 2, this.canvas.height / 2);
      this.start(); // run client physics loop
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
        this.nectar[object.id] = object;
        // this.nectar.push(object);
      } else {
        throw "unknown type of object";
      }
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(id) {
      var player = new _player2.default(id, 50, 50, 20, this);
      this.add(player);
      this.setCurrentPlayerId(id);
    }
  }, {
    key: 'gameObjects',
    value: function gameObjects() {
      return [this.world].concat(Object.values(this.nectar)).concat(Object.values(this.players));
    }
  }, {
    key: 'addNectar',
    value: function addNectar(id, x, y, r, c) {
      var xPos = x || Util.getRandomInt(1, this.world.width);
      var yPos = y || Util.getRandomInt(1, this.world.width);
      var radius = r || Util.getRandomInt(3, 8);
      var color = c || Util.randomColor();
      var nectar = new _nectar2.default(id, xPos, yPos, radius, c);
      this.add(nectar);
    }
  }, {
    key: 'removePlayer',
    value: function removePlayer(player) {
      delete this.players[player.id];
    }
  }, {
    key: 'update',
    value: function update(delta) {
      var _this = this;

      var velocityScale = delta / Game.PHYSICS_FRAME_RATE;
      Object.values(this.players).forEach(function (player) {
        player.update(velocityScale, _this.world.width, _this.world.height);
      });

      if (this.players[this.currentPlayerId]) {
        this.viewport.update(this.players[this.currentPlayerId].x, this.players[this.currentPlayerId].y);
      }
      // this.handleCollisions();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.gameObjects().forEach(function (object) {
        object.draw(_this2.context, _this2.viewport.xView, _this2.viewport.yView);
      });
    }
  }, {
    key: 'start',
    value: function start() {
      this.lastTime = Date.now();
      this.requestId = window.setInterval(this.physicsLoop.bind(this), Game.PHYSICS_FRAME_RATE);
    }
  }, {
    key: 'physicsLoop',
    value: function physicsLoop() {
      var time = Date.now();
      var delta = time - this.lastTime;

      this.update(delta);
      this.draw();
      this.lastTime = time;
    }
  }, {
    key: 'updatePlayerVelocity',
    value: function updatePlayerVelocity(targetRadians) {
      var player = this.players[this.currentPlayerId];
      if (player) {

        // send client input to server
        this.socket.emit("player move", {
          id: this.currentPlayerId,
          pos: targetRadians,
          num: this.inputs += 1,
          timestamp: Date.now()
        });

        // radians corresponding to players current velocity
        var startRadians = Util.vectorToRadians(player.velX, player.velY);
        // player current velocity moved in the direction of the target velocity by PI/32 radians

        var _Util$calculateNewVec = Util.calculateNewVector(startRadians, targetRadians),
            _Util$calculateNewVec2 = _slicedToArray(_Util$calculateNewVec, 2),
            newX = _Util$calculateNewVec2[0],
            newY = _Util$calculateNewVec2[1];

        player.inputs.push({ seq: this.inputs, vel: [newX, newY] });

        if (player.inputs.length > 120) {
          player.inputs = player.inputs.slice(0, 1);
        }
        player.changeXVel(newX);
        player.changeYVel(newY);
      }
    }
  }, {
    key: 'handleInput',
    value: function handleInput() {
      var _this3 = this;

      var down = false;
      document.addEventListener("keydown", function (e) {

        if (e.key === " ") {
          e.preventDefault();
          if (down) {
            return;
          }
          _this3.socket.emit("boost", { id: _this3.currentPlayerId, status: "on" });
          _this3.players[_this3.currentPlayerId].boost();
          down = true;
        }
      });

      document.addEventListener("keyup", function (e) {
        e.preventDefault();
        if (e.key === " ") {
          if (down) {
            down = false;
          }
          _this3.socket.emit("boost", { id: _this3.currentPlayerId, status: "off" });
          _this3.players[_this3.currentPlayerId].unboost();
        }
      });

      document.addEventListener('mousedown', function (e) {
        e.preventDefault();
        _this3.socket.emit("boost", { id: _this3.currentPlayerId, status: "on" });
        _this3.players[_this3.currentPlayerId].boost();
      });

      document.addEventListener('mouseup', function (e) {
        e.preventDefault();
        _this3.socket.emit("boost", { id: _this3.currentPlayerId, status: "off" });
        _this3.players[_this3.currentPlayerId].unboost();
      });

      document.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (_this3.players[_this3.currentPlayerId]) {
          // top-left coordinates of the canvas on the document
          var canvasCoords = _this3.canvas.getBoundingClientRect();

          // the 'origin' -> coordinates of the player relative to the top-left corner of the canvas
          var oX = canvasCoords.left + (_this3.players[_this3.currentPlayerId].x - _this3.viewport.xView);
          var oY = canvasCoords.top + (_this3.players[_this3.currentPlayerId].y - _this3.viewport.yView);

          // console.log(oX, oY)
          // coordinates of mouse position on document
          var mX = e.clientX;
          var mY = e.clientY;

          // difference between mouse coords and origin coords
          var dX = mX - oX;
          var dY = mY - oY;

          // radians that correspond to vector from origin to mouse coords
          var targetRadians = Util.vectorToRadians(dX, dY);
          _this3.updatePlayerVelocity(targetRadians);
        }
      });
    }
  }]);

  return Game;
}();

Game.WORLD_WIDTH = 3000;
Game.WORLD_HEIGHT = 3000;
Game.PHYSICS_FRAME_RATE = 1000 / 66.666;

exports.default = Game;

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
      this.socket.on("on connected", this.start.bind(this));
      this.socket.on("update game", this.draw.bind(this));
      this.socket.on("player disconnected", this.onPlayerDisconnected.bind(this));
      this.socket.on("nectar update", this.onReceiveNectar.bind(this));
    }
  }, {
    key: 'start',
    value: function start(data) {
      console.log('Connected successfully to the socket.io server. My server side ID is ' + data.id);
      this.currentPlayerId = data.id;
      this.game.addPlayer(data.id);
      this.game.setup();
    }
  }, {
    key: 'onPlayerDisconnected',
    value: function onPlayerDisconnected(data) {
      console.log(data);
      delete this.game.players[data];
    }
  }, {
    key: 'onReceiveNectar',
    value: function onReceiveNectar(data) {
      var _this = this;

      Object.keys(this.game.nectar).forEach(function (id) {
        if (!Object.keys(data).includes(id)) {
          delete _this.game.nectar[id];
        }
      });
      Object.values(data).forEach(function (nectar) {
        if (nectar) {
          _this.game.addNectar(nectar.id, nectar.x, nectar.y, nectar.radius, nectar.color, nectar.shadow);
        }
      });
    }
  }, {
    key: 'updatePlayer',
    value: function updatePlayer(id, pos, speed, vel, radius, size, color, zombies, boosting) {
      var player = this.game.players[id];
      if (player) {
        if (Util.dist([player.x, player.y], pos) > 20) {
          console.log('popped to position');
          console.log(Util.dist([player.x, player.y], pos));
          player.x = pos[0];
          player.y = pos[1];
        } else if (Util.dist([player.x, player.y], pos) > 2) {
          player.x = (9 * player.x + pos[0]) / 10;
          player.y = (9 * player.y + pos[1]) / 10;
        }

        player.speedMultiplier = speed;
        player.color = color;
        player.boosting = boosting;
        player.radius = radius;
        player.size = size;
        player.zombies = zombies;

        if (player.id !== this.currentPlayerId) {
          player.changeXVel(vel[0]); // not sure if its a good or bad thing to do this here
          player.changeYVel(vel[1]);
        }

        player.update(0, this.game.worldWidth, this.game.worldHeight);
      } else {
        var existingPlayer = new _player2.default(id, pos[0], pos[1], zombies.length, this.game, color);
        existingPlayer.radius = radius;
        this.game.players[id] = existingPlayer;
      }
    }
  }, {
    key: 'draw',
    value: function draw(data) {
      var _this2 = this;

      console.log(JSON.stringify(data).length);

      Object.values(data.players).forEach(function (player) {
        _this2.updatePlayer(player.id, player.pos, player.speed, player.vel, player.radius, player.size, player.color, player.zombies, player.boosting);
      }, this);
      Object.keys(this.game.players).forEach(function (id) {
        if (!Object.keys(data.players).includes(id)) {
          delete _this2.game.players[id];
        }
      }, this);
      data.nectar.deleted.forEach(function (id) {
        delete _this2.game.nectar[id];
      });
      data.nectar.moved.forEach(function (nectar) {
        var n = _this2.game.nectar[nectar[0]];
        if (n) {
          n.x = nectar[1];
          n.y = nectar[2];
        }
      });
      data.nectar.added.forEach(function (nectar) {
        _this2.game.addNectar(nectar.id, nectar.x, nectar.y, nectar.radius, nectar.color);
      });
      // Object.keys(this.game.nectar).forEach((id) => {
      //   if (!Object.keys(data.nectar).includes(id)) {
      //     delete this.game.nectar[id];
      //   }
      // });
      // Object.values(data.nectar).forEach((nectar) => {
      //   if (nectar) {
      //     this.game.addNectar(nectar.id, nectar.x, nectar.y, nectar.radius, nectar.color, nectar.shadow);
      //   }
      // });

      // *** client side prediction attempt ***
      // if (this.game.players[this.currentPlayerId]) {
      //   const currentPlayer = this.game.players[this.currentPlayerId];
      //   const reapplySteps = [];
      //   currentPlayer.inputs.forEach((step) => {
      //     if (step.seq > data.players[this.currentPlayerId].lastInput) {
      //
      //       reapplySteps.push(step);
      //     }
      //
      //
      //   });
      //   for (let i = 0; i < reapplySteps.length; i++) {
      //     const s = reapplySteps[i];
      //
      //     currentPlayer.changeXVel(s.vel[0]);
      //     currentPlayer.changeYVel(s.vel[1]);
      //     currentPlayer.update(1, this.game.worldWidth, this.game.worldHeight);
      //   }
      //   currentPlayer.inputs = reapplySteps;
      //   this.game.viewport.update(currentPlayer.x, currentPlayer.y);
      //
      // }
      // ***
      // this.game.draw();
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
  function Nectar(id, x, y, radius, color, shadow) {
    _classCallCheck(this, Nectar);

    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color || Util.randomColor();
    this.shadow = shadow || 30;
  }

  _createClass(Nectar, [{
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
    key: 'follow',
    value: function follow(gameObject, xDeadZone, yDeadZone) {
      this.followed = gameObject;
      this.xDeadZone = xDeadZone;
      this.yDeadZone = yDeadZone;
    }
  }, {
    key: 'update',
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