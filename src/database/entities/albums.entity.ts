import { Album } from 'src/interfaces';

export class AlbumsEntity {
  private albums: Album[] = [];

  findAll() {
    return this.albums;
  }

  addOne(album: Album) {
    this.albums.push(album);
  }

  findOne(id: string) {
    return this.albums.find(({ id: artistId }) => id === artistId);
  }

  deleteOne(id: string) {
    this.albums = this.albums.filter(({ id: artistId }) => id !== artistId);
  }
}
