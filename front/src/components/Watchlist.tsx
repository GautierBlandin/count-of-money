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
import {MeContext} from "../context/meContext.context";
import {Autocomplete, TextField} from "@mui/material";
import {getAllCryptos} from "@gautierblandin/comoney-api/dist/api";

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
  const meContext = useContext(MeContext);

  useEffect(() => {
    if(meContext.profile?.cryptos){
      setWatchlist(meContext.profile.cryptos);
    }
  }, meContext.profile?.cryptos)

  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [watchlistRows, setWatchlistRows] = useState<watchListRow[]>([]);
  const [crypto, setCrypto] = useState<{symbol: string, name: string}>({symbol: '', name: ''});
  const [availableCryptos, setAvailableCryptos] = useState<{symbol: string, name: string}[]>([]);

  const setWatchListAndUpdateProfile = (watchList: string[]) => {
    meContext.updateWatchlist(watchList);
    setWatchlist(watchList);
  }

  const addCrypto = () => {
    if(!watchlist.includes(crypto.symbol) && availableCryptos.some(c => c.symbol === crypto.symbol)){
      setWatchListAndUpdateProfile([...watchlist, crypto.symbol]);
    }
    setCrypto({symbol: '', name: ''});
  };

  const removeCrypto = (symbol: string) => {
    setWatchListAndUpdateProfile(watchlist.filter(c => c !== symbol));
  };

  const createCryptoRemover = (symbol: string) => {
    return () => removeCrypto(symbol);
  };

  // Fetch all cryptos available for watching from the backend
  useEffect(() => {
    getAllCryptos().then(res => {
      setAvailableCryptos(res.cryptos.map(crypto => {
        return {
          symbol: crypto.symbol,
          name: crypto.name
        }
      }))
    })
  }, [])

  // When the watchlist gets updated, update the rows with backend datas
  useEffect(() => {
    console.log(watchlist)
    CryptoAPI.getCryptos(watchlist).then(cryptos => {
      console.log(cryptos)
      setWatchlistRows([...cryptos.cryptos.map(crypto => {
         return {
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.currentPrice,
          changePercent: (crypto.currentPrice - crypto.openingPrice) / crypto.openingPrice  * 100,
          highestDaily: crypto.highestDailyPrice,
          lowestDaily: crypto.lowestDailyPrice
        }
      })
      ])
    });
  }, [JSON.stringify(watchlist)])


  return (

    <div className="watchlistBackground">
      <h1 className="HWatchlist">Watchlist</h1>
      <div className="container">
        <div className="table-responsive">
          <div className="custom-container">
            <div className="custom-select">
              <Autocomplete
                  className="autocomplete"
                  options={
                    availableCryptos.map(crypto => {
                      return {
                        label: crypto.name,
                        value: crypto.symbol
                      }
                    })}
                  value = {{
                    label: crypto.name,
                    value: crypto.symbol
                  }}
                  onChange={(event, value) =>
                      setCrypto({symbol: value?.value ?? '', name: value?.label ?? ''})}
                  renderInput={(params) => <TextField {...params} label="Cryptocurrency" />}
              />
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
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
                { watchlistRows.map(element => (
                  <tr>
                    <td>{element.name}</td>
                    <td><span className="dollar">{element.price}</span></td>
                    <td><span className="dollar">{element.highestDaily}</span></td>
                    <td><span className="dollar">{element.lowestDaily}</span></td>
                    <td><span className="percent">{element.changePercent}</span></td>
                    <td><button className="custom-button" onClick={createCryptoRemover(element.symbol)}>Remove</button></td>
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
