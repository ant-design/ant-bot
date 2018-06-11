const getConfig = require('../getConfig');

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
      const { issue } = context.payload;
      if (filter.match && !RegExp(filter.match).test(issue.body)) {
        return;
      }
      if (filter.notMatch && RegExp(filter.notMatch).test(issue.body)) {
        return;
      }
      if (filter.matchTitle && !RegExp(filter.matchTitle).test(issue.title)) {
        return;
      }
      if (filter['^author'] && RegExp(filter['^author']).test(issue.user.login)) {
        return;
      }

      if (action.label) {
        const label = context.issue({ labels: [action.label] });
        context.github.issues.addLabels(label);
      }

      if (action.comment) {
        const comment = context.issue({ body: action.comment });
        context.github.issues.createComment(comment);
      }

      if (action.close) {
        const issue = context.issue({ state: 'closed' });
        context.github.issues.edit(issue);
      }
    });
  });
};
