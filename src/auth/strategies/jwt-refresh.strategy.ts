import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request as Req } from 'express';
import { AuthService } from '../auth.service';

type Payload = {
  userId: string;
  login: string;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: true,
      secretOrKey: config.get<string>('JWT_SECRET_REFRESH_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(@Request() req: Req, payload: Payload) {
    const refreshToken = req.body.refreshToken;
    const isValid = await this.authService.validateRefreshToken(
      refreshToken,
      payload.userId,
    );

    if (!isValid) {
      throw new ForbiddenException('Refresh token malformed');
    }

    return payload;
  }
}
