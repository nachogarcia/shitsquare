var JsonRPCParser = require('../JsonRPCParser.js')

describe('The parser', () => {
  let jsonRPCParser;

  beforeEach( () => {
    jsonRPCParser = new JsonRPCParser();
  });

  describe('parses correctly', () => {
    let expectedResponse;
    let id;

    beforeEach( () => {
      id = 1;

      expectedResponse = {};
      expectedResponse.body = {};
      expectedResponse.body.jsonrpc = "2.0"
      expectedResponse.body.id = id;
    });

    it('an error', () => {
      let error = new Error();
      expectedResponse.body.error = error.message;

      let parsedResponse = jsonRPCParser.parse(error, id);

      expect(parsedResponse).to.deep.eq(expectedResponse);
    });

    it('a result', () => {
      let result = { a: "1", b: "c" };
      expectedResponse.body.result = result;

      let parsedResponse = jsonRPCParser.parse(result, id);

      expect(parsedResponse).to.deep.eq(expectedResponse);
    });
  });


  describe('unparses correctly', () => {
    let request;
    let method;
    let expectedResult;

    beforeEach( () => {
      method = 'aMethod';

      request = {};
      request.body = {};
      request.body.method = method;

      expectedResult = {};
      expectedResult.method = method;
    });

    it('A notification', () => {
      expectedResult.id = undefined;
      expectedResult.params = [];

      let result = jsonRPCParser.unparse(request);

      expect(result).to.deep.eq(expectedResult)
    });

    describe('a call', () => {
      let id;

      beforeEach( () => {
        id = 1;
        request.body.id = id;
        expectedResult.id = id;
      });

      it('with named parameters', () => {
        let param1 = { a: 1, b: "c" }
        let param2 = "b"
        request.body.params = {}
        request.body.params.param1 = param1;
        request.body.params.param2 = param2;
        expectedResult.params = [ param1, param2 ]

        let result = jsonRPCParser.unparse(request);

        expect(result).to.deep.eq(expectedResult)
      });

      it('with positional parameters', () => {
        let param1 = 1
        let param2 = "c"
        let params = [ param1, param2 ]
        request.body.params = params;
        expectedResult.params = params;

        let result = jsonRPCParser.unparse(request);

        expect(result).to.deep.eq(expectedResult)
      });
    });
  });
});
