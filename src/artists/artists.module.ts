import { Module } from '@nestjs/common';
import { Database } from 'src/database/database';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistsService, Database],
})
export class ArtistsModule {}
