import { Module } from '@nestjs/common';
import { Database } from 'src/database/database';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [AlbumsService, Database],
})
export class AlbumsModule {}
