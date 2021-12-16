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
exports.CryptoFetcher = void 0;
var axios_1 = require("axios");
var CryptoController_1 = require("../../controller/CryptoController");
var cryptoExternalFetcher_interface_1 = require("../cryptoExternalFetcher.interface");
/**
 * @class CryptoFetcher - This class is used to fetch data from the external CoinGecko and AlphaVantage APIs.
 * This class implements the Singleton pattern, to get an instance, use the static getCryptoFetcher Method.
 */
var CryptoFetcher = /** @class */ (function () {
    function CryptoFetcher() {
        /**
         * @private
         * @property geckoAxiosInstance - The Axios instance configured with the base URL of the CoinGeko API. For API
         * documentation, see https://www.coingecko.com/en/api/documentation
         */
        this.geckoAxiosInstance = axios_1["default"].create({
            baseURL: 'https://api.coingecko.com/api/v3'
        });
        /**
         * @private
         * @property vantageAxiosInstance - The Axios instance configured the base URL of the AlphaVantage API. For API
         * documentation, see https://www.alphavantage.co/documentation/ , specifically the cryptocurrency section.
         */
        this.vantageAxiosInstance = axios_1["default"].create({
            baseURL: 'https://alphavantage.co/query',
            params: { apikey: 'B83DCMU1MIFATDG0' }
        });
    }
    /**
     * @method getCryptoFetcher() - Static getter for Singleton pattern
     */
    CryptoFetcher.getCryptoFetcher = function () {
        return this.cryptoFetcher;
    };
    /**
     * @method filldb() - Fill the database with the n most popular cryptocurrencies by market capitalisation
     * @param n
     */
    CryptoFetcher.prototype.filldb = function (n) {
        return __awaiter(this, void 0, void 0, function () {
            var cryptoResponse, cryptoData, i, crypto_1, cryptoController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.geckoAxiosInstance.get('/coins/markets', {
                            params: {
                                vs_currency: 'eur',
                                order: 'market_cap_desc',
                                per_page: 100,
                                page: 1,
                                sparkline: false
                            }
                        })];
                    case 1:
                        cryptoResponse = _a.sent();
                        if (!(cryptoResponse.status == 200)) return [3 /*break*/, 5];
                        cryptoData = cryptoResponse.data;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < n)) return [3 /*break*/, 5];
                        crypto_1 = cryptoData[i];
                        return [4 /*yield*/, CryptoController_1.CryptoController.getCryptoController()];
                    case 3:
                        cryptoController = _a.sent();
                        cryptoController.saveCrypto({
                            name: crypto_1.name,
                            symbol: crypto_1.symbol,
                            geckoID: crypto_1.id,
                            imageURL: crypto_1.image
                        })["catch"](console.log);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CryptoFetcher.prototype.getCryptoData = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var geckoResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCoinInformations({ geckoID: id })];
                    case 1:
                        geckoResponse = _b.sent();
                        return [2 /*return*/, {
                                currentPrice: geckoResponse.market_data.current_price.eur,
                                highestDailyPrice: geckoResponse.market_data.high_24h.eur,
                                id: geckoResponse.id,
                                lowestDailyPrice: geckoResponse.market_data.low_24h.eur,
                                name: geckoResponse.name,
                                openingPrice: geckoResponse.market_data.sparkline_7d.price[168 - 12],
                                symbol: geckoResponse.symbol,
                                imageURL: geckoResponse.image.large
                            }];
                }
            });
        });
    };
    CryptoFetcher.prototype.getHistoricData = function (_a) {
        var symbol = _a.symbol, period = _a.period, historyLength = _a.historyLength;
        return __awaiter(this, void 0, void 0, function () {
            var alphaRes, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = period;
                        switch (_b) {
                            case cryptoExternalFetcher_interface_1.Period.MINUTE: return [3 /*break*/, 1];
                            case cryptoExternalFetcher_interface_1.Period.HOURLY: return [3 /*break*/, 3];
                            case cryptoExternalFetcher_interface_1.Period.DAILY: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.getMinuteHistory({ symbol: symbol, full: historyLength > 100 })];
                    case 2:
                        alphaRes = _c.sent();
                        return [2 /*return*/, {
                                period: period,
                                historyLength: historyLength,
                                timezone: alphaRes['Meta Data']['9. Time Zone'],
                                history: Object.entries(alphaRes['Time Series Crypto (1min)']).map(function (minuteInfo) {
                                    return {
                                        openingDate: minuteInfo[0],
                                        opening: Number(minuteInfo[1]['1. open']),
                                        highest: Number(minuteInfo[1]['2. high']),
                                        lowest: Number(minuteInfo[1]['3. low']),
                                        closing: Number(minuteInfo[1]['4. close'])
                                    };
                                }).slice(-historyLength)
                            }];
                    case 3: return [4 /*yield*/, this.getHourlyHistory({ symbol: symbol, full: historyLength > 100 })];
                    case 4:
                        alphaRes = _c.sent();
                        return [2 /*return*/, {
                                period: period,
                                historyLength: historyLength,
                                timezone: alphaRes['Meta Data']['9. Time Zone'],
                                history: Object.entries(alphaRes['Time Series Crypto (60min)']).map(function (hourlyInfo) {
                                    return {
                                        openingDate: hourlyInfo[0],
                                        opening: Number(hourlyInfo[1]['1. open']),
                                        highest: Number(hourlyInfo[1]['2. high']),
                                        lowest: Number(hourlyInfo[1]['3. low']),
                                        closing: Number(hourlyInfo[1]['4. close'])
                                    };
                                }).splice(-historyLength)
                            }];
                    case 5: return [4 /*yield*/, this.getDailyHistory({ symbol: symbol })];
                    case 6:
                        alphaRes = _c.sent();
                        return [2 /*return*/, {
                                period: period,
                                historyLength: historyLength,
                                timezone: alphaRes['Meta Data']['7. Time Zone'],
                                history: Object.entries(alphaRes['Time Series (Digital Currency Daily)']).map(function (dailyInfo) {
                                    return {
                                        openingDate: dailyInfo[0],
                                        opening: Number(dailyInfo[1]['1a. open (EUR)']),
                                        highest: Number(dailyInfo[1]['2a. high (EUR)']),
                                        lowest: Number(dailyInfo[1]['3a. low (EUR)']),
                                        closing: Number(dailyInfo[1]['4a. close (EUR)'])
                                    };
                                })
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CryptoFetcher.prototype.getCoinInformations = function (_a) {
        var geckoID = _a.geckoID;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.geckoAxiosInstance.get("/coins/".concat(geckoID), {
                            params: {
                                localization: false,
                                market_data: true,
                                sparkline: true
                            }
                        })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    CryptoFetcher.prototype.getMinuteHistory = function (_a) {
        var symbol = _a.symbol, full = _a.full;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.vantageAxiosInstance.get('', { params: {
                                "function": 'CRYPTO_INTRADAY',
                                symbol: symbol.toUpperCase(),
                                market: 'EUR',
                                interval: '1min',
                                outputsize: full ? 'full' : undefined
                            } })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    CryptoFetcher.prototype.getHourlyHistory = function (_a) {
        var symbol = _a.symbol, full = _a.full;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.vantageAxiosInstance.get('', { params: {
                                "function": 'CRYPTO_INTRADAY',
                                symbol: symbol.toUpperCase(),
                                market: 'EUR',
                                interval: '60min',
                                outputsize: full ? 'full' : undefined
                            } })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    CryptoFetcher.prototype.getDailyHistory = function (_a) {
        var symbol = _a.symbol;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.vantageAxiosInstance.get('', { params: {
                                "function": 'DIGITAL_CURRENCY_DAILY',
                                symbol: symbol.toUpperCase(),
                                market: 'EUR'
                            } })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    CryptoFetcher.cryptoFetcher = new CryptoFetcher();
    return CryptoFetcher;
}());
exports.CryptoFetcher = CryptoFetcher;
