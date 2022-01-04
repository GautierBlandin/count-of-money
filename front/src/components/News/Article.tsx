import React from 'react';
import {Toast, ToastBody, ToastHeader} from "reactstrap";
import './Article.css';

export interface ArticleProps {
    title: string;
    summary: string;
    url: string;
    characterCutoff?: number;
}

export default function Article({title, summary, url, characterCutoff = 150}: ArticleProps){
    if(summary.length > characterCutoff){
        summary = summary.substring(0, characterCutoff) + '...';
    }

    return(
        <Toast className="Article">
            <ToastHeader>
                <a href={url}>{title}</a>
            </ToastHeader>
            <ToastBody>
                {summary}
            </ToastBody>
        </Toast>
    )
}
