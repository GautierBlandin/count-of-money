import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFetcherService } from './external-fetcher.service';

describe('ExternalFetcherService', () => {
  let service: ExternalFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalFetcherService],
    }).compile();

    service = module.get<ExternalFetcherService>(ExternalFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
