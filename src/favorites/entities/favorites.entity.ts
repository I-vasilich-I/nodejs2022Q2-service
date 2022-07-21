import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Favorites } from 'src/interfaces';

@Entity('favorites')
export class FavoritesEntity implements Favorites {
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column('uuid', { array: true })
  artists: string[];

  @Column('uuid', { array: true })
  albums: string[];

  @Column('uuid', { array: true })
  tracks: string[];

  toResponse() {
    const { artists, albums, tracks } = this;
    return { artists, albums, tracks };
  }
}
