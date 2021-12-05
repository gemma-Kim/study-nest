import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string | null;

  @Column()
  gender: 'WOMAN' | 'MAN' | null;

  @Column()
  createAt: string;

  @Column()
  updateAt: string;

  @ManyToOne(() => User, (user) => user.profileId)
  userId: number;
}
