import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavoritesService } from 'src/favorites/favorites.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [TracksController],
  providers: [TracksService, ArtistsService, AlbumsService, FavoritesService],
  exports: [TypeOrmModule],
})
export class TracksModule {}
