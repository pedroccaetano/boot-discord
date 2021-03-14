const Discord = require('discord.js');
const cheerio = require('cheerio');
const rp = require('request-promise');

const JOB = require('../job');

const servers = require('../commands/clients.json');
const { prefix, logo } = require('../config/config.json');
const { commands } = require('../commands/commands.json');

const { fetch, response, searchAllCommands } = require('../utils');

const availableCommands = searchAllCommands();

exports.actions = async function (client, message) {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!command || !availableCommands.includes(command)) message.channel.send('Comando não encontrado!');

  if (command === 'help' || command === 'commands') {
    const embed = new Discord.MessageEmbed()
      .setColor('#0560E4')
      .setTitle('COMANDOS')
      .addFields(commands)
      .setFooter('Santri', logo)
      .setTimestamp();

    message.channel.send(embed);
  }

  if (command === 'servidores') {
    await new JOB(client).callAllServers();
  }

  if (command === 'dia') {
    rp('http://frasedodia.net/')
      .then((htmlString) => {
        const $ = cheerio.load(htmlString);

        const frase = $('.frases div:nth-of-type(1) .bgfrase a.linkfrase').text();
        const author = $('.frases div:nth-of-type(1) .bgfrase h5 a').text();

        message.channel.send(`Frase do dia: ${frase} (${author})`);
      });
  }

  if (command === 'piada') {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const responseAPI = await fetch('https://us-central1-kivson.cloudfunctions.net/charada-aleatoria', config)
      .then((res) => res.json());

    if (responseAPI) {
      message.channel.send(responseAPI.pergunta);
      message.channel.send(responseAPI.resposta).then((e) => e.react('😂'));
    }
  }

  for (const server of servers) {
    if (server.commands.includes(command)) {
      const data = {
        servidor: server.nome,
        integrador: server.integrador,
        site: server.site,
      };

      try {
        const responseAPI = await fetch(`${server.integrador}/parametros`, {}, 5000);

        if (responseAPI.status === 200) {
          const embed = response.success(data);

          message.channel.send(embed);
        } else {
          const embed = response.error(data);

          message.channel.send(embed);
        }
      } catch (error) {
        const embed = response.error(data);

        message.channel.send(embed);
      }
    }
  }
};
