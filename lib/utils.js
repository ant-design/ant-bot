const crypto = require('crypto');
const { fixedTimeComparison } = require('cryptiles');

module.exports = {
  mentioned(body) {
    return body.includes(`@${process.env.GITHUB_BOT_NAME}`);
  },

  verifySignature(request) {
    let signature = crypto
      .createHmac('sha1', process.env.GITHUB_SECRET_TOKEN)
      .update(request.rawBody)
      .digest('hex');
    signature = `sha1=${signature}`;
    return fixedTimeComparison(signature, request.headers['x-hub-signature']);
  },

  isIssueValid(issue) {
    const mark = 'ant-design-issue-helper';
    return issue.body.includes(mark);
  },

  getChangelog(content, version) {
    const lines = content.split('\n');
    const changeLog = [];
    const startPattern = new RegExp(`^## ${version}`);
    const stopPattern = /^## /; // 前一个版本
    const skipPattern = /^`/; // 日期
    let begin = false;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (begin && stopPattern.test(line)) {
        break;
      }
      if (begin && line && !skipPattern.test(line)) {
        changeLog.push(line);
      }
      if (!begin) {
        begin = startPattern.test(line);
      }
    }
    return changeLog.join('\n');
  },
};
