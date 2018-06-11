const getGlobalConfig = require('probot-config');

module.exports = async (context, action) => {
  const globalConfig = await getGlobalConfig(context, 'ant-bot.yml');
  if (!globalConfig) {
    return {}
  }
  const config =  globalConfig[action] || {};
  context.log(`[${action}]Loaded config`, config);
  return config;
}
