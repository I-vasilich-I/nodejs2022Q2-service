import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesEntity } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}

  async getFavorites() {
    const favorites = await this.favoritesRepository.findOneBy({ id: 1 });

    if (favorites) {
      return favorites;
    }

    const createdFavorites = this.favoritesRepository.create({
      tracks: [],
      albums: [],
      artists: [],
    });
    const savedFavorites = await this.favoritesRepository.save(
      createdFavorites,
    );

    return savedFavorites;
  }

  async getAll() {
    return await this.getFavorites();
  }

  async addTrack(trackId: string) {
    const track = await this.tracksService.findOne(trackId, true);
    const favorites = await this.getFavorites();

    favorites.tracks.push(track);

    await this.favoritesRepository.save(favorites);
  }

  async deleteTrack(trackId: string) {
    const track = await this.tracksService.findOne(trackId);
    const favTrack = await this.favoritesRepository.findBy({
      tracks: ArrayContains([track]),
    });

    if (!favTrack) {
      throw new NotFoundException(
        `Track with id: ${trackId} is not in favorites`,
      );
    }

    await this.deleteTrackFromFavorites(trackId);
  }

  async addAlbum(albumId: string) {
    const album = await this.albumsService.findOne(albumId, true);
    const favorites = await this.getFavorites();

    favorites.albums.push(album);

    await this.favoritesRepository.save(favorites);
  }

  async deleteAlbum(albumId: string) {
    const album = await this.albumsService.findOne(albumId);
    const favAlbum = await this.favoritesRepository.findBy({
      albums: ArrayContains([album]),
    });

    if (!favAlbum) {
      throw new NotFoundException(
        `Album with id: ${albumId} is not in favorites`,
      );
    }

    await this.deleteAlbumFromFavorites(albumId);
  }

  async addArtist(artistId: string) {
    const artist = await this.artistsService.findOne(artistId, true);
    const favorites = await this.getFavorites();
    favorites.artists.push(artist);

    await this.favoritesRepository.save(favorites);
  }

  async deleteArtist(artistId: string) {
    const artist = await this.artistsService.findOne(artistId);
    const favArtist = await this.favoritesRepository.findBy({
      artists: ArrayContains([artist]),
    });

    if (!favArtist) {
      throw new NotFoundException(
        `Artist with id: ${artistId} is not in favorites`,
      );
    }

    await this.deleteArtistFromFavorites(artistId);
  }

  async deleteAlbumFromFavorites(albumId: string) {
    const favorites = await this.getFavorites();
    favorites.albums = favorites.albums.filter((album) => album.id !== albumId);

    await this.favoritesRepository.save(favorites);
  }

  async deleteArtistFromFavorites(artistId: string) {
    const favorites = await this.getFavorites();
    favorites.artists = favorites.artists.filter(
      (artist) => artist.id !== artistId,
    );

    await this.favoritesRepository.save(favorites);
  }

  async deleteTrackFromFavorites(trackId: string) {
    const favorites = await this.getFavorites();
    favorites.tracks = favorites.tracks.filter((track) => track.id !== trackId);

    await this.favoritesRepository.save(favorites);
  }
}
