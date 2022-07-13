import { Injectable } from '@nestjs/common';
import { ArtistsEntity } from './entities/artists.entity';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class Database {
  users = new UsersEntity();
  artists = new ArtistsEntity();
}
