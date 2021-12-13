import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Toast, ToastHeader, ToastBody, Spinner
} from 'reactstrap';

import './Home.css'

import homeBackground from "./homeBackground.jpg";
declare module "*.jpg";

export default function Home() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);

  return (
    // <p>You clicked {count} times</p>

<div className="Container">

    <div className="Homepage">

        <img src={homeBackground} className="HomeBackground" />
        <div className="Center">
            Centered
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