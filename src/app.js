require('dotenv').config();
const EventEmitter = require('events');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const requireDir = require('require-dir');
const actions = requireDir('./actions');

const app = new Koa();
const githubEvent = new EventEmitter();

app.use(bodyParser());

app.use(ctx => {
  let eventName = ctx.request.headers['x-github-event'];
  if (eventName) {
    const payload = ctx.request.body;
    const action = payload.action;
    eventName += `_${action}`;
    console.log('receive event: ', eventName);
    if (payload.sender.login !== process.env.GITHUB_BOT_NAME) {
      githubEvent.emit(eventName, payload);
    }
    ctx.body = 'Ok.';
  } else {
    ctx.body = 'Go away.';
  }
});

Object.keys(actions).forEach((key) => {
  actions[key](githubEvent.on.bind(githubEvent));
});

const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
app.listen(port);
console.log(`Listening on http://0.0.0.0:${port}`);
