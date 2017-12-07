const translate = require('google-translate-api');
const { mentioned } = require('../../lib/utils');
const { commentIssue } = require('../../lib/github');

function replyTranslate(on) {
  on('issue_comment_created', async ({ payload }) => {
    if (mentioned(payload.comment.body) && payload.comment.body.toLowerCase().includes('translate')) {
      const content = `## ${payload.issue.title}\n${payload.issue.body}`;
      const res = await translate(content, { from: 'zh-CN', to: 'en' });
      console.log(res);
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: res.text,
      });
    }
  });
}

module.exports = replyTranslate;
