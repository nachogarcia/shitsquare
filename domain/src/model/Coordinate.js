class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static compare(coordOrigin, coordA, coordB) {
    return this.distance(coordOrigin, coordA) - this.distance(coordOrigin, coordB);
  }

  static distance(coordOrigin, coord) {
    return Math.pow(coordOrigin.x - coord.x,2) + Math.pow(coordOrigin.y - coord.y,2);
  }
}

module.exports = Coordinate
