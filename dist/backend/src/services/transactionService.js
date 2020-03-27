"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transactionModel_1 = require("../models/transactionModel");
var transaction_db_1 = require("../../db/transaction.db");
var balanceService_1 = __importDefault(require("./balanceService"));
var errors_1 = require("../errors/errors");
var TransactionService = /** @class */ (function () {
    function TransactionService() {
    }
    TransactionService.prototype.initialTransaction = function (transaction) {
        balanceService_1.default.processTransaction(transaction);
        transaction.confirm();
        transaction_db_1.TransactionHistoryLog.push(transaction);
    };
    TransactionService.prototype.attemptTransaction = function (type, amount) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var transaction = new transactionModel_1.Transaction(amount, type);
            transaction_db_1.TransactionHistoryLog.push(transaction);
            if (!_this._validateTransactionTypeAndAmount(transaction, reject)) {
                return;
            }
            if (global.blockingTransactionInProgress &&
                global.blockingTransactionInProgress !== transaction.id) {
                transaction.fail("TRANSACTION_IN_PROGRESS");
                reject({
                    status: errors_1.Errors.status.transactionInProgress,
                    message: errors_1.Errors.message.TRANSACTION_IN_PROGRESS
                });
                return;
            }
            else {
                global.blockingTransactionInProgress = transaction.id;
            }
            setTimeout(function () {
                try {
                    balanceService_1.default.processTransaction(transaction);
                    transaction.confirm();
                    resolve(transaction);
                }
                catch (err) {
                    transaction.fail(err);
                    reject({ message: err });
                }
            }, global.defaultTransactionTime);
        });
    };
    TransactionService.prototype.areTransactionsEnabledAsMiddleware = function () {
        return function (req, res, next) {
            global.blockingTransactionInProgress
                ? next({ status: errors_1.Errors.status.TRANSACTION_IN_PROGRESS })
                : next();
        };
    };
    TransactionService.prototype._validateTransactionTypeAndAmount = function (transaction, reject) {
        if ((transaction.type !== "credit" && transaction.type !== "debit") ||
            transaction.amount < 0) {
            transaction.fail("WRONG_PARAMETERS");
            reject({
                status: errors_1.Errors.status.wrongParameters,
                message: errors_1.Errors.message.WRONG_PARAMETERS
            });
            return false;
        }
        return true;
    };
    return TransactionService;
}());
exports.default = new TransactionService();
//# sourceMappingURL=transactionService.js.map