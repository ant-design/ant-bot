require('./setup');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const requireDir = require('require-dir');
const githubEvent = require('./githubEvent');

const actions = requireDir('./actions');
const webhook = require('./routes/webhook');

const app = new Koa();
const router = new Router();

router
  .get('*', function(ctx) {
    ctx.body = 'Hello World!';
  })
  .post('/webhook/:repo', webhook);

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

Object.keys(actions).forEach(key => {
  actions[key](githubEvent.on.bind(githubEvent));
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on http://0.0.0.0:${port}`);
