import React from 'react';

export interface MarketRowProps {
    crypto: string;
    rank: number;
    price: number;
    dailyPriceChange: number;
    marketCap: number;
    allTimeHigh: number;
}

export default function MarketRow({crypto, rank, price, dailyPriceChange, marketCap, allTimeHigh}: MarketRowProps){
    return(
        <tr>
            <td>{crypto}</td>
            <td><span className="rank">{rank}</span></td>
            <td><span className="dollar">{price}</span></td>
            <td><span className="dollar">{dailyPriceChange}</span></td>
            <td><span className="dollar">{marketCap}</span></td>
            <td><span className="dollar">{allTimeHigh}</span></td>
        </tr>
    )
}
