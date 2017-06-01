const format = require('string-template');
const { commentIssue } = require('../github');

const reply = `
Hello @{user}.

- If you use npm, please try `rm -rf node_modules && npm install` to upgrade all your deps.
- If you use yarn, you may need `yarn upgrade`.

<img src="https://cloud.githubusercontent.com/assets/465125/26667345/4bcc8f10-46d7-11e7-8c72-32a0c68ea7ca.jpg" width="500" height="300">
`;
const comment = {
  'ant-design': reply,
  'ant-design-mobile': reply,
}

function replyUpgradeDeps(on) {
  on('issues_labeled', ({ payload, repo }) => {
    if (payload.label.name === 'Upgrade Deps') {
      commentIssue(
        payload,
        format(comment[repo], { user: payload.issue.user.login })
      );
    }
  });
}

module.exports = replyUpgradeDeps;
