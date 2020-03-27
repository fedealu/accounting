"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors/errors");
function validateRequiredParams(paramsToValidate) {
    return function (req, res, next) {
        var paramsAreValid = paramsToValidate.every(function (param) { return req.body[param] || req.params[param] || req.query[param]; });
        paramsAreValid
            ? next()
            : next({
                status: errors_1.Errors.status.badRequest,
                message: errors_1.Errors.message.INVALID_PARAMS
            });
    };
}
exports.validateRequiredParams = validateRequiredParams;
//# sourceMappingURL=utils.js.map