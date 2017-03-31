var Coordinate = require('../../src/model/Coordinate.js');


describe('A Coordinate', () => {
  it('can be compared', () => {
    let currentCoord = new Coordinate(0,0);
    let closestCoord = new Coordinate(-1,1);
    let farthestCoord = new Coordinate(100,100);

    let aIsCloser = Coordinate.compare(currentCoord, farthestCoord, closestCoord);
    let bIsCloser = Coordinate.compare(currentCoord, closestCoord, farthestCoord);
    let areEqual = Coordinate.compare(currentCoord, closestCoord, closestCoord);

    expect(aIsCloser).to.be.above(0);
    expect(bIsCloser).to.be.below(0);
    expect(areEqual).to.eq(0);
  });
});
