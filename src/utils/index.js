const logger = require('./looger');
const fetch = require('./fetch');
const response = require('./response');

const servers = require('../commands/clients.json');
const { commands } = require('../commands/commands.json');

function searchAllCommands() {
  const commandsAvailable = [];

  commands.map((command) => commandsAvailable.push(command.name.replace('!', '')));
  servers.map((server) => commandsAvailable.push(...server.commands));

  return commandsAvailable;
}

module.exports = {
  logger,
  response,
  fetch,
  searchAllCommands,
};
