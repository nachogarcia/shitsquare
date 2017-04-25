var JsonRPCParser = require('../JsonRPCParser.js')

describe('The parser', () => {
  it('parses correctly', () => {
    let id = 1;
    let result = { a: "1", b: "c" };

    let response = JsonRPCParser.parse(result, id);

    expect(response).to.deep.eq({
      body: {
        "jsonrpc": "2.0",
        "id": id,
        "result": result
      }
    })
  });

  it('unparses correctly', () => {
    let id = 1;
    let params = { a: "1", b: "c" };
    let method = 'aMethod';

    let request = {body: {id, params, method}};

    let result = JsonRPCParser.unparse(request);

    expect(result).to.deep.eq({id, params, method})
  });
});
