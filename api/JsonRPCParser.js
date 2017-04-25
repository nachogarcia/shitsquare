class JsonRPCParser {

  static parse(result, id) {
    return {
      body: {
        jsonrpc: "2.0",
        result,
        id
      }
    };
  };

  static unparse(request) {
    let method = request.body.method
    let params = request.body.params
    let id = request.body.id

    return {method, params, id};
  };
}

module.exports = JsonRPCParser
