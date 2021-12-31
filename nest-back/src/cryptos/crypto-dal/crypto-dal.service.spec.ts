import { Test, TestingModule } from '@nestjs/testing';
import { CryptoDalService } from './crypto-dal.service';

describe('CryptoDalService', () => {
  let service: CryptoDalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoDalService],
    }).compile();

    service = module.get<CryptoDalService>(CryptoDalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
