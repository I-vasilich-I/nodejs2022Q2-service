import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from 'src/interfaces';

@Entity('artist')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean')
  grammy: boolean;
}
