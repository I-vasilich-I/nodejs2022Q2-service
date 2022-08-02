import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/custom.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Post('signup')
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    await this.authService.create(createUserDto);
    return 'Successful signup';
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
