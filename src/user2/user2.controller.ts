import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User2Service } from './user2.service';
import { UpdateUser2Dto } from './dto/update-user2.dto';

@Controller('user2')
export class User2Controller {
  constructor(private readonly user2Service: User2Service) {}

  @Post()
  create(@Body() body) {
    return this.user2Service.create(body);
  }

  @Get()
  findAll() {
    return this.user2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.user2Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser2Dto: UpdateUser2Dto) {
    return this.user2Service.update(+id, updateUser2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user2Service.remove(+id);
  }
}
