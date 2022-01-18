import { Profile } from 'src/module/profile/domain/entity/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserOrmEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @CreateDateColumn()
  readonly createAt: string;

  @UpdateDateColumn()
  readonly updateAt: string;

  @OneToMany(() => UserOrmEntity, (user) => user.profileId)
  readonly profileId: Profile[];

  constructor() {
    super();
  }
}
