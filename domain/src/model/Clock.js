class Clock{
  now() {
    let date = new Date();
    return date.toISOString();
  }
}

module.exports = Clock
