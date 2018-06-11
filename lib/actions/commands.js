const { Command } = require('probot-commands');
const getConfig = require('../getConfig');
const applyAction = require('../applyAction');

module.exports = app => {
  app.on('issue_comment.created', async context => {
    const config = await getConfig(context, 'commands')
    if (config.enable !== true && config.rules.length === 0) {
      return;
    }

    config.rules.forEach(rule => {
      const { action } = rule;
      const command = new Command(rule.command, () => {
        applyAction(context, action);
      });
      command.listener(context);
    });
  })
}
