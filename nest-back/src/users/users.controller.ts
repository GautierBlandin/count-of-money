import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthResponse, ProfileResponse } from '@gautierblandin/types';
import { ExtendedRequest } from '../common/types/request';
import { RoleGuard } from '../common/guards/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/auth/:provider')
  async getUserByOAuth(
    @Param('provider') provider: string,
    @Query('code') code: string,
  ): Promise<AuthResponse> {
    const user: User = await this.usersService.getUserFromOAuth({
      provider,
      code,
    });

    return {
      email: user.email,
      access_token: user.access_token,
    };
  }

  @Post('/register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthResponse> {
    const user = await this.usersService.registerUser(registerUserDto);
    return {
      email: user.email,
      access_token: user.access_token,
    };
  }

  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const user = await this.usersService.loginUser(loginUserDto);
    return {
      email: user.email,
      access_token: user.access_token,
    };
  }

  @Post('/logout')
  async logoutUser(@Req() request: ExtendedRequest) {
    if (request.user) {
      await this.usersService.logout(request.user.email);
    }
  }

  @UseGuards(RoleGuard)
  @Get('/profile')
  async getProfile(@Req() request: ExtendedRequest): Promise<ProfileResponse> {
    return {
      cryptos: request.user.cryptos,
      currency: request.user.currency,
      email: request.user.email,
      press_keywords: request.user.press_keywords,
    };
  }

  @UseGuards(RoleGuard)
  @Put('/profile')
  async updateProfile(
    @Req() request: ExtendedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(updateUserDto);
    await this.usersService.updateUser(updateUserDto);
    return 'User updated';
  }
}
