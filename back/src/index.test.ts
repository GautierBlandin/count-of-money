import {CryptoFetcher} from "./CryptoExternalAPIs/CryptoDataFetcher/fetcher";
import {CryptoController} from "./controller/CryptoController";

async function main(){
  const fetcher = CryptoFetcher.getCryptoFetcher();
  //await fetcher.filldb(50);
  const controller = await CryptoController.getCryptoController()
  controller.getCrypto({symbol: 'btc'}).then(console.log)
}

main().catch(console.log)