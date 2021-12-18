import {CryptoFetcher} from "./CryptoExternalAPIs/CryptoDataFetcher/Fetcher";
import {createConnection} from "typeorm";

async function main(){
  await createConnection();
  const fetcher = CryptoFetcher.getCryptoFetcher();
  await fetcher.filldb(50);
}

main().catch(console.log)
