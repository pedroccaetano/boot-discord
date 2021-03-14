const cron = require('cron');

const config = require('../config/config.json');
const servers = require('../commands/clients.json');

const { response, fetch } = require('../utils');

class JOB {
  constructor(client) {
    this.client = client;
  }

  async callAllServers() {
    const channel = this.client.channels.cache.get(config.channels.servers);
    let messageClients = '';
    let messageStatus = '';

    if (channel) {
      for (const server of servers) {
        try {
          const responseAPI = await fetch(`${server.integrador}/parametros`, {}, 5000);

          if (responseAPI.status === 200) {
            messageClients += `${server.nome}\n`;
            messageStatus += '✅\n';
          } else {
            messageClients += `${server.nome}\n`;
            messageStatus += '❌\n';
          }
        } catch (error) {
          messageClients += `${server.nome}\n`;
          messageStatus += '❌\n';
        }
      }

      const embed = response.info(messageClients, messageStatus);

      channel.send(embed);
    }
  }

  async testServers() {
    return new cron.CronJob('00 1 08-18 * * 0-6', async () => this.callAllServers());
  }
}

module.exports = JOB;
