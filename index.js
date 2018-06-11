const requireDir = require('require-dir');
const actions = requireDir('./lib/actions');

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!');

  Object.keys(actions).forEach(key => {
    const action = actions[key];
    action(app);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
