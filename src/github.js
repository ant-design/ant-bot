const GitHub = require('github');

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

  addLabels(payload, labels) {
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const number = payload.issue.number;

    github.issues.addLabels({
      owner,
      repo,
      number,
      labels,
    })
  },

  getMembers(cb) {
    return github.orgs.getMembers({
      org: 'ant-design',
      per_page: 100,
    }, cb);
  },
};
