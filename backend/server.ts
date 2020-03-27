import App from './src/app';
import * as bodyParser from 'body-parser';
import { TransactionController } from './src/controllers/transactionController';
import { IndexController } from './src/controllers/indexController';
require('dotenv').config({ path: __dirname + '/.env' });

declare global {
  namespace NodeJS {
    interface Global {
      initialBalance: number;
      blockingTransactionInProgress: string | null;
      defaultTransactionTime: number;
    }
  }
}

global.initialBalance = +(process.env.INITIAL_BALANCE || 0) < 0 ? 0 : +(process.env.INITIAL_BALANCE || 0);
global.defaultTransactionTime = +(process.env.DEFAULT_TRANSACTION_TIME || 0);
global.blockingTransactionInProgress = null;

const apiPrefix = `/${process.env.API_PREFIX}/${process.env.API_VERSION}`;

const app = new App({
  port: 4000,
  apiPrefix,
  controllers: [TransactionController, IndexController],
  middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })]
});

app.listen();
