import express from 'express';
import {CryptoController} from "../../controller/CryptoController";
import {CryptoCurrency} from "../../entity/CryptoCurrency";
import {CryptoFetcher} from "../../CryptoExternalAPIs/CryptoDataFetcher/fetcher";
import {GetCryptoResponse} from "./Interface";

export const cryptoRouter = express.Router();

cryptoRouter.get('/coin/:symbol', async (req, res) => {
  const controller = await CryptoController.getCryptoController()
  let crypto = await controller.getCrypto({symbol: req.params.symbol});
  if ( !crypto ){
    res.status(404);
    res.send('Coin not found')
    return
  }
  let geckoRes = await CryptoFetcher.getCryptoFetcher().getCoinInformations({geckoID: crypto.geckoID}).catch((err) => {
    res.status(500);
    res.statusMessage = "Error while fetching from the CoinGeckoAPI"
    res.send('Request failed')
  })

  if (!geckoRes) return;

  const responseBody: GetCryptoResponse = {
    currentPrice: geckoRes.market_data.current_price.eur,
    highestDailyPrice: geckoRes.market_data.high_24h.eur,
    imageURL: geckoRes.image.large,
    lowestDailyPrice: geckoRes.market_data.low_24h.eur,
    name: geckoRes.name,
    openingPrice: geckoRes.market_data.sparkline_7d.price[167-12],
  }

  res.json(responseBody)
})

// what i am trying to do right now is the get working routes on my API.
// what does this translate into ?
// the process is : receive get request with crypto uuid. fetch crypto from the database with the given uuid.
// request coin gecko with the coin gecko id. translate the coin gecko response into a getcryptoresponse
// send the getcryptoresponse