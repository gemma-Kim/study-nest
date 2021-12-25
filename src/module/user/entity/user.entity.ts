import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profile/entity/profile.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createAt: string;

  @Column()
  updateAt: string;

  @OneToMany(() => User, (user) => user.profileId)
  profileId: Profile[];
}
