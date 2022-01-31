import { UserOrmEntity } from 'src/module/user/repository/user.orm.entity';
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
export class ProfileOrmEntity extends BaseEntity {
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
  @ManyToOne(() => UserOrmEntity, (user) => user.profileId)
  userId: number;
}
