import {CryptoFetcher} from "./CryptoExternalAPIs/CryptoDataFetcher/Fetcher";

async function main(){
  const fetcher = CryptoFetcher.getCryptoFetcher();
  await fetcher.filldb(50);
}

main().catch(console.log)