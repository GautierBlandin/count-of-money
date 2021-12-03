import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Toast, ToastHeader, ToastBody, Spinner
} from 'reactstrap';

import './Home.css'

export default function Home() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);

  return (
    // <p>You clicked {count} times</p>

    <div>
        
        <aside>
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

        </aside>

        <div className="CHome">

        <h1 className="HHome">Home</h1>

            <div className="CHome-child">

                <p>Post haec Gallus Hierapolim profecturus ut expeditioni specie tenus adesset, Antiochensi plebi suppliciter obsecranti ut inediae dispelleret metum, quae per multas
                    difficilisque causas adfore iam sperabatur, non ut mos est principibus, quorum diffusa potestas localibus subinde medetur aerumnis, disponi quicquam statuit vel ex
                    provinciis alimenta transferri conterminis, sed consularem Syriae Theophilum prope adstantem ultima metuenti multitudini dedit id adsidue replicando quod invito
                    rectore nullus egere poterit victu.</p>

            </div>
            
        </div>

    </div>

  );
}