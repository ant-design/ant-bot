const translate = require('google-translate-api');
const getConfig = require('../getConfig');
const match = require('../match');

module.exports = app => {
  app.on('issues.opened', async context => {
    const config = await getConfig(context, 'translate')
    if (config.enable !== true && config.rules.length === 0) {
      return;
    }

    config.rules.forEach(async rule => {
      const { filter } = rule;
      const { issue } = context.payload;
      if (!match(filter, {
        body: issue.body,
        title: issue.title,
        author: issue.user.login,
      })) {
        return;
      }

      const content = `
Translation of this issue:

<hr/>

## ${issue.title}

${issue.body}
`;
      const res = await translate(content, { from: rule.from, to: 'en' });
      const comment = context.issue({ body: res.text });
      context.github.issues.createComment(comment);
    });
  });
}
