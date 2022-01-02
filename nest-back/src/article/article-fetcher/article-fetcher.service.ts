import { Injectable } from '@nestjs/common';
import { ArticleService } from '../article.service';
import { ArticleRssParserService } from '../article-rss-parser/article-rss-parser.service';
import {
  CoinTelegraphRss,
  CoinTelegraphRssToArticles,
} from './coin-telegraph.interface';
import { NewsBtcFeed, NewsBtcFeedToArticles } from './news-btc.interace';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ArticleFetcherService {
  constructor(
    private articleService: ArticleService,
    private articleRssParserService: ArticleRssParserService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async fetchArticles() {
    console.log('Fetching Articles');

    const coinTelegraphResults = await this.articleRssParserService.parseSource(
      {
        sourceUrl: 'https://cointelegraph.com/editors_pick_rss',
      },
    );
    const coinTelegraphRss = coinTelegraphResults as CoinTelegraphRss;
    const coinTelegraphArticles = CoinTelegraphRssToArticles(coinTelegraphRss);
    await this.articleService.saveArticles(coinTelegraphArticles);

    const newsBtcResults = await this.articleRssParserService.parseSource({
      sourceUrl: 'https://www.newsbtc.com/feed/',
    });
    const newsBtcFeed = newsBtcResults as NewsBtcFeed;
    const newsBtcArticles = NewsBtcFeedToArticles(newsBtcFeed);
    await this.articleService.saveArticles(newsBtcArticles);
  }
}
