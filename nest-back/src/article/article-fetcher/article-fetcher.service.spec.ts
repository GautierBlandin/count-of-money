import { Test, TestingModule } from '@nestjs/testing';
import { ArticleFetcherService } from './article-fetcher.service';

describe('ArticleFetcherService', () => {
  let service: ArticleFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleFetcherService],
    }).compile();

    service = module.get<ArticleFetcherService>(ArticleFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
