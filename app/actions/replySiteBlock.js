const { commentIssue } = require('../../lib/github');

const keyword1 = ['官网', '网站', 'mobile ant design', 'mobile.ant.design', 'ant design', 'ant.design', 'pro'];

const keyword2 = ['挂了', '无法访问', '不能访问', '访问不了', '出问题', '打不开', '登不上'];

function containsSiteBlock(title) {
  return keyword1.find(item => title.includes(item)) && keyword2.find(item => title.includes(item));
}

function replySiteBlock(on) {
  on('issues_opened', async ({ payload }) => {
    if (containsSiteBlock(payload.issue.title)) {
      let content = `
        * Ant Design 官网：https://ant.design
        * Ant Design Pro: https://pro.ant.design
        * 国内官网镜像：http://ant-design.gitee.io
        * Pro 国内官网镜像：http://ant-design-pro.gitee.io
        * Ant Design Mobile 官网: http://mobile.ant.design
        *Ant Design Mobile 国内镜像: http://antd-mobile.gitee.io
      `;

      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: content,
      });
    }
  });
}

module.exports = replySiteBlock;
