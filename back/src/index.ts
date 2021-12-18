import express from 'express';
import dotenv from 'dotenv';
import {cryptoRouter} from "./api/Crypto/CryptoRouter";
import {AuthRouter} from "./api/Authentication/AuthRouter";
import {ProfileRouter} from "./api/Profile/ProfileRouter";
import cors from 'cors';
import {createConnection} from "typeorm";


const app = express();
const port = 8079;

app.use(express.urlencoded())
app.use(express.json())
app.use(cors());

//CRYPTOS MANAGEMENT
app.use('', cryptoRouter);

//AUTHENTICATION
app.use('/users', AuthRouter);

// PROFILE
app.use('/users', ProfileRouter);

//PRESS MANAGEMENT
app.get('/articles',(req, res) => {
  res.send('placeholder');
});

app.get('/articles/:id',(req, res) => {
  res.send('placeholder');
});

createConnection();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
