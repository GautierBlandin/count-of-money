import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptosModule } from './cryptos/cryptos.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnectionOptions} from "typeorm";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      CryptosModule,
      // ConfigModule.forRoot({
      //     isGlobal: true,
      //     load: [
      //         () => require('dotenv').config(),
      //     ],
      // }),
      TypeOrmModule.forRootAsync({
          useFactory: async () =>
              Object.assign(await getConnectionOptions(), {
                  autoLoadEntities: true,
              }),
      }),
      UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
