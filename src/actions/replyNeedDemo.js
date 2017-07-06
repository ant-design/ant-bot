const format = require('string-template');
const { commentIssue } = require('../github');

const comment = {
  'ant-design': 'Hello @{user}. Please provide a re-producible demo: https://codepen.io/pen?template=KgPZrE&editors=0010',
  'ant-design-mobile': 'Hello @{user}. Please provide a re-producible demo: https://codepen.io/pen?template=LWpaKe&editors=0010',
}

function replyNeedDemo(on) {
  on('issues_labeled', ({ payload, repo }) => {
    if (payload.label.name === 'Need Demo') {
      commentIssue(
        payload,
        format(comment[repo], { user: payload.issue.user.login })
      );
    }
  });
}

module.exports = replyNeedDemo;
