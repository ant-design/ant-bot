const { sample } = require('lodash');
const getConfig = require('../getConfig');
const match = require('../match');

module.exports = app => {
  app.on('issues.opened', async context => {
    const config = await getConfig(context, 'assign')
    if (config.enable !== true && config.rules.length === 0) {
      return;
    }
    config.rules.forEach(rule => {
      const { filter } = rule;
      let { assignees } = rule;
      if (!match(filter, {
        body: issue.body,
        title: issue.title,
        author: issue.user.login,
      })) {
        return;
      }
      if (rule.random) {
        assignees = sample(assignees);
      }
      const params = context.issue({ assignees });
      context.github.issues.addAssigneesToIssue(params);
    });
  });
}
