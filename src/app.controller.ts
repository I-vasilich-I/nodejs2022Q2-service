import { Controller, Get } from '@nestjs/common';
import { Public } from './custom.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('doc')
  async swagger() {
    return;
  }

  @Public()
  @Get()
  async home() {
    return 'Rest service is up';
  }
}
