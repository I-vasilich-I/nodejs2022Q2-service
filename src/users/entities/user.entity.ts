import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { User } from 'src/interfaces';

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  @CreateDateColumn()
  createdAt: number;

  @Transform(({ value }) => new Date(value).getTime())
  @UpdateDateColumn()
  updatedAt: number;
}
