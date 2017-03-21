const format = require("string-template");
const github = require('../github');

const comment = 'Hellp @{sender}. Please provide a re-producible demo: http://codepen.io/benjycui/pen/KgPZrE?editors=001';

function replyNeedDemo(on) {
  on('issues_labeled', (payload) => {
    if (payload.label.name === 'Need Demo') {
      const owner = payload.repository.owner.login;
      const repo = payload.repository.name;
      const number = payload.issue.number;

      github.issues.createComment({
        owner,
        repo,
        number,
        body: format(comment, { sender: payload.sender.login }),
      });
    }
  });
}

module.exports = replyNeedDemo;
