module.exports = {
  mentioned(body) {
    return body.includes(`@${process.env.GITHUB_BOT_NAME}`);
  },
};
