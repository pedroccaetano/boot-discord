const { client } = require('./bot');
const { logger } = require('./utils/looger');

const Job = require('./job');

const config = require('./config/config.json');

(async () => {
  try {
    await client.login(config.token);

    const job = new Job(client);
    await (await job.testServers()).start();
  } catch (error) {
    logger.error(`Bot exited with error: ${error}`);
  }
})();
