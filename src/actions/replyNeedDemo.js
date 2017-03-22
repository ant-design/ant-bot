const format = require('string-template');
const { commentIssue } = require('../github');

const comment = {
  'ant-design': 'Hellp @{user}. Please provide a re-producible demo: http://codepen.io/benjycui/pen/KgPZrE?editors=001',
  'ant-design-mobile': 'Hellp @{user}. Please provide a re-producible demo: http://codepen.io/paranoidjk/pen/LWpaKe',
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
