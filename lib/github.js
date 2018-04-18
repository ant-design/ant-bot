const GitHub = require('github');
const { promisify } = require('util');

const github = new GitHub({
  debug: process.env.NODE_ENV === 'development',
});

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN,
});

async function getIssues(repo, page = 1) {
  const perPage = 100;
  let { data: issues } = await promisify(github.issues.getForRepo)({
    owner: process.env.GITHUB_OWNER,
    repo,
    page,
    per_page: perPage,
  });
  if (issues.length >= perPage) {
    issues = issues.concat(await getIssues(repo, page + 1));
  }
  return issues;
}

module.exports = {
  commentIssue({ owner, repo, number, body }) {
    github.issues.createComment({
      owner,
      repo,
      number,
      body,
    });
  },

  closeIssue({ owner, repo, number }) {
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
    });
  },

  removeLabel({ owner, repo, number, name }) {
    github.issues.removeLabel({
      owner,
      repo,
      number,
      name,
    });
  },

  getMembers(cb) {
    return github.orgs.getMembers(
      {
        org: process.env.GITHUB_OWNER,
        per_page: 100,
      },
      cb,
    );
  },

  getIssues,

  addAssigneesToIssue(params) {
    github.issues.addAssigneesToIssue(params);
  },

  createRelease(params) {
    github.repos.createRelease(params);
  },
};
