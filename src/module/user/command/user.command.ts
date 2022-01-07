import { Email, Nickname, Password } from '../domain/user.domain';

export class UserUpadateCommand {
  id: number;
  _email: string;
  _nickname: string;
  _password: string;
  constructor(id: number) {
    this.id = id;
  }

  set email(theEmail) {
    this.email = new Email(theEmail).value;
  }

  set nickname(theNickname: string) {
    this._nickname = new Nickname(theNickname).value;
  }

  set password(thePassword: string) {
    this.password = new Password(thePassword).value;
  }
}
