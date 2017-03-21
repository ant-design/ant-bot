const format = require('string-template');
const { commentIssue } = require('../github');

const comment = 'Hellp @{user}. Please provide a re-producible demo: http://codepen.io/benjycui/pen/KgPZrE?editors=001';

function replyNeedDemo(on) {
  on('issues_labeled', (payload) => {
    if (payload.label.name === 'Need Demo') {
      commentIssue(
        payload,
        format(comment, { user: payload.issue.user.login })
      );
    }
  });
}

module.exports = replyNeedDemo;
