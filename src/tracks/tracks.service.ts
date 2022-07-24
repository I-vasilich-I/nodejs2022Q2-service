import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: DatabaseService) {}

  async findAll() {
    return this.db.tracks.findAll();
  }

  async create(track: CreateTrackDto) {
    const newTrack = { id: uuid(), ...track };
    this.db.tracks.addOne(newTrack);
    return newTrack;
  }

  async findOne(id: string, fav = false) {
    const track = this.db.tracks.findOne(id);

    if (!track) {
      const Exception = fav ? UnprocessableEntityException : NotFoundException;

      throw new Exception(`Track with id: ${id} doesn't exist`);
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
    this.db.favorites.deleteTrack(id);
  }
}
