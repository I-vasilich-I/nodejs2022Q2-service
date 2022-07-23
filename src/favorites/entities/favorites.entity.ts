import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { Exclude } from 'class-transformer';

@Entity('favorites')
export class FavoritesEntity {
  @Exclude()
  @PrimaryColumn({ default: 1 })
  id: number;

  @OneToMany(() => AlbumEntity, (album) => album.favorites, {
    nullable: true,
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.favorites, {
    nullable: true,
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  tracks: TrackEntity[];

  @OneToMany(() => ArtistEntity, (artist) => artist.favorites, {
    nullable: true,
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  artists: ArtistEntity[];
}
