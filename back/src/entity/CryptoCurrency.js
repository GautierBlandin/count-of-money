"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CryptoCurrency = void 0;
var typeorm_1 = require("typeorm");
/**
 * @class CryptoCurrency - A class to represent a CryptoCurrency in db
 * @property uuid - The generated unique identifier for a crypto
 * @property name - The name of the cryptocurrency
 * @property symbol - The symbol representing the cryptocurrency, useful for querying the AlphaVatange API
 * @property geckoID - The coinGecko ID of the cryptocurrency, useful for qerying the CoinGecko API
 * @property imageURL - The Image URL of cryptocurrency's logo
 */
var CryptoCurrency = /** @class */ (function () {
    function CryptoCurrency() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], CryptoCurrency.prototype, "uuid");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], CryptoCurrency.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], CryptoCurrency.prototype, "symbol");
    __decorate([
        (0, typeorm_1.Column)()
    ], CryptoCurrency.prototype, "imageURL");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], CryptoCurrency.prototype, "geckoID");
    CryptoCurrency = __decorate([
        (0, typeorm_1.Entity)()
    ], CryptoCurrency);
    return CryptoCurrency;
}());
exports.CryptoCurrency = CryptoCurrency;
