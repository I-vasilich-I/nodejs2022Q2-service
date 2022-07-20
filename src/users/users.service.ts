import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserWithoutPassword } from 'src/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserWithoutPassword> {
    const timestamp = Date.now();
    const newUser = {
      ...user,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const createdUser = this.usersRepository.create(newUser);
    const savedUser = await this.usersRepository.save(createdUser);

    return savedUser.toResponse();
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string): Promise<UserWithoutPassword> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} doesn't exist`);
    }

    return user.toResponse();
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = newPassword;
    user.updatedAt = Date.now();

    const savedUser = await this.usersRepository.save(user);

    return savedUser.toResponse();
  }

  async deleteOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't exist`);
    }

    await this.usersRepository.delete(id);
  }
}
