import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
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
              #
            </th>
            <th>
              First Name
            </th>
            <th>
              Last Name
            </th>
            <th>
              Username
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              1
            </th>
            <td>
              Mark
            </td>
            <td>
              Otto
            </td>
            <td>
              @mdo
            </td>
          </tr>
          <tr>
            <th scope="row">
              2
            </th>
            <td>
              Jacob
            </td>
            <td>
              Thornton
            </td>
            <td>
              @fat
            </td>
          </tr>
          <tr>
            <th scope="row">
              3
            </th>
            <td>
              Larry
            </td>
            <td>
              the Bird
            </td>
            <td>
              @twitter
            </td>
          </tr>
        </tbody>
      </Table>
    </div>

  );
}