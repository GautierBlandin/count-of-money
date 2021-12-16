"use strict";
exports.__esModule = true;
var express_1 = require("express");
var CryptoRouter_1 = require("./api/Crypto/CryptoRouter");
var app = (0, express_1["default"])();
var port = 8079;
app.use(express_1["default"].urlencoded());
//USER MANAGEMENT
app.post('/users/register', function (req, res) {
    res.send('placeholder');
});
app.post('/users/login', function (req, res) {
    res.send('placeholder');
});
app.get('/users/auth', function (req, res) {
    res.send('placeholder');
});
app.post('/users/logout', function (req, res) {
    res.send('placeholder');
});
app.get('/users/profile', function (req, res) {
    res.send('placeholder');
});
app.put('/users/profile', function (req, res) {
    res.send('placeholder');
});
//CRYPTOS MANAGEMENT
app.use('', CryptoRouter_1.cryptoRouter);
//PRESS MANAGEMENT
app.get('/articles', function (req, res) {
    res.send('placeholder');
});
app.get('/articles/:id', function (req, res) {
    res.send('placeholder');
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
