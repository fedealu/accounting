# Fiverr2.0

## Project's main dependencies

This project is built using:

- NodeJS / NPM
- Typescript
- React
- Webpack
- Git

## Project considerations

- The initial user amount is `1000` by **default**. As soon as you log in with your name, you will be watching at an initial transaction that loads this amount. This value is configurable in `backend/.env` by setting `INITIAL_BALANCE` variable to the number of your choosing. If, you were to set this value to a negative number, then the balance would be set to 0.

- By default the backend will take a `DEFAULT_TRANSACTION_TIME` (also configurable in `backend/.env`) to reply. Since this project does not use a proper database, the transactions would happen really fast and, features as the blocking transactions wouldn't be possible to test.

## Available routes

_All API routes are preceded by a `/api/v1` string._

- GET /api/v1: will return the current account balance.
- GET /api/v1/transactions: will return the transaction history.
- GET /api/v1/transactions/:id: will return the transaction with `:id` in history if existant.
- POST /api/v1/transaction: expects a `type` of values ('debit' | 'credit') and an `amount` of type number > 0.

## Available commands

_For more information on the comands you can always check each of the package.json in the project._

- `npm run start`: Starts both the back end and the front end concurrently. This command will compile typescript, so if it fails, the build will fail.
- `npm run build`: Will generate the build versions for both the back end and the front end.
- `start-front` / `start-back`: will start either the back end or the front end, as defined in start-`{project}`
- `build-front` / `build-back`: will build either the back end or the front end, as defined in build-`{project}`

## What to do after build?

### After building the backend

Start the `server.js` file in `/dist/backend/server.js` as a Node process with `node /dist/backend/server.js`. This will start the back end.

### After building the front end

You need to copy/paste the entire structure inside `/dist/frontend/` to the location in which you have your server running.

## Ready to code?

### What do you need to get started?

- A NodeJS version >= 13. We do not guarantee the project will work as expected with lower versions of NodeJS.
- NPM version >= 6.
- GIT, ideally a version over 2.2

### Step by step to get your project running

1. Git clone this repo to the folder desired
2. Install dependencies by running `npm install` or `npm i` in the root folder of your choosing. This will install all the dependencies for both the back end and the front end.
3. Run `npm start` or `npm run start` in the root's project folder so both the backend and the frontend start. This command will start a dev server to serve the front end app and will start the NodeJS app in the back end.

After running the previous command you will get a chrome window open in `localhost:5000`. If, for any reasons, this window closes, you can always open a new one with the same address and you will get the site.

This project takes advantages of Webpack's **hot reload** so you dont need to recompile or do anything after any changes in your project, it should, automatically refresh you window.

## VSCode environment and suggested extensions

- **TSLint**: this tool checks the code for readability and standards across all of the app using the `tsconfig.json` and `tslint.json` files in each of the project's main directories.
- **Javascript code snippets**: althought this is not a javascript project, any code snippet for javascript is a good starting point. It will help you with the possible methods allowed for each specific type of object, as typescript does too.
- **ES7 React/Redux/GraphQL/React-native snippets**: this will help with the react-specific code.
- **GitLens**: This extension will help you understand the history of the changes like when, and why that line was modified.
