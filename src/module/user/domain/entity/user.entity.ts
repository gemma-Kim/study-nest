import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { Email, Nickname, Password } from '../value-object/user.value-object';

export class User {
  protected id: number;
  protected email: string;
  protected nickname: string;
  protected password: string;

  constructor() {
    // if (!this.id || !this.email || !this.nickname || !this.password) {
    //   throw new BadRequestException();
    // }
  }

  set _id(id: number) {
    this.id = id;
  }

  get _id() {
    return this.id;
  }

  set _email(email: string) {
    this.email = new Email(email).value;
  }

  // get _email() {
  //   return this.email;
  // }

  set _nickname(nickname: string) {
    this.nickname = new Nickname(nickname).value;
  }

  // get _nickname() {
  //   return this.nickname;
  // }

  set _password(password: string) {
    this.password = new Password(password).value;
  }

  // get _password() {
  //   return this.password;
  // }

  async checkPassword(validPassword: string) {
    const passwordIsSame = await bcrypt.compare(this.password, validPassword);
    if (!passwordIsSame) {
      throw new BadRequestException('WRONG_PASSWORD');
    }
  }
}
