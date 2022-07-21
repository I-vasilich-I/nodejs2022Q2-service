import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoritesResponse } from 'src/interfaces';
import { TracksService } from 'src/tracks/tracks.service';
import { ArrayContains, Repository } from 'typeorm';
import { FavoritesEntity } from './entities/favorites.entity';

type TService = TracksService | ArtistsService | AlbumsService;

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

  async prepareData<T extends TService>(array: string[], service: T) {
    return array && array.length
      ? await Promise.all(array.map(async (el) => await service.findOne(el)))
      : [];
  }

  async getAll() {
    const { tracks, artists, albums } = await this.getFavorites();

    const tracksArr = await this.prepareData<TracksService>(
      tracks,
      this.tracksService,
    );
    const artistsArr = await this.prepareData<ArtistsService>(
      artists,
      this.artistsService,
    );
    const albumsArr = await this.prepareData<AlbumsService>(
      albums,
      this.albumsService,
    );

    return {
      tracks: tracksArr,
      albums: albumsArr,
      artists: artistsArr,
    } as FavoritesResponse;
  }

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

  async getSavedFavorites(favorites: FavoritesEntity) {
    const savedFavorites = await this.favoritesRepository.save(favorites);

    return savedFavorites.toResponse();
  }

  async addTrack(trackId: string) {
    await this.tracksService.findOne(trackId, true);
    const favorites = await this.getFavorites();
    favorites.tracks.push(trackId);

    return await this.getSavedFavorites(favorites);
  }

  async deleteTrack(trackId: string) {
    const favTrack = await this.favoritesRepository.findBy({
      tracks: ArrayContains([trackId]),
    });

    if (!favTrack) {
      throw new NotFoundException(
        `Track with id: ${trackId} is not in favorites`,
      );
    }

    await this.deleteTrackFromDb(trackId);
  }

  async addAlbum(albumId: string) {
    await this.albumsService.findOne(albumId, true);
    const favorites = await this.getFavorites();
    favorites.albums.push(albumId);

    return await this.getSavedFavorites(favorites);
  }

  async deleteAlbum(albumId: string) {
    const favAlbum = await this.favoritesRepository.findBy({
      albums: ArrayContains([albumId]),
    });

    if (!favAlbum) {
      throw new NotFoundException(
        `Album with id: ${albumId} is not in favorites`,
      );
    }

    await this.deleteAlbumFromDb(albumId);
  }

  async addArtist(artistId: string) {
    await this.artistsService.findOne(artistId, true);
    const favorites = await this.getFavorites();
    favorites.artists.push(artistId);

    return await this.getSavedFavorites(favorites);
  }

  async deleteArtist(artistId: string) {
    const favArtist = await this.favoritesRepository.findBy({
      artists: ArrayContains([artistId]),
    });

    if (!favArtist) {
      throw new NotFoundException(
        `Artist with id: ${artistId} is not in favorites`,
      );
    }

    await this.deleteArtistFromDb(artistId);
  }

  async deleteAlbumFromDb(albumId: string) {
    const favorites = await this.getFavorites();
    favorites.albums = favorites.albums.filter((id) => id !== albumId);

    await this.getSavedFavorites(favorites);
  }

  async deleteArtistFromDb(artistId: string) {
    const favorites = await this.getFavorites();
    favorites.artists = favorites.artists.filter((id) => id !== artistId);

    await this.getSavedFavorites(favorites);
  }

  async deleteTrackFromDb(trackId: string) {
    const favorites = await this.getFavorites();
    favorites.tracks = favorites.tracks.filter((id) => id !== trackId);

    await this.getSavedFavorites(favorites);
  }
}
