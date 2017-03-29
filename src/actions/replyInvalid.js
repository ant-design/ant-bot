const format = require('string-template');
const { commentIssue, closeIssue, getMembers } = require('../github');

const comment = "\
Hello @{user}, your issue has been closed because it does not conform to our \
issue requirements. Please use the [Issue Helper](http://new-issue.ant.design?repo={repo}) \
to create an issue, thank you!"

let members = [];

function replyInvalid(on) {
  getMembers((error, res) => {
    members = res.data.map(m => m.login);
  });

  on('issues_opened', ({ payload, repo }) => {
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

      closeIssue(payload);
    }
  });
}

module.exports = replyInvalid;
