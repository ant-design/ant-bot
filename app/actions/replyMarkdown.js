const format = require('string-template');
const { commentIssue } = require('../../lib/github');
const { mentioned } = require('../../lib/utils');

const comment = 'Hello @{user}, please format your issue in markdown https://segmentfault.com/markdown';

function replyMarkdown(on) {
  on('issue_comment_created', ({ payload }) => {
    if (mentioned(payload.comment.body) && payload.comment.body.includes('markdown')) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.repository.number,
        body: format(comment, { user: payload.issue.user.login }),
      });
    }
  });
}

module.exports = replyMarkdown;
