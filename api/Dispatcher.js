class Dispatcher {
  constructor () {
    this.methods = {};
  }

  addMethod (name, method) {
    this.methods[name] = method;
  }

  run (method, ...params) {
    if (!this.methods[method]) throw new Error('Non Existing Method')
    return this.methods[method].run(...params);
  }
}

module.exports = Dispatcher
