const format = require('string-template');
const { commentIssue, closeIssue, getMembers, addLabels } = require('../../lib/github');
const { isIssueValid } = require('../../lib/utils');

const comment =
  '\
Hello @{user}, your issue has been closed because it does not conform to our \
issue requirements. Please use the [Issue Helper](http://ng.ant.design/issue-helper/#/en) \
to create an issue, thank you! \n\n\
你好 @{user}，为了能够进行高效沟通，我们对 issue 有一定的格式要求，你的 issue 因为不符合要求而被自动关闭。\
你可以通过 [issue 助手](http://ng.ant.design/issue-helper/#/zh) 来创建 issue 以方便我们定位错误。谢谢配合！';

let members = [];
const repos = ['ng-zorro-antd'];

function replyInvalid(on) {
  getMembers((error, res) => {
    members = res.data.map(m => m.login);
  });

  on('issues.opened', ({ payload, repo }) => {
    if (repos.indexOf(repo) === -1) {
      return;
    }
    const { issue } = payload;
    const opener = issue.user.login;
    if (!isIssueValid(issue) && !members.includes(opener)) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment, { user: opener, repo }),
      });

      closeIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
      });

      addLabels({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        labels: ['Invalid'],
      });
    }
  });
}

module.exports = replyInvalid;
