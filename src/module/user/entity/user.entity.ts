import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profile/entity/profile.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createAt: string;

  @UpdateDateColumn()
  updateAt: string;

  @OneToMany(() => User, (user) => user.profileId)
  profileId: Profile[];
}
