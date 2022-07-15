import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Database } from 'src/database/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: Database) {}

  async findAll() {
    return this.db.tracks.findAll();
  }

  async create(track: CreateTrackDto) {
    const newTrack = { id: uuid(), ...track };
    this.db.tracks.addOne(newTrack);
    return newTrack;
  }

  async findOne(id: string) {
    const track = this.db.tracks.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with id: ${id} doesn't exist`);
    }

    return track;
  }

  async updateOne(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ) {
    const track = await this.findOne(id);

    if (name) {
      track.name = name;
    }

    if (duration !== undefined) {
      track.duration = duration;
    }

    if (artistId !== undefined) {
      track.artistId = artistId;
    }

    if (albumId !== undefined) {
      track.albumId = albumId;
    }

    return track;
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    this.db.tracks.deleteOne(id);
  }
}
