import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Database } from 'src/database/database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private db: Database) {}

  async findAll() {
    return this.db.albums.findAll();
  }

  async create(album: CreateAlbumDto) {
    const newAlbum = { id: uuid(), ...album };

    if (!album.artistId) {
      newAlbum.artistId = null;
    }

    this.db.albums.addOne(newAlbum);
    return newAlbum;
  }

  async findOne(id: string) {
    const album = this.db.albums.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with id: ${id} doesn't exist`);
    }

    return album;
  }

  async updateOne(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (name) {
      album.name = name;
    }

    if (year) {
      album.year = year;
    }

    if (artistId) {
      album.artistId = artistId;
    }

    return album;
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    this.db.albums.deleteOne(id);
  }
}
