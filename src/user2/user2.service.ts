import { Injectable } from '@nestjs/common';
import { UpdateUser2Dto } from './dto/update-user2.dto';

import { user } from './user2.mock';

@Injectable()
export class User2Service {
  create(body) {
    console.log(body);
    return 'This action adds a new user2';
  }

  findAll() {
    return user;
  }

  findOne(id: number) {
    return user.filter((item) => {
      return item.id === id;
    });
  }

  update(id: number, updateUser2Dto: UpdateUser2Dto) {
    return `This action updates a #${id} user2`;
  }

  remove(id: number) {
    return `This action removes a #${id} user2`;
  }
}
