"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors/errors");
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler() {
    }
    ResponseHandler.prototype.handleResponse = function () {
        var _this = this;
        return function (req, res) {
            if (global.blockingTransactionInProgress) {
                _this.unblockTransactions();
            }
            res
                .status(res.locals.status || errors_1.Errors.status.success)
                .send(res.locals.response);
        };
    };
    ResponseHandler.prototype.handleErrorResponse = function () {
        return function (err, req, res) {
            console.log("From Error Handler", err);
            res.status(err.status || errors_1.Errors.status.serverError).send(err.message);
        };
    };
    ResponseHandler.prototype.unblockTransactions = function () {
        global.blockingTransactionInProgress = null;
    };
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=responseHandler.js.map