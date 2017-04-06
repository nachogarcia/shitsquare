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
    registerASiteAction = {run: () => {}}
    registerAReviewAction = {run: () => {}}
    siteRepository = {getClosest: () => {}}
    factory  = {createRegisterASiteAction: () => registerASiteAction, createRegisterAReviewAction: () => registerAReviewAction, createSiteRepository: () => siteRepository};

    sinon.spy(siteRepository, 'getClosest');
    sinon.spy(registerASiteAction, 'run');
    sinon.spy(registerAReviewAction, 'run');

    dispatcher = new Dispatcher(factory);

    siteData = {name: "a site", coordinates: {x: 9, y:12}}
    reviewData = {author: "someone", score: 3, comment: "a comment" }
    currentPosition = {x: 0, y: 0}

    response = {send: () => {}}
  });

  it('gets the closest sites', () => {
    let request = {body: {id: 1, params: currentPosition, method:'getClosest'}}

    dispatcher.run(request,response)

    expect(siteRepository.getClosest).to.have.been.calledWith(currentPosition);
  });
  it('registers a site', () => {
    let request = {body: {id: 1, params: siteData, method:'registerASite'}}

    dispatcher.run(request,response)

    expect(registerASiteAction.run).to.have.been.calledWith(siteData);
  });
  it('registers a review', () => {
    let siteId = 3;
    let request = {body: {id: 1, params: {siteId, reviewData}, method:'registerAReview'}}

    dispatcher.run(request,response)

    expect(registerAReviewAction.run).to.have.been.calledWith(reviewData, siteId);
  });
});
