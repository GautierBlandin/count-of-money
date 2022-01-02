import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './common/middlewares/logger.middleware';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Logger);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
