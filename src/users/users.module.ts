import { Module } from '@nestjs/common';
import { Database } from 'src/database/database';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, Database],
})
export class UsersModule {}
