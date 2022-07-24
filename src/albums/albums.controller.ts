import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from 'src/interfaces';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return await this.albumsService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbum: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.create(createAlbum);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    return await this.albumsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumsService.updateOne(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.albumsService.deleteOne(id);
  }
}
