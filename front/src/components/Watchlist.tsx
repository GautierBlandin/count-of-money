import React, { useState }from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

import './Watchlist.css'

type RowData = {
  message: string;
}

interface IState {
  rows: RowData[];
}

export default function Watchlist() {

  // onClick: add cryptocurrency (row) to watchlist (table)
  const [state, setState] = useState<IState>({rows: []});
  
  const addRow = () => {
    setState({
      rows: [...state.rows, { message: "Test" }]
    })
  } 

  const { rows } = state;

  // onChange: cryptocurrency choice
  const [selectedOption, setSelectedOption] = useState<String>();

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    alert(`Feedback: ${value}`)
  };
  
  return (

    <div>

      <h1 className="HWatchlist">Watchlist</h1>

      <div className="container">

        <div className="table-responsive">

          <div className="custom-container">
            <div className="custom-select">
              <select onChange={selectChange}>
                <option selected value="0">BTC</option>
                <option value="1">ETH</option>
                <option value="2">SOL</option>
                <option value="3">AVAX</option>
                <option value="4">EGLD</option>
                <option value="5">XVS</option>
                <option value="6">ATOM</option>
                <option value="7">LINK</option>
                <option value="8">FTT</option>
                <option value="9">BNB</option>
                <option value="10">LTC</option>
                <option value="11">LUNA</option>
                <option value="12">DOT</option>
              </select>
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
              <tr>
                <td>Cell 1</td>
                <td><span className="rank">Cell 2</span></td>
                <td><span className="dollar">Cell 3</span></td>
                <td><span className="percent">Cell 4</span></td>
                <td><span className="dollar">Cell 5</span></td>
                <td><span className="dollar">Cell 6</span></td>
              </tr>
              <tr>
                <td>Cell 1</td>
                <td><span className="rank">Cell 2</span></td>
                <td><span className="dollar">Cell 3</span></td>
                <td><span className="percent">Cell 4</span></td>
                <td><span className="dollar">Cell 5</span></td>
                <td><span className="dollar">Cell 6</span></td>
              </tr>
              <tr>
                <td>Cell 1</td>
                <td><span className="rank">Cell 2</span></td>
                <td><span className="dollar">Cell 3</span></td>
                <td><span className="percent">Cell 4</span></td>
                <td><span className="dollar">Cell 5</span></td>
                <td><span className="dollar">Cell 6</span></td>
              </tr>
              <tr>  
                <td>Cell 1</td>
                <td><span className="rank">Cell 2</span></td>
                <td><span className="dollar">Cell 3</span></td>
                <td><span className="percent">Cell 4</span></td>
                <td><span className="dollar">Cell 5</span></td>
                <td><span className="dollar">Cell 6</span></td>
              </tr>
                { rows.map(element => (
                  <tr> 
                    <td>Cell 1</td> 
                    <td><span className="rank">Cell 2</span></td>
                    <td><span className="dollar">Cell 3</span></td>
                    <td><span className="percent">Cell 4</span></td>
                    <td><span className="dollar">Cell 5</span></td>
                    <td><span className="dollar">Cell 6</span></td>
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