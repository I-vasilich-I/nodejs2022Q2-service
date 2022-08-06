import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => ArtistsService))
    private artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumService: AlbumsService,
  ) {}

  async findAll() {
    return await this.trackRepository.find();
  }

  async create({ artistId, albumId, ...rest }: CreateTrackDto) {
    const artist = artistId ? await this.artistService.findOne(artistId) : null;
    const album = albumId ? await this.albumService.findOne(albumId) : null;

    const createdTrack = this.trackRepository.create({
      artist,
      album,
      ...rest,
    });

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
      track.artist = artistId
        ? await this.artistService.findOne(artistId)
        : null;
    }

    if (albumId !== undefined) {
      track.album = albumId ? await this.albumService.findOne(albumId) : null;
    }

    const updatedTrack = await this.trackRepository.save(track);

    return updatedTrack;
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    await this.trackRepository.delete(id);
  }
}
