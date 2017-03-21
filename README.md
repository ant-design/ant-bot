# Ant bot

## Development

```
$ npm install
$ mv env .env
$ npm run dev
```

## Deploy to now

```
$ now secret add github-token token
$ now -e NODE_ENV=production -e GITHUB_TOKEN=@github-token GITHUB_BOT_NAME=botname -n appname
```
