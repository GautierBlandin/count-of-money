import React from 'react';

import {
  Table
} from 'reactstrap';

import './Market.css';

export default function Market() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);

  return (
    // <p>You clicked {count} times</p>

    <div>
      <h1 className="HMarket">Market</h1>
    
      <Table
        hover
        responsive
        size=""
        striped
      >
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Rank position
            </th>
            <th>
              Current price
            </th>
            <th>
              24h Change (%)
            </th>
            <th>
              Market cap
            </th>
            <th>
              Circulating supply
            </th>
            <th>
              24h volume
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              BTC
            </th>
            <td>
              1
            </td>
            <td>
              $54400
            </td>
            <td>
              -5%
            </td>
            <td>
              $1,584,982,345
            </td>
            <td>
              $1,579,493,408
            </td>
            <td>
              $102,879,843
            </td>
          </tr>
          <tr>
          <th scope="row">
              BTC
            </th>
            <td>
              1
            </td>
            <td>
              $54400
            </td>
            <td>
              -5%
            </td>
            <td>
              $1,584,982,345
            </td>
            <td>
              $1,579,493,408
            </td>
            <td>
              $102,879,843
            </td>
          </tr>
          <tr>
          <th scope="row">
              BTC
            </th>
            <td>
              1
            </td>
            <td>
              $54400
            </td>
            <td>
              -5%
            </td>
            <td>
              $1,584,982,345
            </td>
            <td>
              $1,579,493,408
            </td>
            <td>
              $102,879,843
            </td>
          </tr>
        </tbody>
      </Table>
    </div>

  );
}