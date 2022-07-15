import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Database } from 'src/database/database';

@Module({
  controllers: [TracksController],
  providers: [TracksService, Database],
})
export class TracksModule {}
