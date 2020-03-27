"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors/errors");
var balanceService_1 = __importDefault(require("../services/balanceService"));
var hash = require("object-hash");
var ETransactionType;
(function (ETransactionType) {
    ETransactionType["debit"] = "debit";
    ETransactionType["credit"] = "credit";
})(ETransactionType = exports.ETransactionType || (exports.ETransactionType = {}));
var ETransactionState;
(function (ETransactionState) {
    ETransactionState["pending"] = "pending";
    ETransactionState["confirmed"] = "confirmed";
    ETransactionState["failed"] = "failed";
})(ETransactionState = exports.ETransactionState || (exports.ETransactionState = {}));
var Transaction = /** @class */ (function () {
    function Transaction(amount, type, message) {
        this.finalBalance = 0;
        this.type = type;
        this.amount = this.type === ETransactionType.credit ? amount : -amount;
        this.effectiveDate = new Date().getTime();
        this.id = hash("" + this.amount + this.type + this.effectiveDate);
        this.state = ETransactionState.pending;
        if (message) {
            this.message = message;
        }
        this.initialBalance = balanceService_1.default.getCurrentBalance();
    }
    Transaction.prototype.confirm = function () {
        this.state = ETransactionState.confirmed;
        this.finalBalance = balanceService_1.default.getCurrentBalance();
    };
    Transaction.prototype.fail = function (messageId) {
        this.state = ETransactionState.failed;
        this.message = errors_1.Errors.message[messageId];
        this.finalBalance = balanceService_1.default.getCurrentBalance();
    };
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=transactionModel.js.map