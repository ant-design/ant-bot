const { addAssigneesToIssue } = require('../../lib/github');
const { isIssueValid } = require('../../lib/utils');
const { sample } = require('lodash');

// Not assign since currently not enough maintainer
const STOP_RANDOM_ASSIGN = true;

const maintainers = ['zombieJ', 'afc163', 'chenshuai2144', 'yutingzhao1991'];

function randomAssign(on) {
  on('issues.opened', ({ payload, repo }) => {
    if (repo !== 'ant-design') {
      return;
    }
    const maintainer = sample(maintainers);
    const { issue } = payload;
    if (issue && !isIssueValid(issue)) {
      return;
    }

    if (STOP_RANDOM_ASSIGN) {
      return;
    }

    addAssigneesToIssue({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      number: issue ? issue.number : payload.pull_request.number,
      assignees: [maintainer],
    });
  });
}

module.exports = randomAssign;
