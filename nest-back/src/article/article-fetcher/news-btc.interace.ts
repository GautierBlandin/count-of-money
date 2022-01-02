import { CreateArticleDto } from '../dto/create-article.dto';

export function NewsBtcFeedToArticles(
  newsBtcFeed: NewsBtcFeed,
): CreateArticleDto[] {
  return newsBtcFeed.channel.item.map((article) => {
    return {
      title: article.title,
      summary: article.description,
      date: article.pubDate,
      source: 'https://www.newsbtc.com/',
      url: article.link,
      imageUrl: '',
    };
  });
}

export interface NewsBtcFeed {
  channel: {
    title: string;
    link: string;
    description: string;
    item: NewsBtcArticle[];
  };
}

export interface NewsBtcArticle {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}
