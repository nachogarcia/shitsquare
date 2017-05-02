class JsonRPCParser {

  static parse(response, id) {
    let parsedResponse = {};
    parsedResponse.body = {};
    parsedResponse.body.jsonrpc = "2.0";
    parsedResponse.body.id = id;

    if (response instanceof Error) parsedResponse.body.error = response;
    else parsedResponse.body.result = response;

    return parsedResponse;
  };

  static unparse(request) {
    let method = request.body.method;
    let id = request.body.id;
    let params = request.body.params;

    if ( params == undefined ) params = []
    params = Object.keys(params).map(function(key) {
      return params[key];
    });

    return {id, method, params};
  };
}

module.exports = JsonRPCParser
