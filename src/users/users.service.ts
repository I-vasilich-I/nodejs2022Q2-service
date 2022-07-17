import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserWithoutPassword } from 'src/interfaces';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(user: CreateUserDto): Promise<UserWithoutPassword> {
    const timestamp = new Date().getTime();
    const newUser: User = {
      ...user,
      id: uuid(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.db.users.addUser(newUser);
    return this.getUserWithoutPassword(newUser);
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    return this.db.users
      .findAll()
      .map((user) => this.getUserWithoutPassword(user));
  }

  async findOne(id: string): Promise<UserWithoutPassword> {
    const user = this.db.users.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    return this.getUserWithoutPassword(user);
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = this.db.users.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();
    return this.getUserWithoutPassword(user);
  }

  async deleteOne(id: string) {
    const user = this.db.users.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    this.db.users.deleteOne(id);
  }

  private getUserWithoutPassword({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password,
    ...rest
  }: User): UserWithoutPassword {
    return rest;
  }
}
