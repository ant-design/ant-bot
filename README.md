# Ant bot

[![Greenkeeper badge](https://badges.greenkeeper.io/ant-design/ant-bot.svg)](https://greenkeeper.io/)

## Development

### start

```
$ yarn
$ cp env .env
$ vim .env
$ yarn dev
```

### a simplest action

```javascript
// src/actions/hello.js
const { commentIssue } = require('../github');

function hello(on) {
  on('issue_opend', ({ payload }) => {
    const user = payload.issue.user.login ;
    commentIssue(
      payload,
      `Hello @${user}`,
    );
  });
}

module.exports = hello;
```
