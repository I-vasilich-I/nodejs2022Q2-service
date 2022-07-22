import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { Album } from 'src/interfaces';

@Entity('album')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

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

  @Exclude()
  @ManyToOne(() => FavoritesEntity, (favorites) => favorites.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  favorites: FavoritesEntity;
}
