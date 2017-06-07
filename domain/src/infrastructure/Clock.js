class Clock {
  now () {
    return new Date().toUTCString()
  }
}

module.exports = Clock
