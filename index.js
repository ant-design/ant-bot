const requireDir = require('require-dir');
const features = requireDir('./lib/features');

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!');

  Object.keys(features).forEach(key => {
    const feature = features[key];
    feature(app);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
