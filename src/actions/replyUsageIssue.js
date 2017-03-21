const github = require('../github');

const comment = `
  Hello, I'm a robot.
`;

function replyUsageIssue(on) {
  on('issues_labeled', (payload) => {
    github.issues.createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      number: payload.issue.number,
      body: comment,
    });
  });
}

module.exports = replyUsageIssue;
