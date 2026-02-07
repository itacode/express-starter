# express-starter

Basic scaffold to start a TypeScript Express.js microservice.

## Platform and Environment Variables

### Platform

**Platform** is a way to specify an environment file to be loaded by `dotenv`.
The application determines the configuration profile by checking variables in this order:

1. `PLATFORM`
2. `NODE_ENV`
3. Default: `production`

For example, if you run `npm run dev` (which sets `NODE_ENV=development`), `.env.development` will be loaded automatically. You can override this by setting `PLATFORM` explicitly (e.g., `PLATFORM=staging`).

### Environment Variables

You can specify env variables by placing the following files in your project root:

```shell
.env.[platform].local # only loaded in specified platform, ignored by git
.env.[platform]       # only loaded in specified platform
.env.local            # loaded in all cases but not test, ignored by git
.env                  # loaded in all cases
```

#### Env Loading Priorities

An env file for a specific platform (e.g. .env.production) will take higher priority than a generic one (e.g. .env).  
This [convention](https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use) has been adopted.

## Features

- Express.js
- TypeScript
- EJS template
- API router
- Environment variables configuration
- Pino HTTP logger
- Pino logger
- Dotenv
- Crossenv
- Nodemon
- ESLint
- Jest testing framework
- Docker

## Installation

```shell
npm install
```

## Development

Start the development server with automatic reload.

```shell
npm run dev
```

## Production

```shell
npm run build
npm start
```

## Docker

Start

```shell
docker compose up -d --build
```

Stop

```shell
docker compose down
```
