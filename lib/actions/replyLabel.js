const getConfig = require('../getConfig');
const match = require('../match');
const applyAction = require('../applyAction');

module.exports = app => {
  app.on('issues.labeled', async context => {
    if (context.isBot) {
      return;
    }

    const config = await getConfig(context, 'replyLabel')
    if (config.enable !== true && config.rules.length === 0) {
      return;
    }

    config.rules.forEach(rule => {
      const { filter, action } = rule;
      const { label } = context.paload;
      if (match(filter, {
        name: label.name,
      })) {
        applyAction(context, action);
      }
    });
  });
};
