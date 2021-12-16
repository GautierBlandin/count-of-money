"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fetcher_1 = require("./CryptoExternalAPIs/CryptoDataFetcher/Fetcher");
async function main() {
    const fetcher = Fetcher_1.CryptoFetcher.getCryptoFetcher();
    await fetcher.filldb(50);
}
main().catch(console.log);
