# Ant bot

## Development

```
$ yarn
$ cp env .env
$ yarn dev
```

## Deploy to now

```
$ now secret add github-token token
$ now secret add github-secret-token secre_token
$ now -e NODE_ENV=production -e GITHUB_TOKEN=@github-token -e GITHUB_SECRET_TOKEN=@github-secret-token -e GITHUB_BOT_NAME=ant-design-bot -n ant-design-bot
```
