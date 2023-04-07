module.exports = async () => {
  return {
    status: 'alive',
    now: Date.now(),
    hash: require('child_process')
      .execSync('git rev-parse HEAD')
      .toString().trim()
  }
}
