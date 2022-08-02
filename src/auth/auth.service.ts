import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

const HASH_ROUNDS = 3;

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create({ login, password }: CreateUserDto): Promise<void> {
    const hashedPassword = await hash(password, HASH_ROUNDS);

    await this.userService.create({
      login,
      password: hashedPassword,
    });
  }

  async validateUser({
    login,
    password,
  }: CreateUserDto): Promise<UserEntity | null> {
    const users = await this.userService.findAllByLogin(login);
    const user = users.find((user) => compare(password, user.password));

    return user ?? null;
  }

  async login({ login, id }: UserEntity) {
    const payload = { login, userId: id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
