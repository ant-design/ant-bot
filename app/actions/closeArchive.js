const format = require('string-template');
const { commentIssue, closeIssue } = require('../../lib/github');

const comment =
  '\
Hello @{user}, current branch is off the maintenance period. \
We may not accept pull request or fix bug with it anymore. This topic will be auto closed.\
\n\
\n\
你好 @{user}，当前分支已经过了维护期。\
我们不会再接受对其的相关 PR 与 issue。当前 topic 会被自动关闭。\
';

function closeArchive(on) {
  function commentAndClose(payload) {
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

  on('issues.labeled', ({ payload }) => {
    if (['3.x'].includes(payload.label.name)) {
      commentAndClose(payload);
    }
  });

  on('pull_request.opened', ({ payload }) => {
    if (
      ['0.12-stable', '1.x-stable', '2.x-stable', '3.x-stable'].includes(
        payload.pull_request.base.ref,
      )
    ) {
      commentAndClose(payload);
    }
  });
}

module.exports = closeArchive;
