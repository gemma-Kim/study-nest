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

import {
  Email,
  HashedPassword,
  LoginUser,
  Nickname,
  Password,
  SignupUser,
} from '../user.domain';

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
  readonly id: number;

  @Column()
  readonly email: string;

  @Column()
  readonly nickname: string;

  @Column()
  readonly password: string;

  @CreateDateColumn()
  readonly createAt: string;

  @UpdateDateColumn()
  readonly updateAt: string;

  @OneToMany(() => User, (user) => user.profileId)
  readonly profileId: Profile[];

  constructor() {
    super();
  }

  async setSignUpUser(
    theEmail: string,
    thePassword: string,
    theNickname: string,
  ): Promise<SignupUser> {
    const password = new Password(thePassword);
    await password.hashPassword();

    return new SignupUser(
      new Email(theEmail).value,
      password.value,
      new Nickname(theNickname).value,
    );
  }

  setLoginUser(theEmail: string, thePassword: string) {
    return new LoginUser(theEmail, thePassword);
  }
}
