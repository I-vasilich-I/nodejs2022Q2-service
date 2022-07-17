import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private db: DatabaseService) {}

  async findAll() {
    return this.db.artists.findAll();
  }

  async create(artist: CreateArtistDto) {
    const newArtist = { id: uuid(), ...artist };
    this.db.artists.addOne(newArtist);
    return newArtist;
  }

  async findOne(id: string, fav = false) {
    const artist = this.db.artists.findOne(id);

    if (!artist) {
      const Exception = fav ? UnprocessableEntityException : NotFoundException;

      throw new Exception(`Artist with id: ${id} doesn't exist`);
    }

    return artist;
  }

  async updateOne(id: string, { name, grammy }: UpdateArtistDto) {
    const artist = this.db.artists.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} doesn't exist`);
    }

    if (name) {
      artist.name = name;
    }

    if (grammy !== undefined) {
      artist.grammy = grammy;
    }

    return artist;
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    this.db.artists.deleteOne(id);
    const tracks = this.db.tracks.findAllByArtistId(id);

    if (tracks) {
      tracks.map((track) => {
        track.artistId = null;
        return track;
      });
    }

    this.db.favorites.deleteArtist(id);
  }
}
