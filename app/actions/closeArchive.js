const format = require('string-template');
const { commentIssue, closeIssue } = require('../../lib/github');

const comment =
  '\
Hello @{user}, current branch you are pulling request is off the maintenance period. \
We may not accept pull request with it anymore. This PR will be auto closed.\
\n\
\n\
你好 @{user}，你提交 PR 的分支已经过了维护期。\
我们不会再接受对其的相关 PR。该 PR 会被自动关闭。\
';

function closeArchive(on) {
  on('pull_request.opened', ({ payload }) => {
    console.log('=>', JSON.stringify(payload));

    if (['0.12-stable', '1.x-stable', '2.x-stable'].includes(payload.pull_request.base.ref)) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.pull_request.number,
        body: format(comment, { user: payload.pull_request.user.login }),
      });

      closeIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.pull_request.number,
      });
    }
  });
}

module.exports = closeArchive;
