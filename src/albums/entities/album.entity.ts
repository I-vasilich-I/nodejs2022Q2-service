import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from 'src/interfaces';

@Entity('album')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ default: null })
  artistId: string | null;
}
