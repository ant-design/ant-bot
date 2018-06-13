const getConfig = require('../getConfig');

function getChangelog(file, content, version) {
  const lines = Buffer.from(content, 'base64').toString('utf-8').split('\n');
  const changeLog = [];
  const startPattern = new RegExp(`^## ${version}`);
  const stopPattern = /^## /; // prev version
  let begin = false;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (begin && stopPattern.test(line)) {
      break;
    }
    if (begin && line) {
      if (file.skip && RegExp(file.skip).test(line)) {
        continue;
      }
      changeLog.push(line);
    }
    if (!begin) {
      begin = startPattern.test(line);
    }
  }
  return changeLog.join('\n');
}

module.exports = app => {
  app.on('create', async context => {
    const config = await getConfig(context, 'release')
    if (config.enable !== true && config.files.length === 0) {
      return;
    }
    const { payload } = context;
    if (payload.ref_type !== 'tag') {
      return;
    }
    const version = payload.ref;
    const seprator = config.seprator || '---';
    const changelog = await Promise.all(config.files.map(async file => {
      const params = context.repo({ path: file.path })
      const response = await context.github.repos.getContent(params);
      return getChangelog(file, response.data.content, version);
    }));
    const body = changelog.join(`\n${seprator}\n`);

    const release = context.repo({
      name: version,
      body: body,
      tag_name: version,
    });
    context.github.repos.createRelease(release);
  });
}
