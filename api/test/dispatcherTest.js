var Dispatcher = require('../Dispatcher.js')

describe('The dispatcher', () => {
  let registerASiteAction;
  let registerAReviewAction;
  let siteRepository;
  let factory;
  let dispatcher;
  let siteData;
  let reviewData;
  let currentPosition;
  let response;

  before(() => {
    registerASiteAction = { run: () => Promise.resolve({}) }
    registerAReviewAction = { run: () => Promise.resolve({}) }
    getClosestSitesAction = { run: () => Promise.resolve({}) }

    factory  = {
      createRegisterASiteAction: () => registerASiteAction,
      createRegisterAReviewAction: () => registerAReviewAction,
      createGetClosestSitesAction: () => getClosestSitesAction,
    };

    sinon.spy(registerASiteAction, 'run');
    sinon.spy(registerAReviewAction, 'run');
    sinon.spy(getClosestSitesAction, 'run');

    dispatcher = new Dispatcher(factory);

    siteData = {name: "a site", coordinates: {x: 9, y:12}}
    reviewData = {author: "someone", score: 3, comment: "a comment" }
    currentPosition = {x: 0, y: 0}
  });

  it('gets the closest sites', () => {
    let request = {body: {id: 1, params: currentPosition, method:'getClosest'}}

    dispatcher.run(request)

    expect(getClosestSitesAction.run).to.have.been.calledWith(currentPosition);
  });

  it('registers a site', () => {
    let request = {body: {id: 1, params: siteData, method:'registerASite'}}

    dispatcher.run(request)

    expect(registerASiteAction.run).to.have.been.calledWith(siteData);
  });

  it('registers a review', () => {
    let siteId = 3;
    let request = {body: {id: 1, params: {siteId, reviewData}, method:'registerAReview'}}

    dispatcher.run(request)

    expect(registerAReviewAction.run).to.have.been.calledWith(reviewData, siteId);
  });
});
