import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string;

  @Column()
  gender: string;

  @Column()
  createAt: string;

  @Column()
  updateAt: string;

  @ManyToOne(() => User, (user) => user.profileId)
  user: number;
}
