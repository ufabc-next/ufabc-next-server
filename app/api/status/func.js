module.exports = async () => {
  return {
    status: 'alive',
    now: Date.now(),
    hash: Math.random()
  }
}
