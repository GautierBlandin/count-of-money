import { Injectable } from '@nestjs/common';
import { CryptoDalService } from './crypto-dal/crypto-dal.service';
import { ExternalFetcherService } from './external-fetcher/external-fetcher/external-fetcher.service';
import {
  GetAllCryptosResponse,
  GetCryptoResponse,
  GetRealTimeDataResponse,
  GetStaticCryptoResponse,
} from '@gautierblandin/types';
import {
  DeleteCryptoCurrencyRequest,
  GetCryptoCurrencyRequest,
} from './crypto-dal/cryptos.interface';
import { Period } from './external-fetcher/crypto-external-fetcher.interface';

@Injectable()
export class CryptosService {
  constructor(
    private cryptoDal: CryptoDalService,
    private cryptoExternal: ExternalFetcherService,
  ) {}

  public async getAllStaticCryptos(): Promise<GetAllCryptosResponse> {
    const dal_response = await this.cryptoDal.getAllCryptos({});
    return {
      cryptos: dal_response.map((currency) => {
        return {
          name: currency.name,
          symbol: currency.symbol,
          imageURL: currency.imageURL,
          id: currency.geckoID,
        };
      }),
    };
  }

  public async getStaticCrypto(
    req: GetCryptoCurrencyRequest,
  ): Promise<GetStaticCryptoResponse> {
    const dal_response = await this.cryptoDal.getCrypto(req);
    return {
      name: dal_response.name,
      symbol: dal_response.symbol,
      imageURL: dal_response.imageURL,
      id: dal_response.geckoID,
    };
  }

  public async getDynamicCrypto(
    req: GetCryptoCurrencyRequest,
  ): Promise<GetCryptoResponse> {
    const dal_response = await this.cryptoDal.getCrypto(req);
    const external_response = await this.cryptoExternal.getCryptoData({
      id: dal_response.geckoID,
      symbol: dal_response.symbol,
    });
    return external_response as GetCryptoResponse;
  }

  public async getCryptoHistory(req: {
    symbol: string;
    period: string;
  }): Promise<GetRealTimeDataResponse> {
    switch (req.period) {
      case 'minute':
        return this.cryptoExternal.getHistoricData({
          symbol: req.symbol,
          period: Period.MINUTE,
          historyLength: 120,
        });
      case 'hourly':
        return this.cryptoExternal.getHistoricData({
          symbol: req.symbol,
          period: Period.HOURLY,
          historyLength: 48,
        });
      case 'daily':
        return this.cryptoExternal.getHistoricData({
          symbol: req.symbol,
          period: Period.DAILY,
          historyLength: 30,
        });
      default:
        return this.cryptoExternal.getHistoricData({
          symbol: req.symbol,
          period: Period.DAILY,
          historyLength: 30,
        });
    }
  }

  public async createCrypto(req: {
    geckoID: string;
  }): Promise<GetCryptoResponse> {
    const geckoResponse = await this.cryptoExternal.getCryptoData({
      id: req.geckoID,
      symbol: '',
    });

    await this.cryptoDal.createCryptoCurrency({
      geckoID: req.geckoID,
      name: geckoResponse.name,
      symbol: geckoResponse.symbol,
      imageURL: geckoResponse.imageURL,
    });

    return geckoResponse as GetCryptoResponse;
  }

  public async deleteCrypto(req: DeleteCryptoCurrencyRequest) {
    await this.cryptoDal.deleteCryptoCurrency(req);
  }
}
