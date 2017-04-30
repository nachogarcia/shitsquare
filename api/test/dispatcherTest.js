var Dispatcher = require('../Dispatcher.js')

describe('The dispatcher', () => {
  let dispatcher;
  let method;

  beforeEach(() => {
    method = { run: () => Promise.resolve({}) }

    sinon.spy(method, 'run');

    dispatcher = new Dispatcher();
    dispatcher.addMethod('method', method);
  });

  describe('when calling a non existing method', () => {
    it('Calls the method run of the introduced method', () => {
        return dispatcher.run('NonExistingMethod').then().catch( error =>
          expect(error).to.deep.eq('Non Existing Method')
        );
    });
  });

  describe('when calling an existing method, calls the method run of', () => {
    it('a method without parameters', () => {
      dispatcher.run('method')

      expect(method.run).to.have.been.calledWith();
    });

    it('a method with one parameter', () => {
      let parameter = "a";
      dispatcher.run('method', parameter)

      expect(method.run).to.have.been.calledWith(parameter);
    });

    it('a method with multiple parameters', () => {
      let parameter1 = "a";
      let parameter2 = "b";
      dispatcher.run('method', parameter1, parameter2)

      expect(method.run).to.have.been.calledWith(parameter1, parameter2);
    });
  });
});
