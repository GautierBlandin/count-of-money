import React, {useContext, useEffect} from "react";
import{
  useState
} from "react";

import {
  Input, Form
} from 'reactstrap';

import './Watchlist.css'
import {CryptoAPI} from "@gautierblandin/comoney-api";
import {AuthContext} from "../context/auth.context";

interface watchListRow{
  name: string,
  symbol: string,
  price: number,
  changePercent: number,
  highestDaily: number,
  lowestDaily: number,
}

export default function Watchlist() {
  const authContext = useContext(AuthContext);

  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [watchlistRows, setWatchlistRows] = useState<watchListRow[]>([]);
  const [crypto, setCrypto] = useState("");

  const addCrypto = () => {
    if(!watchlist.includes(crypto)){
      setWatchlist([...watchlist, crypto]);
      setCrypto("");
    }
  };

  useEffect(() => {
    console.log(watchlist)
    CryptoAPI.getCryptos(watchlist).then(cryptos => {
      cryptos.cryptos.map(crypto => {
        setWatchlistRows([...watchlistRows, {
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.currentPrice,
          changePercent: (crypto.currentPrice - crypto.openingPrice) / crypto.openingPrice  * 100,
          highestDaily: crypto.highestDailyPrice,
          lowestDaily: crypto.lowestDailyPrice
        }])
      })
    });
  }, [JSON.stringify(watchlist)])


  return (

    <div className="watchlistBackground">

      <h1 className="HWatchlist">Watchlist</h1>

      <div className="container">

        <div className="table-responsive">

          <div className="custom-container">
            <div className="custom-select">
            {/* onSubmit={handleSubmit} */}
              <Form>
                <Input
                  id="FText"
                  crypto="text"
                  placeholder="Enter crypto: BTC, ETH, ..."
                  type="text"
                  value = {crypto}
                  onChange={e => setCrypto(e.target.value)}
                />
              </Form>
            </div>

            <button onClick={addCrypto} className="custom-button" role="button">Add to watchlist</button>

          </div>

          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">Crypto</th>
                <th scope="col">Price</th>
                <th scope="col">Highest 24h</th>
                <th scope="col">Lowest 24h</th>
                <th scope="col">Change Percent</th>
              </tr>
            </thead>
            <tbody>
                { watchlistRows.map(element => (
                  <tr>
                    <td>{element.name}</td> {/* const from onChange input */}
                    <td><span className="dollar">{element.price}</span></td>
                    <td><span className="dollar">{element.highestDaily}</span></td>
                    <td><span className="dollar">{element.lowestDaily}</span></td>
                    <td><span className="percent">{element.changePercent}</span></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
