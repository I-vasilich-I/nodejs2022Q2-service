import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
