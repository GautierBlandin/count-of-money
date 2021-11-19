import express from 'express';
import {CryptoController} from "../../controller/CryptoController";
import {CryptoCurrency} from "../../entity/CryptoCurrency";
import {CryptoFetcher} from "../../CryptoExternalAPIs/CryptoDataFetcher/fetcher";
import {GetCryptoResponse} from "./Interface";
import {GeckoCoinResponse} from "../../CryptoExternalAPIs/CryptoDataFetcher/GeckoInterface";
import {geckoResponseToCryptoReponse} from "./GeckoAdapter";

export const cryptoRouter = express.Router();

/**
 * Route used to get a information about a specific cryptocurrency
 * @function
 * @param path - Express path
 * @param handler - HTTP request handler
 */
cryptoRouter.get('/cryptos/:symbol', async (req, res) => {

  // Fetch the crypto entity and its informations from the database, fail with 404 if the symbol is not found.
  const controller = await CryptoController.getCryptoController()
  let crypto = await controller.getCrypto({symbol: req.params.symbol});
  if ( !crypto ){
    res.status(404);
    res.send('Coin not found')
    return
  }

  // Using the entity's geckoID, make a call to the geckoAPI to get full informations about the cryptocurrency.
  let geckoRes = await CryptoFetcher.getCryptoFetcher().getCoinInformations({geckoID: crypto.geckoID}).catch((err) => {
    res.status(500);
    res.statusMessage = "Error while fetching from the CoinGeckoAPI"
    res.send('Request failed')
  })

  if (!geckoRes) return;

  // Construct the response from the gecko API's informations
  const responseBody: GetCryptoResponse = geckoResponseToCryptoReponse(geckoRes);

  // Send the response
  res.json(responseBody)
})

cryptoRouter.get('/cryptos', async (req, res) => {

  // Get the crypto currencies ids and send a bad request error if they can't be parsed as an array of string
  let cmids: string[];
  if ( req.query.cmids as string[] ){
    cmids = req.query.cmids as string[];
  } else {
    res.status(400)
    res.statusMessage = "Incorrect format of cmids"
    res.send('Incorrect format of cmids')
    return
  }

  // Get the crypto entities from the database
  const controller = await CryptoController.getCryptoController();
  const cryptos = await Promise.all(cmids.map((id) => controller.getCrypto({symbol: id})));

  // Get the crypto informations from the Gecko Coin API
  const cryptosGeckoInformations = await Promise.all( cryptos.filter((crypto) => {
    return crypto !== undefined
  }).map((crypto) => {
    return CryptoFetcher.getCryptoFetcher().getCoinInformations(crypto!)
  }));

  // Transform the gecko coin API informations into our API's response informations
  const cryptosResponsesInformations = cryptosGeckoInformations.map(geckoResponseToCryptoReponse);

  // Send the request back with status 200
  res.status(200);
  res.json({
    cryptos: cryptosResponsesInformations
  })
})