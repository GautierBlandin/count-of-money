import { Module } from '@nestjs/common';
import { GeckoFetcherService } from './external-fetcher/gecko-fetcher/gecko-fetcher.service';
import { AlphaVantageFetcherService } from "./external-fetcher/alpha-vantage-fetcher/alpha-vantage-fetcher.service";
import { CryptoDalService } from './crypto-dal/crypto-dal.service';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from "./cryptos.service";
import {ExternalFetcherService} from "./external-fetcher/external-fetcher/external-fetcher.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CryptoCurrency} from "./crypto-dal/cryptos.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CryptoCurrency])],
  providers: [GeckoFetcherService, CryptoDalService, ExternalFetcherService, AlphaVantageFetcherService, CryptosService],
  controllers: [CryptosController]
})
export class CryptosModule {}
