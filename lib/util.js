
module.exports = {
  dist: (pos1, pos2) => {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  randomPos: (width, height) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    return [x, y];
  },

  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomColor: () => {
    const colors = ['#9850FF', '#FE5F5C', '#FF5EAE', '#69FE60', '#5EFFE5', '#FEFB5B', '#695DFE', '#EDA14B'];
    return colors[Math.floor(Math.random() * colors.length)]
  },

  slopeToDegrees: (x, y) => {
    return Math.atan2(y, x)
  },

  vectorToRadians: (x, y) => {
    return Math.atan2(y, x);
  },

  radiansToVector: (radians) => {
    const y = Math.sin(radians);
    const x = Math.cos(radians);
    return [x, y];
  },

  radiansToDegrees: (radians) => {
    return radians / (Math.PI / 180);
  },

  degreesToRadians: (degrees) => {
    return degrees * (Math.PI / 180);
  },

  calculateNewVector: (startRadians, targetRadians) => {
    if (startRadians < 0 && targetRadians < 0) {
      if (startRadians < targetRadians) {
        var [newX, newY] = this.radiansToVector(startRadians + (Math.PI / 32));
      } else {
        var [newX, newY] = this.radiansToVector(startRadians - (Math.PI / 32));
      }
    } else if (startRadians > 0 && targetRadians > 0) {
      if (startRadians < targetRadians) {
        var [newX, newY] = this.radiansToVector(startRadians + (Math.PI / 32));
      } else {
        var [newX, newY] = this.radiansToVector(startRadians - (Math.PI / 32));
      }
    } else if (startRadians < 0 && targetRadians > 0) {
      if (targetRadians - this.degreesToRadians(180) > startRadians) {
        var [newX, newY] = this.radiansToVector(startRadians - (Math.PI / 32));
      } else {
        var [newX, newY] = this.radiansToVector(startRadians + (Math.PI / 32));
      }
    } else {
      if (targetRadians + this.degreesToRadians(180) > startRadians) {
        var [newX, newY] = this.radiansToVector(startRadians - (Math.PI / 32));
      } else {
        var [newX, newY] = this.radiansToVector(startRadians + (Math.PI / 32));
      }
    }
    return [newX, newY];
  }
}

// export function dist(pos1, pos2) {
//   return Math.sqrt(
//     Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
//   );
// }
//
// export function randomPos(width, height) {
//   const x = Math.random() * width;
//   const y = Math.random() * height;
//   return [x, y];
// }
//
// export function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// export function randomColor() {
//   const colors = ['#9850FF', '#FE5F5C', '#FF5EAE', '#69FE60', '#5EFFE5', '#FEFB5B', '#695DFE', '#EDA14B'];
//   return colors[Math.floor(Math.random() * colors.length)]
// }
//
// export function slopeToDegrees(x, y) {
//   return Math.atan2(y, x)
// };
//
// export function vectorToRadians(x, y) {
//   return Math.atan2(y, x);
// }
//
// export function radiansToVector(radians) {
//   const y = Math.sin(radians);
//   const x = Math.cos(radians);
//   return [x, y];
// };
//
// export function radiansToDegrees(radians) {
//   return radians / (Math.PI / 180);
// }
//
// export function degreesToRadians(degrees) {
//   return degrees * (Math.PI / 180);
// }
