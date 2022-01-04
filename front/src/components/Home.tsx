import React, {useEffect, useState} from 'react';
import News from './News/News';

import './Home.css'


import homeBackground from "./homeBackground.jpg";
import { Article as ArticleType} from '@gautierblandin/types';
import { ArticleProps } from "./News/Article";
import {getAllArticles} from "@gautierblandin/comoney-api/dist/api/Press";

declare module "*.jpg";

export default function Home() {
    const [articles, setArticles] = useState<ArticleProps[]>([]);

    useEffect(() => {
        getAllArticles({}).then((res) => {
            setArticles(res.articles.map(articleResponse => {
                return {
                    title: articleResponse.title,
                    summary: articleResponse.summary,
                    url: articleResponse.url
                }
            }))
        })
    }, []);

  return (

<div className="Container">

    <div className="Homepage">

        <img src={homeBackground} className="HomeBackground" />
        <div className="Center">

            <table>
                <tr>
                    {/*<th>*/}
                    {/*    <a href="#"><div className="HomeBanner">*/}
                    {/*    <i className="far fa-list-alt fa-3x"></i>*/}
                    {/*        <p className="custom-paragraph">News</p>*/}
                    {/*        <div className="lineBreak">Read last cryptocurrency-related news</div>*/}
                    {/*    </div></a>*/}
                    {/*</th>*/}
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

    <News articles={articles} characterCutoff={120}/>

</div>

  );
}
