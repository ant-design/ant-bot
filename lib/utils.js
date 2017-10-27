const crypto = require('crypto');
const { fixedTimeComparison } = require('cryptiles');

module.exports = {
  mentioned(body) {
    return body.includes(`@${process.env.GITHUB_BOT_NAME}`);
  },

  verifySignature(request) {
    let signature = crypto.createHmac('sha1', process.env.GITHUB_SECRET_TOKEN)
                      .update(request.rawBody)
                      .digest('hex');
    signature = `sha1=${signature}`;
    return fixedTimeComparison(signature, request.headers['x-hub-signature'])
  },
};
