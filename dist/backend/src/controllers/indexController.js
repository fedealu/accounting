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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseController_1 = require("../base/baseController");
var balanceService_1 = __importDefault(require("../services/balanceService"));
var errors_1 = require("../errors/errors");
var IndexController = /** @class */ (function (_super) {
    __extends(IndexController, _super);
    function IndexController() {
        var _this = _super.call(this, "") || this;
        _this.registerMethods({
            type: baseController_1.HTTPMethodsAvailable.get,
            cb: [_this.getBalance()]
        });
        return _this;
    }
    IndexController.prototype.getBalance = function () {
        return function (req, res) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    res.locals.status = errors_1.Errors.status.success;
                    res.locals.response = {
                        success: true,
                        data: { currentBalance: balanceService_1.default.getCurrentBalance() }
                    };
                    resolve();
                }, global.defaultTransactionTime);
            });
        };
    };
    return IndexController;
}(baseController_1.BaseController));
exports.IndexController = IndexController;
//# sourceMappingURL=indexController.js.map