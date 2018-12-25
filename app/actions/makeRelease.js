const axios = require('axios');
const { getChangelog } = require('../../lib/utils');
const { createRelease } = require('../../lib/github');

function makeRelease(on) {
  on('create', async ({ payload, repo }) => {
    if (repo !== 'ant-design') {
      return;
    }
    if (payload.ref_type !== 'tag') {
      return;
    }
    const version = payload.ref;
    const url = 'https://raw.githubusercontent.com/ant-design/ant-design/master/';
    const enChangelogContent = await axios.get(`${url}/CHANGELOG.en-US.md`);
    const enChangelog = getChangelog(enChangelogContent.data, version);
    const cnChangelogContent = await axios.get(`${url}/CHANGELOG.zh-CN.md`);
    const cnChangelog = getChangelog(cnChangelogContent.data, version);
    const changelog = [enChangelog, '\n', '---', '\n', cnChangelog].join('\n');
    createRelease({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      tag_name: version,
      name: version,
      body: changelog,
    });
    if (cnChangelog) {
      // Notify dingding
      axios.post(
        `https://oapi.dingtalk.com/robot/send?access_token=${process.env.DINGDING_BOT_TOKEN}`,
        {
          msgtype: 'markdown',
          markdown: {
            title: `${version} 发布日志`,
            text: `# ${version} 发布日志 \n\n ${cnChangelog}`,
          },
        },
      );
    }
  });
}

module.exports = makeRelease;
