import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Database } from 'src/database/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private db: Database) {}

  async findAll() {
    return this.db.artists.findAll();
  }

  async create(artist: CreateArtistDto) {
    const newArtist = { id: uuid(), ...artist };
    this.db.artists.addOne(newArtist);
    return newArtist;
  }

  async findOne(id: string) {
    const artist = this.db.artists.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} doesn't exist`);
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
    const artist = this.db.artists.findOne(id);

    if (!artist) {
      throw new NotFoundException(`User with id: ${id} doesn't exist`);
    }

    this.db.artists.deleteOne(id);
  }
}
