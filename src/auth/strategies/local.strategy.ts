import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<UserEntity> {
    const isProperTypes =
      typeof login === 'string' && typeof password === 'string';
    const isEmpty = !login || !password;

    if (!isProperTypes || isEmpty) {
      throw new BadRequestException('Bad request');
    }

    const user = await this.authService.validateUser({
      login,
      password,
    });

    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return user;
  }
}
