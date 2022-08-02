import { Controller } from '@nestjs/common';
import { Public } from './custom.decorator';

@Public()
@Controller('doc')
export class AppController {}
