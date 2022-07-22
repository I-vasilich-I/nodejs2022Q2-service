import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Track } from 'src/interfaces';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => ArtistEntity, {
    nullable: true,
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({ nullable: true, default: null })
  albumId: string | null;

  @Exclude()
  @ManyToOne(() => AlbumEntity, {
    nullable: true,
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album: AlbumEntity;

  @Column()
  duration: number;

  @Exclude()
  @ManyToOne(() => FavoritesEntity, (favorites) => favorites.tracks)
  favorites: FavoritesEntity;
}
