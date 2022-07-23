import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AlbumEntity } from './albums/entities/album.entity';
import { ArtistEntity } from './artists/entities/artist.entity';
import { FavoritesEntity } from './favorites/entities/favorites.entity';
import { TrackEntity } from './tracks/entities/track.entity';
import { UserEntity } from './users/entities/user.entity';
import 'dotenv/config';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: +(process.env.POSTGRES_PORT as string) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: [
    UserEntity,
    ArtistEntity,
    AlbumEntity,
    TrackEntity,
    FavoritesEntity,
  ],
  synchronize: true,
};
