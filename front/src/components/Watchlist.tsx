import React from "react";
import{
  useMemo,
  useContext,
  useEffect,
  useState
} from "react";
import {useLocation} from "react-router-dom";
import axios from 'axios';

import {
  Input, Form
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import './Watchlist.css'

type RowData = {
  nameCryptoRow: string;
}

interface IState {
  rows: RowData[];
}

// Use async if await axios
// export default async function Watchlist() {
export default function Watchlist() {

  // axios
  const [openingPrice, setOpeningPrice] = useState({})
  const [currentPrice, setCurrentPrice] = useState({})

  useEffect( () => {

    /*
    const res = await axios.get('http://localhost:3000/cryptos/btc');
    setCoinres(res.data)
    console.log('opening price', res.data.openingPrice)
    */

    axios.get('http://localhost:3000/cryptos/btc').then((res) => {
      setOpeningPrice(res.data);
      console.log('opening price', res.data.openingPrice)
    })

    axios.get('http://localhost:3000/cryptos/btc').then((res) => {
      setCurrentPrice(res.data);
      console.log('current price', res.data.currentPrice)
    })

  }, [])

  // onClick: add cryptocurrency (row) to watchlist (table)
  const [state, setState] = useState<IState>({rows: []});

  const addRow = () => {
    setState({
      rows: [...state.rows, { nameCryptoRow: crypto }]
    })
  }

  const { rows } = state;

  // onChange: cryptocurrency choice (input)
  const [crypto, setCrypto] = useState("");

  /*
  // DEBUG
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    console.log({crypto})
  }
  */

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
                  onChange={e => setCrypto(e.target.value)}
                />
              </Form>
            </div>

            <button onClick={addRow} className="custom-button" role="button">Add to watchlist</button>

          </div>

          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">Crypto</th>
                <th scope="col">Rank</th>
                <th scope="col">Price</th>
                <th scope="col">24h Price Change</th>
                <th scope="col">Market cap</th>
                <th scope="col">24h Volume</th>
              </tr>
            </thead>
            <tbody>
                { rows.map(element => (
                  <tr>
                    <td>{element.nameCryptoRow}</td> {/* const from onChange input */}
                    <td><span className="rank">1</span></td>
                    <td><span className="dollar">49759</span></td>
                    <td><span className="percent">-3</span></td>
                    <td><span className="dollar">879,039,487</span></td>
                    <td><span className="dollar">106,846,038</span></td>
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
