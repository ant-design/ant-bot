const { commentIssue, closeIssue } = require('../../lib/github');

const keyword1 = ['官网', '网站', 'mobile ant design', 'mobile.ant.design', 'ant design', 'ant.design', 'pro'];

const keyword2 = ['挂了', '无法访问', '不能访问', '访问不了', '出问题', '打不开', '登不上'];

function containsSiteBlock(title) {
  return keyword1.find(item => title.includes(item)) && keyword2.find(item => title.includes(item));
}

function replySiteBlock(on) {
  on('issues_opened', async ({ payload }) => {
    if (containsSiteBlock(payload.issue.title)) {
      let content = `
## 官网

* Ant Design: https://ant.design
* Ant Design Pro: https://pro.ant.design
* Ant Design Mobile: https://mobile.ant.design
* Ant Motion: https://motion.ant.design

## 国内镜像

* Ant Design: http://ant-design.gitee.io
* Ant Design Pro: http://ant-design-pro.gitee.io
* Ant Design Mobile: http://antd-mobile.gitee.io
* Ant Motion: http://ant-motion.gitee.io
      `;

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
