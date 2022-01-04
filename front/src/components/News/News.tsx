import React from 'react';
import Article from './Article';
import { ArticleProps } from "./Article";

import './News.css';

export interface NewsProps {
    articles: ArticleProps[];
    characterCutoff?: number;
    articleAmount?: number;
}

export default function News({articles, characterCutoff, articleAmount = 5}: NewsProps){
    return(
        <div className="Homepage AsideNews">
            <h1 className="HNews">News</h1>
            <div className="CFeed">
                {articles.slice(0, articleAmount).map((article, index) => (
                    <Article key={index}
                             summary={article.summary}
                             title={article.title}
                             url={article.url}
                             characterCutoff={characterCutoff}
                    />
                ))}
            </div>
        </div>
    )
}
