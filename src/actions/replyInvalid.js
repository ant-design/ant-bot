const format = require('string-template');
const { commentIssue, closeIssue, getMembers, addLabels } = require('../github');

const comment = "\
Hello @{user}, your issue has been closed because it does not conform to our \
issue requirements. Please use the [Issue Helper](http://new-issue.ant.design?repo={repo}) \
to create an issue, thank you!"

let members = [];
const repos = ['ant-design', 'ant-design-mobile'];

function replyInvalid(on) {
  getMembers((error, res) => {
    members = res.data.map(m => m.login);
  });

  on('issues_opened', ({ payload, repo }) => {
    if (repos.indexOf(repo) === -1) {
      return;
    }
    const { issue } = payload;
    const mark = 'ant-design-issue-helper';
    const opener = issue.user.login;
    if (!issue.body.includes(mark) && !members.includes(opener)) {
      commentIssue(
        payload,
        format(comment, {
          user: opener,
          repo,
        })
      );

      if (repo === 'ant-design') {
        closeIssue(payload);
      }
      addLabels({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number:  payload.issue.number,
        labels: ['Invalid'],
      });
    }
  });
}

module.exports = replyInvalid;
