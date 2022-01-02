import { Injectable } from '@nestjs/common';
import { CryptoCurrency } from '../entities/cryptos.entity';
import {
  CreateCryptoCurrencyRequest,
  DeleteCryptoCurrencyRequest,
  GetCryptoCurrencyRequest,
} from './cryptos.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CryptoDalService {
  constructor(
    @InjectRepository(CryptoCurrency)
    private repository: Repository<CryptoCurrency>,
  ) {}

  public async getCrypto(req: GetCryptoCurrencyRequest) {
    return this.repository.findOne(req);
  }

  public async getAllCryptos(req: GetCryptoCurrencyRequest) {
    return this.repository.find(req);
  }

  public async deleteCryptoCurrency(req: DeleteCryptoCurrencyRequest) {
    return this.repository.delete(req);
  }

  public async createCryptoCurrency(req: CreateCryptoCurrencyRequest) {
    return await this.repository.save(req);
  }
}
