import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptosController } from './cryptos/cryptos.controller';
import { CryptosService } from './cryptos/cryptos.service';
import { CryptosModule } from './cryptos/cryptos.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnectionOptions} from "typeorm";

@Module({
  imports: [
      CryptosModule,
      TypeOrmModule.forRootAsync({
          useFactory: async () =>
              Object.assign(await getConnectionOptions(), {
                  autoLoadEntities: true,
              }),
      }),
  ],
  controllers: [AppController, CryptosController],
  providers: [AppService, CryptosService],
})
export class AppModule {}
