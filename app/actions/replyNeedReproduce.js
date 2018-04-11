const format = require('string-template');
const { commentIssue } = require('../../lib/github');
const { NEED_REPRODUCE } = require('../label');

const comment = `
Hello @{user}. Please provide a reproducible example by creating a github repo.

Issues labeled by \`Need Reproduce\` will be closed if no activities in 7 days.
`;

function replyNeedReproduce(on) {
  on('issues_labeled', ({ payload, repo }) => {
    if (repo !== 'egg') return;
    if (payload.label.name === NEED_REPRODUCE) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment[repo], { user: payload.issue.user.login }),
      });
    }
  });
}

module.exports = replyNeedReproduce;
