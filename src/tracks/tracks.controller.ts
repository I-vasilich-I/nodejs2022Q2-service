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
import { Track } from 'src/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return await this.tracksService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createTrack: CreateTrackDto): Promise<Track> {
    return await this.tracksService.create(createTrack);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return await this.tracksService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrack: UpdateTrackDto,
  ) {
    return await this.tracksService.updateOne(id, updateTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.tracksService.deleteOne(id);
  }
}
