import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRssParserService } from './article-rss-parser/article-rss-parser.service';
import { ArticleFetcherService } from './article-fetcher/article-fetcher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRssParserService, ArticleFetcherService],
})
export class ArticleModule {}
