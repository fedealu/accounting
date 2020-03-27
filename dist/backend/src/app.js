"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var responseHandler_1 = require("./handlers/responseHandler");
var transactionModel_1 = require("./models/transactionModel");
var transactionService_1 = __importDefault(require("./services/transactionService"));
var cors = require("cors");
var bodyParser = require("body-parser");
var App = /** @class */ (function () {
    function App(appConfig) {
        this.controllers = [];
        this.app = express_1.default();
        this.port = appConfig.port;
        this.apiPrefix = appConfig.apiPrefix;
        this.responseHandler = new responseHandler_1.ResponseHandler();
        this.initApp(appConfig);
    }
    App.prototype.initApp = function (config) {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json()); // parse application/json
        this.loadMiddlewares(config.middlewares);
        this.loadControllers(config.controllers);
        this.initUserBalance();
        this.setResponseHandlers();
    };
    App.prototype.initUserBalance = function () {
        transactionService_1.default.initialTransaction(new transactionModel_1.Transaction(Number(global.initialBalance), transactionModel_1.ETransactionType.credit, "INITIAL TRANSACTION - Modify this in .env file"));
    };
    App.prototype.loadMiddlewares = function (middlewares) {
        var _this = this;
        middlewares.forEach(function (middleware) {
            _this.app.use(middleware);
        });
    };
    App.prototype.loadControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            var controllerInstance = new controller();
            _this.controllers.push(controllerInstance);
            _this.app.use(controllerInstance.getBaseRoute(_this.apiPrefix), controllerInstance.router);
        });
    };
    App.prototype.setResponseHandlers = function () {
        this.app.use("*", this.responseHandler.handleResponse());
        this.app.use(this.responseHandler.handleErrorResponse());
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on the http://localhost:" + _this.port); //tslint:disable-line
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map