import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, TUpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return (await this.prisma.user.findMany()).map(
      ({ id, username, email }) => ({ id, username, email }),
    );
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  async updateOne(id: number, data: TUpdateUserDto) {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
