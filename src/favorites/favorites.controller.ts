import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FavoritesResponse } from 'src/interfaces';
import { FavoritesService } from './favorites.service';

const SUCCESS_MESSAGE = 'Added successfully';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.favoritesService.addTrack(id);
    return SUCCESS_MESSAGE;
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favoritesService.addArtist(id);
    return SUCCESS_MESSAGE;
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.favoritesService.addAlbum(id);
    return SUCCESS_MESSAGE;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favoritesService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favoritesService.deleteArtist(id);
  }
}
