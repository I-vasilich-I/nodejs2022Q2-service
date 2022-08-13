import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenEntity } from './entities/token.entity';

const HASH_ROUNDS = 3;

type Payload = {
  userId: string;
  login: string;
  exp?: number;
};

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
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
    const user = users.find((user) => compareSync(password, user.password));

    return user ?? null;
  }

  async validateRefreshToken(refreshToken: string, userId: string) {
    const rt = await this.tokenRepository.findOneBy({ userId });
    if (!rt.refreshToken) {
      return false;
    }

    const { exp } = this.jwtService.decode(refreshToken) as Payload;
    const now = Math.round(Date.now() / 1000);

    if (now > exp) {
      return false;
    }

    return compareSync(refreshToken, rt.refreshToken);
  }

  async login(user: UserEntity) {
    const { login, id } = user;
    const { accessToken, refreshToken } = await this.getTokens(login, id);

    await this.saveRefreshToken(id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    const data = this.jwtService.decode(refreshToken) as Payload | null;
    if (!data) {
      throw new ForbiddenException('Refresh token malformed');
    }

    const { login, userId } = data;
    const tokens = await this.getTokens(login, userId);
    await this.saveRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async getTokens(login: string, id: string) {
    const payload = { login, userId: id };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.config.get<string>('TOKEN_EXPIRE_TIME'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.config.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const findToken = await this.tokenRepository.findOneBy({ userId });
    const hashedRefreshToken = await hash(refreshToken, HASH_ROUNDS);

    if (findToken) {
      findToken.refreshToken = hashedRefreshToken;
      await this.tokenRepository.save(findToken);
      return;
    }

    const createToken = this.tokenRepository.create({
      refreshToken: hashedRefreshToken,
      userId,
    });

    await this.tokenRepository.save(createToken);
    return;
  }
}
