import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async findAll() {
    return await this.artistRepository.find();
  }

  async create(artist: CreateArtistDto) {
    const createdArtist = this.artistRepository.create(artist);

    return await this.artistRepository.save(createdArtist);
  }

  async findOne(id: string, fav = false) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      const Exception = fav ? UnprocessableEntityException : NotFoundException;

      throw new Exception(`Artist with id: ${id} doesn't exist`);
    }

    return artist;
  }

  async updateOne(id: string, { name, grammy }: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} doesn't exist`);
    }

    if (name) {
      artist.name = name;
    }

    if (grammy !== undefined) {
      artist.grammy = grammy;
    }

    return await this.artistRepository.save(artist);
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    await this.artistRepository.delete(id);
  }
}
