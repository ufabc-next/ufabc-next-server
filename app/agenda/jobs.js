const DEFAULT_OPTIONS = {
  timezone: 'America/Sao_Paulo',
}

module.exports = function (agenda) {
  agenda.on('ready', async function() {
    agenda.every('2 minutes', 'syncMatriculas', {}, DEFAULT_OPTIONS)
    agenda.start()
  })
}
