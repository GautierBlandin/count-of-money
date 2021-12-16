import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './Market.css'

export default function Market() {

  return (
    
      <div className="background">
        
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
                </tbody>
              </table>
            </div>

          </div>

      </div>
    
  );
}