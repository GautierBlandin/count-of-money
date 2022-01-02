import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthUtilsService } from './auth-utils/auth-utils.service';
import { OauthService } from './oauth/oauth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UsersService, AuthUtilsService],
  controllers: [UsersController],
  providers: [UsersService, AuthUtilsService, OauthService],
})
export class UsersModule {}
