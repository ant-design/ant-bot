# Ant bot

## Development

```
$ yarn
$ mv env .env
$ yarn dev
```

## Deploy to now

```
$ now secret add github-token token
$ now -e NODE_ENV=production -e GITHUB_TOKEN=@github-token -e GITHUB_BOT_NAME=ant-design-bot -n ant-design-bot
```
