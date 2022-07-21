import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async findAll() {
    return await this.trackRepository.find();
  }

  async removeAlbumIdFromTracks(albumId: string) {
    const tracks = await this.trackRepository.find({ where: { albumId } });

    const mappedTracks = tracks.map((track) => {
      track.albumId = null;
      return track;
    });

    await this.trackRepository.save(mappedTracks);
  }

  async removeArtistIdFromTracks(artistId: string) {
    const tracks = await this.trackRepository.find({ where: { artistId } });

    const mappedTracks = tracks.map((track) => {
      track.artistId = null;
      return track;
    });

    await this.trackRepository.save(mappedTracks);
  }

  async create(track: CreateTrackDto) {
    const createdTrack = this.trackRepository.create(track);
    const savedTrack = await this.trackRepository.save(createdTrack);
    return savedTrack;
  }

  async findOne(id: string, fav = false) {
    const track = await this.trackRepository.findOneBy({ id });

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

    const updatedTrack = await this.trackRepository.save(track);

    return updatedTrack;
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    await this.trackRepository.delete(id);
    // this.db.favorites.deleteTrack(id);
  }
}
