import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, TracksService, ArtistsService, AlbumsService],
  exports: [TypeOrmModule],
})
export class FavoritesModule {}
