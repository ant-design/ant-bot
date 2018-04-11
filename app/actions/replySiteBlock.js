const { commentIssue, closeIssue } = require('../../lib/github');

const keyword1 = ['官网', '网站', 'eggjs.org'];

const keyword2 = [
  '挂了',
  '无法访问',
  '不能访问',
  '访问不了',
  '出问题',
  '打不开',
  '登不上',
  "can't open",
  'can not open',
  'can not be reached',
  "can't be reached",
];

function matchKeyword(content, keywords) {
  return keywords.find(item => content.toLowerCase().includes(item));
}

function containsSiteBlock(title) {
  return matchKeyword(title, keyword1) && matchKeyword(title, keyword2);
}

function replySiteBlock(on) {
  on('issues_opened', async ({ payload }) => {
    if (containsSiteBlock(payload.issue.title)) {
      const content = '由于某些众所周知的原因无法访问，建议翻墙或访问[国内镜像站点](https://egg-docs.implements.io)。';

      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: content,
      });

      closeIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
      });
    }
  });
}

module.exports = replySiteBlock;
