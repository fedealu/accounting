"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseController_1 = require("../base/baseController");
var transaction_db_1 = require("../../db/transaction.db");
var utils_1 = require("../utils/utils");
var transactionService_1 = __importDefault(require("../services/transactionService"));
var errors_1 = require("../errors/errors");
var balanceService_1 = __importDefault(require("../services/balanceService"));
var TransactionController = /** @class */ (function (_super) {
    __extends(TransactionController, _super);
    function TransactionController() {
        var _this = _super.call(this, "transactions") || this;
        _this.registerMethods([
            { type: baseController_1.HTTPMethodsAvailable.get, cb: [_this.list()] },
            { type: baseController_1.HTTPMethodsAvailable.get, cb: [_this.listId()], params: ["id"] },
            {
                type: baseController_1.HTTPMethodsAvailable.post,
                cb: [utils_1.validateRequiredParams(["amount", "type"]), _this.create()]
            }
        ]);
        return _this;
    }
    TransactionController.prototype.list = function () {
        return function (req, res) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    res.locals.status = errors_1.Errors.status.success;
                    res.locals.response = {
                        success: true,
                        data: {
                            transactions: transaction_db_1.TransactionHistoryLog
                        }
                    };
                    resolve();
                }, global.defaultTransactionTime);
            });
        };
    };
    TransactionController.prototype.listId = function () {
        return function (req, res) {
            res.locals.status = errors_1.Errors.status.success;
            res.locals.response = {
                success: true,
                data: {
                    transaction: transaction_db_1.TransactionHistoryLog.filter(function (t) { return t.id === req.params.id; }).reduce(function (acc, curr) { return (acc = __assign({}, curr)); }, {})
                }
            };
        };
    };
    TransactionController.prototype.create = function () {
        return function (req, res) {
            try {
                return transactionService_1.default.attemptTransaction(req.body.type, req.body.amount)
                    .then(function (transaction) {
                    res.locals.status = errors_1.Errors.status.success;
                    res.locals.response = {
                        success: true,
                        data: {
                            transaction: transaction,
                            currentBalance: balanceService_1.default.getCurrentBalance()
                        }
                    };
                })
                    .catch(function (err) {
                    res.locals.status = err.status;
                    res.locals.response = {
                        success: false,
                        data: {
                            currentBalance: balanceService_1.default.getCurrentBalance(),
                            message: err.message
                        }
                    };
                });
            }
            catch (err) {
                res.locals.status = errors_1.Errors.status.serverError;
                res.locals.response = {
                    success: false,
                    data: {
                        currentBalance: balanceService_1.default.getCurrentBalance(),
                        message: err.message
                    }
                };
                return Promise.reject();
            }
        };
    };
    return TransactionController;
}(baseController_1.BaseController));
exports.TransactionController = TransactionController;
//# sourceMappingURL=transactionController.js.map