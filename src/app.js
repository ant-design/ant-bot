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
    const action = ctx.request.body.action;
    eventName += `_${action}`;
    console.log('receive event: ', eventName);
    githubEvent.emit(eventName, ctx.request.body);
    ctx.body = 'Ok.';
  } else {
    ctx.body = 'Go away.';
  }
});

Object.keys(actions).forEach((key) => {
  actions[key](githubEvent.on.bind(githubEvent));
});

const port = process.env.NODE_ENT === 'production' ? 80 : 3000;
app.listen(port);
console.log(`Listening on http://0.0.0.0:${port}`);
