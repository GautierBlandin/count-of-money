import React, {Component, useEffect, useState} from 'react';

import './Market.css'
import MarketRow, { MarketRowProps } from "./MarketRow";
import {getMarket} from "@gautierblandin/comoney-api/dist/api";


export default function Market() {

  const [marketRows, setMarketRows] = useState<MarketRowProps[]>([]);

  useEffect(() => {
    getMarket().then(res => {
      setMarketRows(res.market.slice(0, 50).map(coin => {
        return {
          crypto: coin.name,
          rank: coin.market_cap_rank,
          price: coin.current_price,
          dailyPriceChange: coin.price_change_24h,
          marketCap: coin.market_cap,
          allTimeHigh: coin.ath
        }
      }))
    })
  }, []);

  return (

      <div className="marketBackground">

          <h1 className="HMarket">Market</h1>

          <div className="container">

            <div className="table-responsive">

              <table className="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Crypto</th>
                    <th scope="col">Rank</th>
                    <th scope="col">Price</th>
                    <th scope="col">24h Price Change</th>
                    <th scope="col">Market cap</th>
                    <th scope="col">All Time High</th>
                  </tr>
                </thead>
                <tbody>
                {
                  marketRows.map(row => {
                    return <MarketRow key={row.crypto} {...row}/>
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
      </div>

  );
}
