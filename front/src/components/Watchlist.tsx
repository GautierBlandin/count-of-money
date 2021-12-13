import React, { useState }from "react";
import './Watchlist.css'

type RowData = {
  message: string;
}

interface IState {
  rows: RowData[];
}

export default function Watchlist() {
  const [state, setState] = useState<IState>({rows: []});

  const addRow = () => {
    setState({
      rows: [...state.rows, { message: "Test" }]
    })
  } 

  const { rows } = state;

  return (
    <div>

      <input placeholder='Crypto to add here' type='text' /> 

      <table>
          <thead>
            <th colSpan={1}>
                <button onClick={addRow}>Add new row to watchlist</button>
            </th>
          </thead>
          <tbody>
            { rows.map(element => (
                <tr> 
                  <td> 
                    Cell 1
                  </td> 
                  <td> 
                    Cell 2
                  </td> 
                </tr>
              ))
            }
          </tbody>
      </table>
    </div>
  );
}