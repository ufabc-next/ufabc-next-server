module.exports = ms => {
  if (ms < 1000)
    return ms + ' ms'

  ms = Math.round(ms / 1000)
  if (ms < 60) 
    return ms + ' s'

  ms = Math.round(ms / 60)
  return ms + ' min'
}