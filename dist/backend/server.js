"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./src/app"));
var bodyParser = __importStar(require("body-parser"));
var transactionController_1 = require("./src/controllers/transactionController");
var indexController_1 = require("./src/controllers/indexController");
require('dotenv').config({ path: __dirname + '/.env' });
global.initialBalance = +(process.env.INITIAL_BALANCE || 0) < 0 ? 0 : +(process.env.INITIAL_BALANCE || 0);
global.defaultTransactionTime = +(process.env.DEFAULT_TRANSACTION_TIME || 0);
global.blockingTransactionInProgress = null;
var apiPrefix = "/" + process.env.API_PREFIX + "/" + process.env.API_VERSION;
var app = new app_1.default({
    port: 4000,
    apiPrefix: apiPrefix,
    controllers: [transactionController_1.TransactionController, indexController_1.IndexController],
    middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })]
});
app.listen();
//# sourceMappingURL=server.js.map