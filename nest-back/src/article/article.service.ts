import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly repository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.repository.save(createArticleDto);
  }

  async findAll() {
    return await this.repository.find({
      order:{
      date: 'DESC'
      },
      take: 15
    });
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }

  async createArticleIfNotExists(createArticleDto: CreateArticleDto) {
    const article = await this.repository.findOne({
      title: createArticleDto.title,
    });
    if (article) {
      return article;
    }
    return await this.repository.save(createArticleDto);
  }

  async saveArticles(articles: CreateArticleDto[]) {
    articles.forEach((article) => this.createArticleIfNotExists(article));
  }
}
