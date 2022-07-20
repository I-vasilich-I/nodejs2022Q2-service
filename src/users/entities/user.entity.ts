import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { User } from 'src/interfaces';

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt: +createdAt, updatedAt: +updatedAt };
  }
}
