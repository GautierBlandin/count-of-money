import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { RoleGuard } from '../common/guards/role.guard';
import { Admin } from '../common/decorators/admin.decorator';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @UseGuards(RoleGuard)
  @Admin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
