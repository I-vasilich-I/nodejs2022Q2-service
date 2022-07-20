import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from 'src/interfaces';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: null })
  artistId: string | null;

  @Column({ default: null })
  albumId: string | null;

  @Column()
  duration: number;
}
