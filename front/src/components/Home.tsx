
import React from 'react';


import {
    Toast, ToastHeader, ToastBody
} from 'reactstrap';

import './Home.css'


import homeBackground from "./homeBackground.jpg";
declare module "*.jpg";

export default function Home() {
  return (

<div className="Container">

    <div className="Homepage">

        <img src={homeBackground} className="HomeBackground" />
        <div className="Center">

            <table>
                <tr>
                    <th>
                        <a href="#"><div className="HomeBanner">
                        <i className="far fa-list-alt fa-3x"></i>
                            <p className="custom-paragraph">News</p>
                            <div className="lineBreak">Read last cryptocurrency-related news</div>
                        </div></a>
                    </th>
                    <th>
                        <a href="Watchlist"><div className="HomeBanner">
                            <i className="fab fa-stack-exchange fa-3x"></i>
                            <p className="custom-paragraph">Watchlist</p>
                            <div className="lineBreak">Add cryptocurrencies to your watchlist and track them</div>
                        </div></a>
                    </th>
                    <th>
                        <a href="Market"><div className="HomeBanner">
                            <i className="fab fa-bitcoin fa-3x"></i>
                            <p className="custom-paragraph">Market</p>
                            <div className="lineBreak">Check all cryptocurrencies of the market</div>
                        </div></a>
                    </th>
                    <th>
                        <a href="ChartsPanel"><div className="HomeBanner">
                            <i className="fa fa-line-chart fa-3x"></i>
                            <p className="custom-paragraph">Charts Panel</p>
                            <div className="lineBreak">Analyze cryptocurrencies</div>
                        </div></a>
                    </th>
                </tr>
            </table>
        </div>

        <div className="Bottom">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-linkedin"></a>
        </div>

    </div>

    <div className="Homepage AsideNews">

    <h1 className="HNews">News</h1>

        <div className="CFeed">
            <Toast className="Article">
                <ToastHeader>
                Article #1
                </ToastHeader>
                <ToastBody>
                Nihil est enim virtute amabilius, nihil quod magis adliciat ad diligendum, quippe cum propter virtutem et probitatem etiam eos
                </ToastBody>
            </Toast>
            <Toast className="Article">
                <ToastHeader>
                Article #2
                </ToastHeader>
                <ToastBody>
                Nihil est enim virtute amabilius, nihil quod magis adliciat ad diligendum, quippe cum propter virtutem et probitatem etiam eos
                </ToastBody>
            </Toast>
            <Toast className="Article">
                <ToastHeader>
                Article #3
                </ToastHeader>
                <ToastBody>
                Nihil est enim virtute amabilius, nihil quod magis adliciat ad diligendum, quippe cum propter virtutem et probitatem etiam eos
                </ToastBody>
            </Toast>
            <Toast className="Article">
                <ToastHeader>
                Article #4
                </ToastHeader>
                <ToastBody>
                Nihil est enim virtute amabilius, nihil quod magis adliciat ad diligendum, quippe cum propter virtutem et probitatem etiam eos
                </ToastBody>
            </Toast>
            <Toast className="Article">
                <ToastHeader>
                Article #5
                </ToastHeader>
                <ToastBody>
                Nihil est enim virtute amabilius, nihil quod magis adliciat ad diligendum, quippe cum propter virtutem et probitatem etiam eos
                </ToastBody>
            </Toast>
        </div>

    </div>

</div>

  );
}
