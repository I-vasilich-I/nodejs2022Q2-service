import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { DatabaseService } from 'src/database/database.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private db: DatabaseService,
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
  ) {}

  async getAll() {
    const { tracks, artists, albums } = this.db.favorites.getAll();

    const tracksArr =
      tracks && tracks.length
        ? await Promise.all(
            tracks.map(async (el) => await this.tracksService.findOne(el)),
          )
        : [];

    const artistsArr =
      artists && artists.length
        ? await Promise.all(
            artists.map(async (el) => await this.artistsService.findOne(el)),
          )
        : [];

    const albumsArr =
      albums && albums.length
        ? await Promise.all(
            albums.map(async (el) => await this.albumsService.findOne(el)),
          )
        : [];

    return { tracks: tracksArr, albums: albumsArr, artists: artistsArr };
  }

  async addTrack(trackId: string) {
    await this.tracksService.findOne(trackId, true);
    this.db.favorites.addTrack(trackId);
  }

  async deleteTrack(trackId: string) {
    const favTrack = this.db.favorites.findTrack(trackId);

    if (!favTrack) {
      throw new NotFoundException(
        `Track with id: ${trackId} is not in favorites`,
      );
    }

    this.db.favorites.deleteTrack(trackId);
  }

  async addAlbum(albumId: string) {
    await this.albumsService.findOne(albumId, true);
    this.db.favorites.addAlbum(albumId);
  }

  async deleteAlbum(albumId: string) {
    const favAlbum = this.db.favorites.findAlbum(albumId);

    if (!favAlbum) {
      throw new NotFoundException(
        `Album with id: ${albumId} is not in favorites`,
      );
    }

    this.db.favorites.deleteAlbum(albumId);
  }

  async addArtist(artistId: string) {
    await this.artistsService.findOne(artistId, true);
    this.db.favorites.addArtist(artistId);
  }

  async deleteArtist(artistId: string) {
    const favArtist = this.db.favorites.findArtist(artistId);

    if (!favArtist) {
      throw new NotFoundException(
        `Artist with id: ${artistId} is not in favorites`,
      );
    }

    this.db.favorites.deleteArtist(artistId);
  }
}
