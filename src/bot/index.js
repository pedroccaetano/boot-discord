const Discord = require('discord.js');

const { actions } = require('./actions');
const { logger } = require('../utils');

const client = new Discord.Client();

client.on('ready', () => logger.info('Server initialized!'));
client.on('message', async (message) => actions(client, message));

module.exports = { client };
