var chai = require('chai')
var sinonChai = require('sinon-chai')

global.sinon = require('sinon')
chai.use(sinonChai)
chai.config.includeStack = true

global.expect = chai.expect
