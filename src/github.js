const GitHub = require('github');
const { promisify } = require('util');

const github = new GitHub({
  debug: process.env.NODE_ENV === 'development',
});

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN,
});

module.exports = {
  commentIssue(payload, body) {
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const number = payload.issue.number;

    github.issues.createComment({
      owner,
      repo,
      number,
      body,
    });
  },

  closeIssue(payload) {
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const number = payload.issue.number;

    github.issues.edit({
      owner,
      repo,
      number,
      state: 'closed',
    });
  },

  addLabels({ owner, repo, number, labels }) {
    github.issues.addLabels({
      owner,
      repo,
      number,
      labels,
    })
  },

  removeLabel({ owner, repo, number, name }) {
    github.issues.removeLabel({
      owner,
      repo,
      number,
      name,
    })
  },

  getMembers(cb) {
    return github.orgs.getMembers({
      org: process.env.GITHUB_OWNER,
      per_page: 100,
    }, cb);
  },

  getIssues(repo) {
    return promisify(github.issues.getForRepo)({
      owner: process.env.GITHUB_OWNER,
      repo,
      per_page: 200,
    });
 },
};
