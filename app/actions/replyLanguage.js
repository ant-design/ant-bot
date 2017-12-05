const { commentIssue } = require('../../lib/github');

const comment = `
It will be better to write your issue/comment in English, so more people can understand you.
 And this means that more people can help you or benefit from your issue/comment.
 See: https://github.com/ant-design/ant-design/issues/4897`;

function containsChinese(title) {
  return /[\u4e00-\u9fa5]/.test(title);
}

function replyLanguage(on) {
  on('issues_opened', ({ payload }) => {
    if (containsChinese(payload.issue.title)) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.repository.number,
        body: comment,
      });
    }
  });
}

module.exports = replyLanguage;
