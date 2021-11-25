import {CryptoFetcher} from "./CryptoExternalAPIs/CryptoDataFetcher/Fetcher";
import {CryptoController} from "./controller/CryptoController";

async function main(){
  const fetcher = CryptoFetcher.getCryptoFetcher();
  //await fetcher.filldb(50);
  // const controller = await CryptoController.getCryptoController()
  // controller.getCrypto({symbol: 'btc'}).then(console.log)
  const res = await fetcher.getMinuteHistory({symbol: 'btc'})

  console.log(res.data)
}

main().catch(console.log)