import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, TUpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    if (isNaN(+id)) {
      throw new BadRequestException('ID must be a number');
    }

    const user = await this.usersService.findOne(+id)

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    if (!data.username.trim() || !data.email.trim()) {
      throw new BadRequestException('All fields are required');
    }

    return await this.usersService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    if (isNaN(+id)) {
      throw new BadRequestException('ID must be a number');
    }

    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return await this.usersService.delete(+id);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: number, @Body() data: TUpdateUserDto) {
    if (isNaN(+id)) {
      throw new BadRequestException('ID must be a number');
    }

    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }  

    return await this.usersService.updateOne(+id, data);    
  }
}
