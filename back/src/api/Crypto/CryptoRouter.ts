import express from 'express';
import {CryptoController} from "../../controller/CryptoController";
import {CryptoCurrency} from "../../entity/CryptoCurrency";
import {CryptoFetcher} from "../../CryptoExternalAPIs/CryptoDataFetcher/Fetcher";
import {GetCryptoResponse} from "./CryptoInterface";
import {GeckoCoinResponse} from "../../CryptoExternalAPIs/GeckoCoin/GeckoInterface";
import {geckoResponseToCryptoReponse} from "../../CryptoExternalAPIs/GeckoCoin/GeckoAdapter";

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

/**
 * @function GET Cryptos
 * @param cmids - cmids are the ids of the crypto currencies the client wants to fetch from the databse.
 * The format is an array of cmids, and should be represented as such : cryptos?cmid[]=id_1&cmid[]=id_2 ...
 */
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

cryptoRouter.post('/cryptos', async (req, res) => {
  console.log(req.body)

  if(!(req.body as {geckoID: string})){
    res.status(400);
    res.send('Error: invalid request format, must be : {geckoID: string}')
    return
  }
  const geckoCoinInformations = await CryptoFetcher.getCryptoFetcher().getCoinInformations(req.body).catch(() => {
    res.status(400)
    res.send('Invalid gecko coin ID')
  })

  if(!geckoCoinInformations) return;

  const controller = await CryptoController.getCryptoController();

  const cryptoEntity = await controller.saveCrypto({
    geckoID: geckoCoinInformations.id,
    imageURL: geckoCoinInformations.image.large,
    name: geckoCoinInformations.name,
    symbol: geckoCoinInformations.symbol,
  }).catch((err) => {
    console.log(err)
    res.status(500);
    res.send('Failed to create cryptocurrency')
  })

  res.status(201);
  res.json(cryptoEntity);
})

cryptoRouter.delete('/cryptos/:cmid', async (req, res) => {
    const controller = await CryptoController.getCryptoController();
    await controller.deleteCrypto({symbol: req.params.cmid}).catch((err) => {
      console.log(err)
      res.status(500);
      res.send('Could not delete cryptocurrency');
    })

  res.status(202)
  res.send(`If it existed, deleted cryptocurrency with symbol ${req.params.cmid}`)
  }
)

cryptoRouter.get('/cryptos/:symbol/history/:period', async (req, res) => {
  const fetcher = CryptoFetcher.getCryptoFetcher()
  let vantageRes;
  switch(req.params.period){
    case 'daily':
      vantageRes = await fetcher.getDailyHistory({symbol: req.params.symbol}).catch((err) => {
        console.log(err)
        res.status(400)
        res.send('Invalid cryptocurrency symbol')
      })
      if (!vantageRes) return
      res.status(200)
      res.json(Object.entries(vantageRes.data['Time Series (Digital Currency Daily)']).slice(0, 60));
      break;
    case 'hourly':
      vantageRes = await fetcher.getHourlyHistory({symbol: req.params.symbol}).catch((err) => {
        console.log(err)
        res.status(400)
        res.send('Invalid cryptocurrency symbol')
      })
      if (!vantageRes) return
      res.status(200);
      res.json(Object.entries(vantageRes.data['Time Series Crypto (60min)']).slice(0, 48));
      break;
    case 'minute':
      vantageRes = await fetcher.getMinuteHistory({symbol: req.params.symbol}).catch((err) => {
        console.log(err)
        res.status(400)
        res.send('Invalid cryptocurrency symbol')
      })
      if (!vantageRes) return
      res.status(200);
      console.log(Object.entries(vantageRes.data['Time Series Crypto (1min)']).length)
      res.json(Object.entries(vantageRes.data['Time Series Crypto (1min)']).slice(0, 120));
      break;
    default:
      res.status(400)
      res.send('Invalid time period format, available : minute, hourly, daily')
      return
  }
})