import { CreateArticleDto } from '../dto/create-article.dto';

export function CoinTelegraphRssToArticles(
  coinTelegraphRss: CoinTelegraphRss,
): CreateArticleDto[] {
  return coinTelegraphRss.channel.item.map((article) => {
    return {
      title: article.title,
      summary: article.description,
      date: article.pubDate,
      source: 'https://cointelegraph.com/',
      url: article.link,
      imageUrl: '',
    };
  });
}

export interface CoinTelegraphRss {
  channel: {
    title: string;
    link: string;
    description: string;
    item: CoinTelegraphArticle[];
  };
}

export interface CoinTelegraphArticle {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}
