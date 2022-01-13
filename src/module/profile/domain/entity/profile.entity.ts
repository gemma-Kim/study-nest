import { User } from 'src/module/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profile')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string | null;

  @Column()
  gender: 'WOMAN' | 'MAN' | null;

  @CreateDateColumn()
  createAt: string;

  @UpdateDateColumn()
  updateAt: string;

  @Column()
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  @ManyToOne(() => User, (user) => user.profileId)
  userId: number;
}
