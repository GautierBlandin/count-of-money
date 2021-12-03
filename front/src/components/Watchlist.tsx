import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table
} from 'reactstrap';

import './Watchlist.css'

class Watchlist extends Component {

  render () {
    return (
        <div>
            <h1 className="HWatchlist">Watchlist</h1>

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
}

export default Watchlist;