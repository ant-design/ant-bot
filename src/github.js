const GitHub = require('github');

const github = new GitHub({
  debug: true,
});

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN,
});

module.exports = github;
