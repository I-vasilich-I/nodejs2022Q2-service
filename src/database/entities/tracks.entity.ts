import { Track } from 'src/interfaces';

export class TracksEntity {
  private tracks: Track[] = [];

  findAll() {
    return this.tracks;
  }

  addOne(track: Track) {
    this.tracks.push(track);
  }

  findOne(id: string) {
    return this.tracks.find(({ id: trackId }) => id === trackId);
  }

  deleteOne(id: string) {
    this.tracks = this.tracks.filter(({ id: trackId }) => id !== trackId);
  }
}
