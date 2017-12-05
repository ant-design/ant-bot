const format = require('string-template');
const { commentIssue } = require('../../lib/github');

const comment = {
  'ant-design': `
Hello @{user}. Please provide a online reproduction by forking this codepen https://codepen.io/pen?template=KgPZrE&editors=0010. Issues labeled by \`Need Reproduce\` will be closed if no activities in 7 days.
`,
  'ant-design-mobile':
    'Hello @{user}. Please provide a re-producible demo: https://codepen.io/pen?template=LWpaKe&editors=0010',
};

function replyNeedReproduce(on) {
  on('issues_labeled', ({ payload, repo }) => {
    if (payload.label.name === 'Need Reproduce') {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.repository.number,
        body: format(comment[repo], { user: payload.issue.user.login }),
      });
    }
  });
}

module.exports = replyNeedReproduce;
