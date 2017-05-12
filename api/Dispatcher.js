class Dispatcher {
  constructor () {
    this.methods = {};
  }

  addMethod (name, method) {
    this.methods[name] = method;
  }

  run (method, ...params) {
    if (!this.methods[method]) return Promise.reject(new Error('Non Existing Method'))
    return this.methods[method](...params);
  }
}

module.exports = Dispatcher
