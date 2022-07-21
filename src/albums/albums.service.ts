import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    private trackService: TracksService,
  ) {}

  async findAll() {
    return await this.albumRepository.find();
  }

  async create(album: CreateAlbumDto) {
    const createdAlbum = this.albumRepository.create(album);
    const savedAlbum = await this.albumRepository.save(createdAlbum);
    return savedAlbum;
  }

  async findOne(id: string, fav = false) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      const Exception = fav ? UnprocessableEntityException : NotFoundException;

      throw new Exception(`Album with id: ${id} doesn't exist`);
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

    const updatedAlbum = await this.albumRepository.save(album);

    return updatedAlbum;
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    await this.albumRepository.delete(id);
    await this.trackService.removeAlbumIdFromTracks(id);

    // this.db.favorites.deleteAlbum(id);
  }
}
