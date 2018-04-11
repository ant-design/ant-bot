const format = require('string-template');
const { commentIssue } = require('../../lib/github');
const label = require('../label');

const reply = `
Hello @{user}.

- If you use npm, please try \`rm -rf node_modules && npm install\` to upgrade all your deps.

<img src="https://cloud.githubusercontent.com/assets/465125/26667345/4bcc8f10-46d7-11e7-8c72-32a0c68ea7ca.jpg" width="500" height="300">
`;
const comment = {
  egg: reply,
};

function replyUpgradeDeps(on) {
  on('issues_labeled', ({ payload, repo }) => {
    if (payload.label.name === label.UPGRADE_DEPS) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment[repo], { user: payload.issue.user.login }),
      });
    }
  });
}

module.exports = replyUpgradeDeps;
