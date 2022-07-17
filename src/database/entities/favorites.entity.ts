import { Favorites } from 'src/interfaces';

export class FavoritesEntity {
  private favorites: Favorites = {
    tracks: [],
    albums: [],
    artists: [],
  };

  getAll() {
    return this.favorites;
  }

  private findOne<T extends keyof Favorites>(type: T, item: string) {
    return this.favorites[type].find((el) => el === item);
  }

  private addOne<T extends keyof Favorites>(type: T, item: string) {
    this.favorites[type].push(item);
  }

  private deleteOne<T extends keyof Favorites>(type: T, item: string) {
    const items = this.favorites[type];
    this.favorites[type] = items.filter((el) => el !== item);
  }

  addTrack(trackId: string) {
    this.addOne('tracks', trackId);
  }

  addAlbum(albumId: string) {
    this.addOne('albums', albumId);
  }

  addArtist(artistId: string) {
    this.addOne('artists', artistId);
  }

  findTrack(trackId: string) {
    return this.findOne('tracks', trackId);
  }

  findAlbum(albumId: string) {
    return this.findOne('albums', albumId);
  }

  findArtist(artistId: string) {
    return this.findOne('artists', artistId);
  }

  deleteTrack(trackId: string) {
    this.deleteOne('tracks', trackId);
  }

  deleteAlbum(albumId: string) {
    this.deleteOne('albums', albumId);
  }

  deleteArtist(artistId: string) {
    this.deleteOne('artists', artistId);
  }
}
