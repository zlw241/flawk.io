


export function dist(pos1, pos2) {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
}

export function randomPos(width, height) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return [x, y];
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomColor() {
  const colors = ['#9850FF', '#FE5F5C', '#FF5EAE', '#69FE60', '#5EFFE5', '#FEFB5B', '#695DFE', '#EDA14B'];
  return colors[Math.floor(Math.random() * colors.length)]
}
