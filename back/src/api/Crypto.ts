import express from 'express';
import {CryptoController} from "../controller/CryptoController";
import {CryptoCurrency} from "../entity/CryptoCurrency";

export const cryptoRouter = express.Router();

cryptoRouter.get('/coin/:uuid', async (req, res) => {
  const controller = await CryptoController.getCryptoController()
  let crypto: CryptoCurrency;
  await controller.getCrypto({uuid: req.params.uuid}).then((dbres)=> {
    if(dbres){
      crypto = dbres;
    } else {
      res.status(404);
      res.statusMessage = 'Ressource not found';
      res.send();
    }
  }).catch((err) => {
    console.log(err);
    res.status(400);
    res.send;
  })
  res.send('coucou')
})

// what i am trying to do right now is the get working routes on my API.
// what does this translate into ?
// the process is : receive get request with crypto uuid. fetch crypto from the database with the given uuid.
// request coin gecko with the coin gecko id. translate the coin gecko response into a getcryptoresponse
// send the getcryptoresponse