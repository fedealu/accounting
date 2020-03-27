"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BalanceService = /** @class */ (function () {
    function BalanceService() {
        this.currentBalance = 0;
    }
    BalanceService.prototype.getCurrentBalance = function () {
        return this.currentBalance;
    };
    BalanceService.prototype.processTransaction = function (transaction) {
        if (this.dryProcessTransaction(transaction) >= 0) {
            this.commitTransaction(transaction);
        }
        else {
            throw "INSUFFICIENT_FUNDS";
        }
    };
    BalanceService.prototype.commitTransaction = function (transaction) {
        this.currentBalance += transaction.amount;
    };
    BalanceService.prototype.dryProcessTransaction = function (transaction) {
        try {
            return this.currentBalance + transaction.amount;
        }
        catch (err) {
            return -1;
        }
    };
    return BalanceService;
}());
exports.default = new BalanceService();
//# sourceMappingURL=balanceService.js.map