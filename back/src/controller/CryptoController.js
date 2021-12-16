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
exports.CryptoController = void 0;
var CryptoCurrency_1 = require("../entity/CryptoCurrency");
var connection_1 = require("../db/connection");
/**
 * @class CryptoController - Manage CryptoCurrencies in the db.
 */
var CryptoController = /** @class */ (function () {
    /**
     * @private
     * @constructor - Create a new cryptocontroller, private for async call in controller creation
     */
    function CryptoController() {
    }
    /**
     * @static
     * @method getCryptoController() - Get the global instance of CryptoController
     */
    CryptoController.getCryptoController = function () {
        return __awaiter(this, void 0, void 0, function () {
            var controller, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new CryptoController();
                        return [4 /*yield*/, connection_1.DbConn.getConn()];
                    case 1:
                        connection = _a.sent();
                        controller.cr = connection.getRepository(CryptoCurrency_1.CryptoCurrency);
                        return [2 /*return*/, controller];
                }
            });
        });
    };
    /**
     * @method getCrypto - Get the first crypto matching the constraint of the req object.
     * @param req
     */
    CryptoController.prototype.getCrypto = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cr.findOne({ where: req })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @method saveCrypto() - Save a CryptoCurrency in the database
     * @param req
     */
    CryptoController.prototype.saveCrypto = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var cryptoCurency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cryptoCurency = new CryptoCurrency_1.CryptoCurrency();
                        if (req.name)
                            cryptoCurency.name = req.name;
                        if (req.imageURL)
                            cryptoCurency.imageURL = req.imageURL;
                        if (req.symbol)
                            cryptoCurency.symbol = req.symbol;
                        if (req.geckoID)
                            cryptoCurency.geckoID = req.geckoID;
                        return [4 /*yield*/, this.cr.save(cryptoCurency)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @method updateCrypto() - Updates a CryptoCurrency in the database
     * @param req - A request to update a Crypto
     */
    CryptoController.prototype.updateCrypto = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var crypto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cr.findOne({ uuid: req.uuid })];
                    case 1:
                        crypto = (_a.sent());
                        //Update the field in they are present
                        if (req.name)
                            crypto.name = req.name;
                        if (req.imageURL)
                            crypto.imageURL = req.imageURL;
                        if (req.symbol)
                            crypto.symbol = req.symbol;
                        if (req.geckoID)
                            crypto.geckoID = req.geckoID;
                        return [4 /*yield*/, this.cr.save(crypto)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @method deleteCrypto() - Deletes a CryptoCurrency in the database
     * @param req
     */
    CryptoController.prototype.deleteCrypto = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cr["delete"](req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CryptoController;
}());
exports.CryptoController = CryptoController;
