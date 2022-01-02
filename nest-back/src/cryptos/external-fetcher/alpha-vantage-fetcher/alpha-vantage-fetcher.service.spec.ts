import { Test, TestingModule } from '@nestjs/testing';
import { AlphaVantageFetcherService } from './alpha-vantage-fetcher.service';

describe('AlphaVantageFetcherService', () => {
  let service: AlphaVantageFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlphaVantageFetcherService],
    }).compile();

    service = module.get<AlphaVantageFetcherService>(
      AlphaVantageFetcherService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
