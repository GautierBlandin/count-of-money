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
exports.cryptoRouter = void 0;
var express_1 = require("express");
var CryptoController_1 = require("../../controller/CryptoController");
var Fetcher_1 = require("../../CryptoExternalAPIs/CryptoDataFetcher/Fetcher");
var cryptoExternalFetcher_interface_1 = require("../../CryptoExternalAPIs/cryptoExternalFetcher.interface");
exports.cryptoRouter = express_1["default"].Router();
/**
 * Route used to get a information about a specific cryptocurrency
 * @function
 * @param path - Express path
 * @param handler - HTTP request handler
 */
exports.cryptoRouter.get('/cryptos/:symbol', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, crypto, geckoRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CryptoController_1.CryptoController.getCryptoController()];
            case 1:
                controller = _a.sent();
                return [4 /*yield*/, controller.getCrypto({ symbol: req.params.symbol })];
            case 2:
                crypto = _a.sent();
                if (!crypto) {
                    res.status(404);
                    res.send('Coin not found');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Fetcher_1.CryptoFetcher.getCryptoFetcher().getCryptoData({ id: crypto.geckoID, symbol: crypto.symbol })["catch"](function (err) {
                        res.status(500);
                        res.statusMessage = "Error while fetching from the CoinGeckoAPI";
                        res.send('Request failed');
                    })];
            case 3:
                geckoRes = _a.sent();
                if (!geckoRes)
                    return [2 /*return*/];
                // Send the response
                res.json(geckoRes);
                return [2 /*return*/];
        }
    });
}); });
/**
 * @function GET Cryptos
 * @param cmids - cmids are the ids of the crypto currencies the client wants to fetch from the databse.
 * The format is an array of cmids, and should be represented as such : cryptos?cmid[]=id_1&cmid[]=id_2 ...
 */
exports.cryptoRouter.get('/cryptos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cmids, controller, cryptos, cryptosGeckoInformations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.query.cmids) {
                    cmids = req.query.cmids;
                }
                else {
                    res.status(400);
                    res.statusMessage = "Incorrect format of cmids";
                    res.send('Incorrect format of cmids');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, CryptoController_1.CryptoController.getCryptoController()];
            case 1:
                controller = _a.sent();
                return [4 /*yield*/, Promise.all(cmids.map(function (id) { return controller.getCrypto({ symbol: id }); }))];
            case 2:
                cryptos = _a.sent();
                return [4 /*yield*/, Promise.all(cryptos.filter(function (crypto) {
                        return crypto !== undefined;
                    }).map(function (crypto) {
                        return Fetcher_1.CryptoFetcher.getCryptoFetcher().getCryptoData({ id: crypto.geckoID, symbol: crypto.symbol });
                    }))];
            case 3:
                cryptosGeckoInformations = _a.sent();
                // Send the request back with status 200
                res.status(200);
                res.json({
                    cryptos: cryptosGeckoInformations
                });
                return [2 /*return*/];
        }
    });
}); });
/**
 * @function POST cryptos
 * @param id: The id corresponsding to geckoCoin's coin id
 * @param symbol: The crypto currency's symbol
 */
exports.cryptoRouter.post('/cryptos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var geckoCoinInformations, controller, cryptoEntity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                if (!req.body) {
                    res.status(400);
                    res.send('Error: invalid request format, must be : {id: string, symbol: string}');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Fetcher_1.CryptoFetcher.getCryptoFetcher().getCryptoData(req.body)["catch"](function () {
                        res.status(400);
                        res.send('Invalid gecko coin ID');
                    })];
            case 1:
                geckoCoinInformations = _a.sent();
                if (!geckoCoinInformations)
                    return [2 /*return*/];
                return [4 /*yield*/, CryptoController_1.CryptoController.getCryptoController()];
            case 2:
                controller = _a.sent();
                return [4 /*yield*/, controller.saveCrypto({
                        geckoID: geckoCoinInformations.id,
                        imageURL: geckoCoinInformations.imageURL,
                        name: geckoCoinInformations.name,
                        symbol: geckoCoinInformations.symbol
                    })["catch"](function (err) {
                        console.log(err);
                        res.status(500);
                        res.send('Failed to create cryptocurrency');
                    })];
            case 3:
                cryptoEntity = _a.sent();
                res.status(201);
                res.json(cryptoEntity);
                return [2 /*return*/];
        }
    });
}); });
/**
 * @function DELETE crypto
 * @param The crypto's id
 */
exports.cryptoRouter["delete"]('/cryptos/:cmid', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CryptoController_1.CryptoController.getCryptoController()];
            case 1:
                controller = _a.sent();
                return [4 /*yield*/, controller.deleteCrypto({ symbol: req.params.cmid })["catch"](function (err) {
                        console.log(err);
                        res.status(500);
                        res.send('Could not delete cryptocurrency');
                    })];
            case 2:
                _a.sent();
                res.status(202);
                res.send("If it existed, deleted cryptocurrency with symbol ".concat(req.params.cmid));
                return [2 /*return*/];
        }
    });
}); });
exports.cryptoRouter.get('/cryptos/:symbol/history/:period', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fetcher, realTimeData, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                fetcher = Fetcher_1.CryptoFetcher.getCryptoFetcher();
                _a = req.params.period;
                switch (_a) {
                    case 'daily': return [3 /*break*/, 1];
                    case 'hourly': return [3 /*break*/, 3];
                    case 'minute': return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 1: return [4 /*yield*/, fetcher.getHistoricData({ symbol: req.params.symbol, period: cryptoExternalFetcher_interface_1.Period.DAILY, historyLength: 60 })["catch"](function (err) {
                    console.log(err);
                    res.status(400);
                    res.send('Invalid cryptocurrency symbol');
                })];
            case 2:
                realTimeData = _b.sent();
                if (!realTimeData)
                    return [2 /*return*/];
                res.status(200);
                res.json(realTimeData);
                return [3 /*break*/, 8];
            case 3: return [4 /*yield*/, fetcher.getHistoricData({ symbol: req.params.symbol, period: cryptoExternalFetcher_interface_1.Period.HOURLY, historyLength: 48 })["catch"](function (err) {
                    console.log(err);
                    res.status(400);
                    res.send('Invalid cryptocurrency symbol');
                })];
            case 4:
                realTimeData = _b.sent();
                if (!realTimeData)
                    return [2 /*return*/];
                res.status(200);
                res.json(realTimeData);
                return [3 /*break*/, 8];
            case 5: return [4 /*yield*/, fetcher.getHistoricData({ symbol: req.params.symbol, period: cryptoExternalFetcher_interface_1.Period.MINUTE, historyLength: 120 })["catch"](function (err) {
                    console.log(err);
                    res.status(400);
                    res.send('Invalid cryptocurrency symbol');
                })];
            case 6:
                realTimeData = _b.sent();
                if (!realTimeData)
                    return [2 /*return*/];
                res.status(200);
                res.json(realTimeData);
                return [3 /*break*/, 8];
            case 7:
                res.status(400);
                res.send('Invalid time period format, available : minute, hourly, daily');
                return [2 /*return*/];
            case 8: return [2 /*return*/];
        }
    });
}); });
