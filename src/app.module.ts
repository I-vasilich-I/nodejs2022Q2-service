import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule, TracksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
