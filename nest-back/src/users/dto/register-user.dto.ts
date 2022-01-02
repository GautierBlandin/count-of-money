import { IsOptional } from 'class-validator';

export class RegisterUserDto {
  readonly email: string;
  readonly password: string;
}
