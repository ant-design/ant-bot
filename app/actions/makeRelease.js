/* eslint-disable no-await-in-loop */
const axios = require('axios');
const { getChangelog } = require('../../lib/utils');
const { createRelease } = require('../../lib/github');

const urls = [
  'https://raw.githubusercontent.com/ant-design/ant-design/master/',
  'https://raw.githubusercontent.com/ant-design/ant-design/3.x-stable/',
];

function makeRelease(on) {
  on('create', async ({ payload, repo }) => {
    if (repo !== 'ant-design') {
      return;
    }
    if (payload.ref_type !== 'tag') {
      return;
    }
    const version = payload.ref;

    let enChangelog = '';
    let cnChangelog = '';

    for (let i = 0; i < urls.length; i += 1) {
      const url = urls[i];

      const enChangelogContent = await axios.get(`${url}/CHANGELOG.en-US.md`);
      enChangelog = enChangelog || getChangelog(enChangelogContent.data, version);
      const cnChangelogContent = await axios.get(`${url}/CHANGELOG.zh-CN.md`);
      cnChangelog = cnChangelog || getChangelog(cnChangelogContent.data, version);
    }

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
/* eslint-enable */
