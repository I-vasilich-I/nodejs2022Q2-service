import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist } from 'src/interfaces';
import { FavoritesEntity } from '../../favorites/entities/favorites.entity';

@Entity('artist')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean')
  grammy: boolean;

  @Exclude()
  @ManyToOne(() => FavoritesEntity, (favorites) => favorites.artists, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  favorites: FavoritesEntity;
}
