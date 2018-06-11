const { sample } = require('lodash');
const getConfig = require('../getConfig');

module.exports = app => {
  app.on('issues.opened', async context => {
    const config = await getConfig(context, 'assign')
    if (config.enable !== true && config.rules.length === 0) {
      return;
    }
    config.rules.forEach(rule => {
      const { filter } = rule;
      if (filter.match && !RegExp(filter.match).test(context.payload.issue.body)) {
        return;
      }
      if (filter.notMatch && RegExp(filter.notMatch).test(context.payload.issue.body)) {
        return;
      }
      let { assignees } = rule;
      if (rule.random) {
        assignees = sample(assignees);
      }
      const params = context.issue({ assignees });
      context.github.issues.addAssigneesToIssue(params);
    });
  });
}
