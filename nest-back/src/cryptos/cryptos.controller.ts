import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CryptosService } from './cryptos.service';
import {
  GetAllCryptosResponse,
  GetCryptoResponse,
} from '@gautierblandin/types';
import { RoleGuard } from '../common/guards/role.guard';
import { Admin } from '../common/decorators/admin.decorator';

@Controller('cryptos')
export class CryptosController {
  constructor(private cryptosService: CryptosService) {}

  @Get('all')
  async findAll(): Promise<GetAllCryptosResponse> {
    return await this.cryptosService.getAllStaticCryptos();
  }

  @Get(':symbol')
  @UseGuards(RoleGuard)
  async findOne(@Param('symbol') symbol: string): Promise<GetCryptoResponse> {
    return this.cryptosService.getDynamicCrypto({ symbol: symbol });
  }

  @Get()
  async findSeveral(
    @Query('cmids') query: string[],
  ): Promise<GetCryptoResponse[]> {
    return Promise.all(
      query.map((symbol) =>
        this.cryptosService.getDynamicCrypto({ symbol: symbol }),
      ),
    );
  }

  @Get('/:symbol/history/:period')
  @UseGuards(RoleGuard)
  async findHistory(
    @Param('symbol') symbol: string,
    @Param('period') period: string,
  ) {
    return await this.cryptosService.getCryptoHistory({
      symbol: symbol,
      period: period,
    });
  }

  @Admin()
  @UseGuards(RoleGuard)
  @Post(':geckoID')
  async createCrypto(
    @Param('geckoID') geckoID: string,
  ): Promise<GetCryptoResponse> {
    return await this.cryptosService.createCrypto({ geckoID: geckoID });
  }

  @Admin()
  @UseGuards(RoleGuard)
  @HttpCode(201)
  @Delete(':symbol')
  async deleteCrypto(@Param('symbol') symbol: string) {
    await this.cryptosService.deleteCrypto({ symbol: symbol });
    return { message: 'Crypto deleted' };
  }
}
