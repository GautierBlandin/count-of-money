import { IsOptional } from 'class-validator';

export class CreateArticleDto {
  title: string;
  @IsOptional()
  summary: string;
  date: string;
  source: string;
  url: string;
  @IsOptional()
  imageUrl: string;
}
