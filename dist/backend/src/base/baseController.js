"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var HTTPMethodsAvailable;
(function (HTTPMethodsAvailable) {
    HTTPMethodsAvailable["get"] = "get";
    HTTPMethodsAvailable["post"] = "post";
})(HTTPMethodsAvailable = exports.HTTPMethodsAvailable || (exports.HTTPMethodsAvailable = {}));
var BaseController = /** @class */ (function () {
    function BaseController(route, usePrefix) {
        if (usePrefix === void 0) { usePrefix = true; }
        this.route = route;
        this.usePrefix = usePrefix;
        this.router = express_1.default.Router();
    }
    BaseController.prototype.getBaseRoute = function (apiPrefix) {
        return this.usePrefix ? apiPrefix + "/" + this.route : this.route;
    };
    BaseController.prototype.registerMethods = function (methodsToRegister) {
        var _this = this;
        Array.isArray(methodsToRegister)
            ? methodsToRegister.forEach(function (method) { return _this.registerMethod(method); })
            : this.registerMethod(methodsToRegister);
    };
    BaseController.prototype.registerMethod = function (method) {
        var _a;
        var _this = this;
        (_a = this.router)[method.type].apply(_a, __spreadArrays(["" + (method.params ? "/" + this.parseRouteArgs(method.params) : "")], method.cb.map(function (cb, i, arr) {
            return i === arr.length - 1 ? _this.wrapWithResponseHandler(cb) : cb;
        })));
    };
    BaseController.prototype.wrapWithResponseHandler = function (cb) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, cb(req, res)];
                    case 1:
                        _a.sent();
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.locals.status = err_1.status;
                        res.locals.response = err_1.message;
                        next();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    BaseController.prototype.parseRouteArgs = function (params) {
        return params.map(function (param) { return ":" + param; }).join("/");
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=baseController.js.map