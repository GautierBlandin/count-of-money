import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptosModule } from './cryptos/cryptos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { UserInjectorMiddleware } from './common/middlewares/user-injector.middleware';
import { CommonModule } from './common/common.module';
import { ArticleModule } from './article/article.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CryptosModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    CommonModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserInjectorMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
