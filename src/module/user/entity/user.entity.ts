import { NotAcceptableException } from '@nestjs/common';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profile/entity/profile.entity';
import { Email, Nickname, Password } from '../domain/user.domain';

// @Entity('user')
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   email: string;

//   @Column()
//   nickname: string;

//   @Column()
//   password: string;

//   @CreateDateColumn()
//   createAt: string;

//   @UpdateDateColumn()
//   updateAt: string;

//   @OneToMany(() => User, (user) => user.profileId)
//   profileId: Profile[];
// }

@Entity('user')
export class User extends BaseEntity {
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

  // constructor(
  //   //id: number,
  //   email: Password,
  //   password: Password,
  //   nickname: Nickname,
  // ) {
  //   super();
  //   //if (!id) throw new NotAcceptableException('INVALID_USER_ID');
  //   if (!email) throw new NotAcceptableException('INVALID_EMAIL');
  //   if (!password) throw new NotAcceptableException('INVALID_PASSWORD');
  //   if (!nickname) throw new NotAcceptableException('INVALID_NICKNAME');

  //   //this.id = id;
  //   this.email = email.value;
  //   this.password = password.value;
  //   this.nickname = nickname.value;
  // }
}
