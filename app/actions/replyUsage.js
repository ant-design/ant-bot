const format = require('string-template');
const { commentIssue, closeIssue } = require('../../lib/github');

const comment = "\
Hello @{user}, we use GitHub issues to trace bugs or discuss \
plans of Ant Design. So, please [don't ask usage questions](https://github.com/ant-design/ant-design/issues/2320) here. You can try \
to ask questions on [Stack Overflow](http://stackoverflow.com/questions/tagged/antd) \
or [Segment Fault](https://segmentfault.com/t/antd), then apply tag `antd` and \
`react` to your question.";

function replyUsage(on) {
  on('issues_labeled', ({ payload }) => {
    if (payload.label.name === 'Usage') {
      commentIssue(
        payload,
        format(comment, { user: payload.issue.user.login })
      );

      closeIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
      });
    }
  });
}

module.exports = replyUsage;
