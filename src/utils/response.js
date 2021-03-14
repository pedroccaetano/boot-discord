const Discord = require('discord.js');
const logger = require('./looger');

const { logo } = require('../config/config.json');

function success({ servidor, site, integrador }) {
  return new Discord.MessageEmbed()
    .setColor('#3ADB7D')
    .setTitle(`Teste no servidor ${servidor}`)
    .addFields(
      {
        name: 'Status',
        value: 'O servidor esta funcionando corretamente ✅',
      },
      {
        name: 'Site',
        value: site,
      },
      {
        name: 'Integrador',
        value: integrador,
      },
    )
    .setFooter('Santri', logo)
    .setTimestamp();
}

function error({ servidor, site, integrador }) {
  logger.error(`Erro no servidor ${servidor}`);

  return new Discord.MessageEmbed()
    .setColor('#B30D15')
    .setTitle(`Teste no servidor ${servidor}`)
    .addFields(
      {
        name: 'Status',
        value: 'O servidor não esta funcionando corretamente ❌ ',
      },
      {
        name: 'Site',
        value: site,
      },
      {
        name: 'Integrador',
        value: integrador,
      },
    )
    .setFooter('Santri', logo)
    .setTimestamp();
}

function info(clients, status) {
  return new Discord.MessageEmbed()
    .setColor('#0799FB')
    .setTitle('Testes em todos servidores')
    .addFields(
      { name: 'CLIENTE', value: clients, inline: true },
      { name: 'STATUS', value: status, inline: true },
    )
    .setFooter('Santri', logo)
    .setTimestamp();
}

module.exports = {
  success,
  error,
  info,
};
