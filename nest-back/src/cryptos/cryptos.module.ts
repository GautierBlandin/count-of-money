import { Module } from '@nestjs/common';
import { GeckoFetcherService } from './gecko-fetcher/gecko-fetcher.service';
import { CryptoDalService } from './crypto-dal/crypto-dal.service';

@Module({
  providers: [GeckoFetcherService, CryptoDalService]
})
export class CryptosModule {}
