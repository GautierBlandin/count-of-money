import { Test, TestingModule } from '@nestjs/testing';
import { GeckoFetcherService } from './gecko-fetcher.service';

describe('GeckoFetcherService', () => {
  let service: GeckoFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeckoFetcherService],
    }).compile();

    service = module.get<GeckoFetcherService>(GeckoFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
