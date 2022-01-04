import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUtilsService } from './auth-utils/auth-utils.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { OauthService } from './oauth/oauth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly authUtils: AuthUtilsService,
    private readonly oauthService: OauthService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const password_hash = this.authUtils.encryptPassword(
      registerUserDto.password,
    );
    const accessToken = this.authUtils.generateAccessToken(
      registerUserDto.email,
    );
    return await this.repository.save({
      email: registerUserDto.email,
      password_hash: password_hash,
      access_token: accessToken,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const access_token = this.authUtils.generateAccessToken(
      createUserDto.email,
    );
    return await this.repository.save({
      email: createUserDto.email,
      access_token: access_token,
    });
  }

  async getUserFromOAuth({
    provider,
    code,
  }: {
    provider: string;
    code: string;
  }): Promise<User> {
    const email = await this.oauthService.getEmailFromOAuth({ provider, code });
    const access_token = this.authUtils.generateAccessToken(email);

    return await this.repository.save({
      email,
      access_token,
    });
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const password_hash = this.authUtils.encryptPassword(loginUserDto.password);
    if (password_hash !== user.password_hash) {
      throw new Error('Wrong password');
    }
    user.access_token = this.authUtils.generateAccessToken(loginUserDto.email);
    return await this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(email: string) {
    return await this.repository.findOne(email);
  }

  async updateUser(user: UpdateUserDto) {
    const userToUpdate = await this.repository.findOne(user.email);
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    if (user.password) {
      userToUpdate.password_hash = this.authUtils.encryptPassword(
        user.password,
      );
    }
    userToUpdate.cryptos = user.cryptos ?? userToUpdate.cryptos;
    userToUpdate.press_keywords = user.press_keywords ?? userToUpdate.press_keywords;
    userToUpdate.currency = user.currency ?? userToUpdate.currency;
    console.log('userService userToUpdate', userToUpdate)
    return await this.repository.save(userToUpdate);
  }

  async addCrypto(email: string, crypto: string) {
    const user = await this.repository.findOne(email);
    user.cryptos.push(crypto);
    return await this.repository.save(user);
  }

  async addKeyword(email: string, keyword: string) {
    const user = await this.repository.findOne(email);
    user.press_keywords.push(keyword);
    return await this.repository.save(user);
  }

  async validateToken(token: string) {
    const email = this.authUtils.decodeAccessToken(token);
    const user = await this.repository.findOne(email);
    if (user.access_token == token) {
      return {
        valid: true,
        email: email,
        token: token
      }
    } else {
      return {
        valid: false,
        token: token,
        email: undefined
      }
    }
  }

  async logout(email: string) {
    const user = await this.repository.findOne(email);
    user.access_token = null;
    return await this.repository.save(user);
  }
}
