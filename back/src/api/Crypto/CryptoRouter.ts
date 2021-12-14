import express from 'express';
import {CryptoController} from "../../controller/CryptoController";
import {CryptoFetcher} from "../../CryptoExternalAPIs/CryptoDataFetcher/Fetcher";
import {Period} from "../../CryptoExternalAPIs/cryptoExternalFetcher.interface";

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
  let geckoRes = await CryptoFetcher.getCryptoFetcher().getCryptoData({id: crypto.geckoID, symbol: crypto.symbol}).catch((err) => {
    res.status(500);
    res.statusMessage = "Error while fetching from the CoinGeckoAPI"
    res.send('Request failed')
  })

  if (!geckoRes) return;
  // Send the response
  res.json(geckoRes)
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
  const cryptos = await Promise.all( cmids.map( (id) => controller.getCrypto({symbol: id}) ) );

  // Get the crypto informations from the Gecko Coin API
  const cryptosGeckoInformations = await Promise.all( cryptos.filter((crypto) => {
    return crypto !== undefined
  }).map((crypto) => {
    return CryptoFetcher.getCryptoFetcher().getCryptoData({id: crypto!.geckoID, symbol: crypto!.symbol})
  }));

  // Send the request back with status 200
  res.status(200);
  res.json({
    cryptos: cryptosGeckoInformations
  })
})

/**
 * @function POST cryptos
 * @param id: The id corresponsding to geckoCoin's coin id
 * @param symbol: The crypto currency's symbol
 */
cryptoRouter.post('/cryptos', async (req, res) => {
  console.log(req.body)

  if(!(req.body as {id: string, symbol: string})){
    res.status(400);
    res.send('Error: invalid request format, must be : {id: string, symbol: string}')
    return
  }
  const geckoCoinInformations = await CryptoFetcher.getCryptoFetcher().getCryptoData(req.body).catch(() => {
    res.status(400)
    res.send('Invalid gecko coin ID')
  })

  if(!geckoCoinInformations) return;

  const controller = await CryptoController.getCryptoController();

  const cryptoEntity = await controller.saveCrypto({
    geckoID: geckoCoinInformations.id,
    imageURL: geckoCoinInformations.imageURL,
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


/**
 * @function DELETE crypto
 * @param The crypto's id
 */
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
  let realTimeData;
  switch(req.params.period){
    case 'daily':
      realTimeData = await fetcher.getHistoricData({symbol: req.params.symbol, period: Period.DAILY, historyLength: 60}).catch((err) => {
        console.log(err)
        res.status(400)
        res.send('Invalid cryptocurrency symbol')
      })
      if (!realTimeData) return
      res.status(200)
      res.json(realTimeData)
      break;
    case 'hourly':
      realTimeData = await fetcher.getHistoricData({symbol: req.params.symbol, period: Period.HOURLY, historyLength: 48}).catch((err) => {
        console.log(err)
        res.status(400)
        res.send('Invalid cryptocurrency symbol')
      })
      if (!realTimeData) return
      res.status(200);
      res.json(realTimeData)
      break;
    case 'minute':
      realTimeData = await fetcher.getHistoricData({symbol: req.params.symbol, period: Period.MINUTE, historyLength: 120}).catch((err) => {
        console.log(err)
        res.status(400)
        res.send('Invalid cryptocurrency symbol')
      })
      if (!realTimeData) return
      res.status(200);
      res.json(realTimeData)
      break;
    default:
      res.status(400)
      res.send('Invalid time period format, available : minute, hourly, daily')
      return
  }
})