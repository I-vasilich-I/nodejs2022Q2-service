import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User, UserWithoutPassword } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(user: CreateUserDto): Promise<UserWithoutPassword> {
    const timestamp = new Date().getTime();
    const newUser: User = {
      ...user,
      id: uuid(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.push(newUser);
    return this.getUserWithoutPassword(newUser);
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    return this.users.map((user) => this.getUserWithoutPassword(user));
  }

  async findOne(id: string): Promise<UserWithoutPassword> {
    const user = this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    return this.getUserWithoutPassword(user);
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = this.findUserById(id);
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
    const user = this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    this.users = this.users.filter(({ id: userId }) => id !== userId);
  }

  private getUserWithoutPassword({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password,
    ...rest
  }: User): UserWithoutPassword {
    return rest;
  }

  private findUserById(id: string): User {
    return this.users.find(({ id: userId }) => userId === id) || null;
  }
}
