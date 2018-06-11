const getConfig = require('../getConfig');

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
      if (filter.match && !RegExp(filter.match).test(context.payload.label.name)) {
        return;
      }
      if (filter.notMatch && RegExp(filter.notMatch).test(context.payload.label.name)) {
        return;
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
