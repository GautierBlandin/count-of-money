import Parser from 'rss-parser';

const parser = new Parser();

export enum RssSource {
    COINBASE = 'https://blog.coinbase.com/feed'
}

export function getRssFeed(source: RssSource): Promise<any> {
    return parser.parseURL(source);
}



// goal : create two routes
/*
route 1 : • GET /articles[?params1=value1&. . .]
route 2 : GET /articles/{id}
 */
