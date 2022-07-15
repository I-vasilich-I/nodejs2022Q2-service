import { Injectable } from '@nestjs/common';
import { AlbumsEntity } from './entities/albums.entity';
import { ArtistsEntity } from './entities/artists.entity';
import { TracksEntity } from './entities/tracks.entity';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class Database {
  users = new UsersEntity();
  artists = new ArtistsEntity();
  albums = new AlbumsEntity();
  tracks = new TracksEntity();
}
