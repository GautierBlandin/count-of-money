import express from 'express';
import dotenv from 'dotenv';
import {cryptoRouter} from "./api/Crypto/CryptoRouter";
import {AuthRouter} from "./api/Authentication/AuthRouter";
import cors from 'cors';
import {createConnection} from "typeorm";
import {CryptoCurrency} from "./entity/CryptoCurrency";
import {User} from "./entity/User";

const app = express();
const port = 8079;

app.use(express.urlencoded())
app.use(cors());

//CRYPTOS MANAGEMENT
app.use('', cryptoRouter);

//AUTHENTICATION
app.use('/users', AuthRouter);

//PRESS MANAGEMENT
app.get('/articles',(req, res) => {
  res.send('placeholder');
});

app.get('/articles/:id',(req, res) => {
  res.send('placeholder');
});

createConnection({
  "type": "postgres",
  "host": "localhost",
  "port": 8000,
  "username": "postgres",
  "password": "postgres",
  "database": "postgres",
  "synchronize": true,
  "migrationsRun": false,
  "logging": false,
  "entities": [
    CryptoCurrency,
    User
  ],
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
