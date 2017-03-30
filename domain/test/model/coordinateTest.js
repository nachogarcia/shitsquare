var coordinates = require('../../src/model/Coordinate.js');


describe('A Coordinate', () => {
  it('can be compared', () => {
    let currentCoord = new coordinates.Coordinate(0,0);
    let closestCoord = new coordinates.Coordinate(-1,1);
    let farthestCoord = new coordinates.Coordinate(100,100);

    let aIsCloser = coordinates.Coordinate.compare(currentCoord, farthestCoord, closestCoord);
    let bIsCloser = coordinates.Coordinate.compare(currentCoord, closestCoord, farthestCoord);
    let areEqual = coordinates.Coordinate.compare(currentCoord, closestCoord, closestCoord);

    expect(aIsCloser).to.be.above(0);
    expect(bIsCloser).to.be.below(0);
    expect(areEqual).to.eq(0);
  });
});
