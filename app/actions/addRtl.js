const { addLabels, addAssigneesToIssue } = require('../../lib/github');
const { isIssueValid } = require('../../lib/utils');

function addRtl(on) {
  on('issues_opened', ({ payload, repo }) => {
    if (repo !== 'ant-design') {
      return;
    }
    const { issue } = payload;
    if (issue && !isIssueValid(issue)) {
      return;
    }
    if (issue.title.toLowerCase().includes('rtl') || issue.body.toLowerCase().includes('rtl')) {
      addLabels({
        owner: payload.repository.owner.login,
        repo,
        number: issue.number,
        labels: ['rtl'],
      });
      addAssigneesToIssue({
        owner: payload.repository.owner.login,
        repo,
        number: issue.number,
        assignees: ['xrkffgg'],
      });
    }
  });
}

module.exports = addRtl;
