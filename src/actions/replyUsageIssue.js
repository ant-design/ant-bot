const format = require("string-template");
const github = require('../github');

const comment = "\
Hello, @{sender}. We use GitHub issues to trace bugs or discuss \
plans of Ant Design. So, please don't ask usage questions here. You can try \
to ask questions in [Stack Overflow](http://stackoverflow.com/questions/tagged/antd) \
or [Segment Fault](https://segmentfault.com/t/antd), then apply tag `antd` and \
`react` to your questions.";

function replyUsageIssue(on) {
  on('issues_labeled', (payload) => {
    if (payload.label.name === 'Usage') {
      const owner = payload.repository.owner.login;
      const repo = payload.repository.name;
      const number = payload.issue.number;

      github.issues.createComment({
        owner,
        repo,
        number,
        body: format(comment, { sender: payload.sender.login }),
      });

      github.issues.edit({
        owner,
        repo,
        number,
        state: 'closed',
      })
    }
  });
}

module.exports = replyUsageIssue;
