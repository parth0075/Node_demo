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
exports.__esModule = true;
exports.UserController = void 0;
var UserModel_1 = require("../Models/UserModel");
var NodeMailer_1 = require("../utils/NodeMailer");
var Utils_1 = require("../utils/Utils");
var Bcrypt = require("bcrypt");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.signup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var username, email, password, verificationToken, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = req.body.username;
                        email = req.body.email;
                        password = req.body.password;
                        verificationToken = Utils_1.Utils.generateVerificationToken();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Bcrypt.hash(password, 10, (function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                                var data, user;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (err) {
                                                next(err);
                                                return [2 /*return*/];
                                            }
                                            data = {
                                                username: username,
                                                email: email,
                                                password: hash,
                                                verification_token: verificationToken,
                                                verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME
                                            };
                                            return [4 /*yield*/, new UserModel_1["default"](data).save()];
                                        case 1:
                                            user = _a.sent();
                                            res.send(user);
                                            return [4 /*yield*/, NodeMailer_1.NodeMailer.sendEMail({
                                                    to: ['parth.b@peerbits.com'],
                                                    subject: 'email verification',
                                                    html: "<h1>" + verificationToken + "</h1>"
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.verify = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, verificationToken, user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        verificationToken = req.body.verification_token;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                email: email,
                                verification_token: verificationToken,
                                verification_token_time: { $gt: Date.now() }
                            }, { verified: true }, { "new": true })];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            res.send(user);
                        }
                        else {
                            throw new Error('verification time is expired please request for new one!');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        next(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.resendVerificationToken = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, verificationToken, user, mailer, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.query.email;
                        verificationToken = Utils_1.Utils.generateVerificationToken();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({ email: email }, {
                                verification_token: verificationToken,
                                verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, NodeMailer_1.NodeMailer.sendEMail({
                                to: ['parth.b@peerbits.com'],
                                subject: 'email verification',
                                html: "<h1>" + verificationToken + "</h1>"
                            })];
                    case 3:
                        mailer = _a.sent();
                        res.json({
                            success: true
                        });
                        return [3 /*break*/, 5];
                    case 4: throw new Error('user does not exist');
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
