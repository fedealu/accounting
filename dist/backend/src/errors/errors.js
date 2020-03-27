"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = {
    status: {
        success: 200,
        badRequest: 400,
        insufficientFunds: 406,
        serverError: 500,
        transactionInProgress: 403,
        wrongParameters: 400
    },
    message: {
        INSUFFICIENT_FUNDS: 'No enough money in your account to perform such action.',
        INVALID_PARAMS: 'Insufficient information to accomplish your request.',
        WRONG_PARAMETERS: "You've sent incorrect information. Therefore your request could not be accomplish.",
        TRANSACTION_IN_PROGRESS: 'There is currently a transaction in progress. Please retry later.'
    }
};
//# sourceMappingURL=errors.js.map