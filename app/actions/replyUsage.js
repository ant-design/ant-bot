const format = require('string-template');
const { commentIssue, closeIssue } = require('../../lib/github');

const comment =
  "\
Hello @{user}, we use GitHub issues to trace bugs or discuss \
plans of Ant Design. So, please [don't ask usage questions](https://github.com/ant-design/ant-design/issues/2320) here. You can try \
to open a new discussion in [antd discussions](https://github.com/ant-design/ant-design/discussions), select `Q&A` to ask questions,\
also can ask questions on [Stack Overflow](http://stackoverflow.com/questions/tagged/antd) \
or [Segment Fault](https://segmentfault.com/t/antd), then apply tag `antd` and \
`react` to your question.\
\n\
\n\
你好 @{user}，Ant Design Issue 板块是用于 bug 反馈与需求讨论的地方。\
请[勿询问如何使用的问题](https://github.com/ant-design/ant-design/issues/2320)，\
你可以试着在 [antd discussions](https://github.com/ant-design/ant-design/discussions) 新开一个 discussion，选择 `Q&A` 类别进行提问，\
也可以在 [Stack Overflow](http://stackoverflow.com/questions/tagged/antd) 或者 [Segment Fault](https://segmentfault.com/t/antd) \
中提问（记得添加 `antd` 和 `react` 标签哦~）。\
";

function replyUsage(on) {
  on('issues.labeled', ({ payload }) => {
    if (['Usage', 'Question'].includes(payload.label.name)) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment, { user: payload.issue.user.login }),
      });

      closeIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
      });
    }
  });
}

module.exports = replyUsage;
