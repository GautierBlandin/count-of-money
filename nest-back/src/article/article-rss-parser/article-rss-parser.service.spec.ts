import { Test, TestingModule } from '@nestjs/testing';
import { ArticleRssParserService } from './article-rss-parser.service';

describe('ArticleRssParserService', () => {
  let service: ArticleRssParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleRssParserService],
    }).compile();

    service = module.get<ArticleRssParserService>(ArticleRssParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
