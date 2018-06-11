const getConfig = require('../getConfig');
const match = require('../match');
const applyAction = require('../applyAction');

module.exports = app => {
  app.on('issues.opened', async context => {
    if (context.isBot) {
      return;
    }

    const config = await getConfig(context, 'reply')
    if (config.enable !== true && config.rules.length === 0) {
      return;
    }

    config.rules.forEach(rule => {
      const { filter, action } = rule;
      if (match(filter, {
        body: issue.body,
        title: issue.title,
        author: issue.user.login,
      })) {
        applyAction(context, action);
      }
    });
  });
};
