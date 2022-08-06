import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => ArtistsService))
    private artistService: ArtistsService,
  ) {}

  async findAll() {
    return await this.albumRepository.find();
  }

  async create({ name, year, artistId }: CreateAlbumDto) {
    const artist = artistId ? await this.artistService.findOne(artistId) : null;
    const createdAlbum = this.albumRepository.create({ name, year, artist });

    return await this.albumRepository.save(createdAlbum);
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

    if (artistId !== undefined) {
      album.artist = artistId
        ? await this.artistService.findOne(artistId)
        : null;
    }

    return await this.albumRepository.save(album);
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    await this.albumRepository.delete(id);
  }
}
