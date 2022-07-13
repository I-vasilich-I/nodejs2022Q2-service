import { Injectable } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class Database {
  users = new UsersEntity();
}
