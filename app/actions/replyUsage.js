const format = require('string-template');
const { commentIssue, closeIssue } = require('../../lib/github');
const { USAGE, QUESTION } = require('../label');

const comment =
  "\
Hello @{user}, we use GitHub issues to trace bugs or discuss \
plans of Egg.js. So, please don't ask usage questions here. You can try \
to ask questions on [Stack Overflow](http://stackoverflow.com) \
or [CNode](https://cnodejs.org).";

function replyUsage(on) {
  on('issues_labeled', ({ payload }) => {
    if ([USAGE, QUESTION].includes(payload.label.name)) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment, { user: payload.issue.user.login }),
      });

      closeIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
      });
    }
  });
}

module.exports = replyUsage;
