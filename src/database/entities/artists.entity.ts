import { Artist } from 'src/interfaces';

export class ArtistsEntity {
  private artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  addOne(artist: Artist) {
    this.artists.push(artist);
  }

  findOne(id: string) {
    return this.artists.find(({ id: artistId }) => id === artistId);
  }

  deleteOne(id: string) {
    this.artists = this.artists.filter(({ id: artistId }) => id !== artistId);
  }
}
