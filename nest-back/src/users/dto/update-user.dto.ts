import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  email: string;
  @IsOptional()
  readonly cryptos: string[];
  @IsOptional()
  readonly press_keywords: string[];
  @IsOptional()
  readonly currency: string;
  @IsOptional()
  readonly password: string;
}
