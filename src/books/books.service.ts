import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto, TUpdateBookDto } from './books.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return (await this.prisma.book.findMany({ orderBy: { id: 'asc' } })).map(
      ({ id, title, author, price }) => ({ id, title, author, price }),
    );
  }

  async findAllByAuthor(author: string) {
    return await this.prisma.book.findMany({
      where: { author },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.book.findUnique({ where: { id } });
  }

  async create(data: CreateBookDto) {
    return await this.prisma.book.create({ data });
  }

  async deleteOne(id: number) {
    return await this.prisma.book.delete({ where: { id } });
  }

  async updateOne(id: number, data: TUpdateBookDto) {
    return await this.prisma.book.update({ where: { id }, data });
  }
}
