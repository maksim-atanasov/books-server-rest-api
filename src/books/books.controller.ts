import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, TUpdateBookDto } from './books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Query('author') author?: string) {
    if (author) {
      return await this.booksService.findAllByAuthor(author);
    }
    
    return await this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    if (isNaN(+id)) {
      throw new BadRequestException('ID must be a number');
    }

    const user = await this.booksService.findOne(+id);

    if (!user) {
      throw new NotFoundException('Book is not found');
    }

    return user;
  }

  @Post()
  create(@Body() data: CreateBookDto) {
    if (!data.title.trim() || !data.author.trim() || data.price <= 0) {
      throw new BadRequestException('All fields are required');
    }

    return this.booksService.create(data);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: number) {
    if (isNaN(+id)) {
      throw new BadRequestException('ID must be a number');
    }

    const user = await this.booksService.findOne(+id);

    if(!user) {
      throw new NotFoundException('Book is not found');
    }
    
    await this.booksService.deleteOne(+id);

    return { message: 'Book deleted successfully' };
  }

  @Patch(':id')
  @HttpCode(201)
  async updateOne(@Param('id') id: number, @Body() data: TUpdateBookDto) {
    if (isNaN(+id)) {
      throw new BadRequestException('ID must be a number');
    }

    const user = await this.booksService.findOne(+id);

    if(!user) {
      throw new NotFoundException('Book is not found');
    }

    return this.booksService.updateOne(+id, data);
  }
}
