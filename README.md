# express-starter
Basic scaffold to start an expressjs project

## Features
- Expressjs
- EJS template
- API router
- Environment variables configuration
- Winston logger
- Output logs to a file, with daily rotation
- Crossenv
- Nodemon
- ESLint
- Jest testing framework

The basic environment configuration is applied by the module `config`, through merging variables defined in the files inside `.env` directory with node environment ones.
- If `NODE_ENV` is undefined or equal to `"production"` then `.env-production.js` is used in merging and `NODE_ENV` is set to `"production"`
- If `NODE_ENV` is equal to `"development"` then `.env-production.js` is used in merging and `NODE_ENV` is set to  `"development"`

It is possible to add configuration by simply defining new properties on the configuration objects exported by the `.env` modules.

**Important:** remember to **uncomment out** `# .env/` line (→ `.env/`) in `.gitignore` file before the first commit, otherwise the secrets in the environment variables will be published in the repository.

To start developing with automatic restarting of the server, execute `npm dev`.
