import { BadRequestException } from '@nestjs/common';
import { Email, HashedPassword, Nickname, Password } from '../user.domain';

export class UserUpadateCommand {
  readonly id: number;
  readonly email: string;
  readonly nickname: string;
  readonly password: string;

  constructor(userData: {
    id: number;
    email?: string;
    password?: string;
    nickname?: string;
  }) {
    if (!userData.id) throw new BadRequestException('DOES_NOT_EXIST_USER_ID');
    if (!userData.email && !userData.password && !userData.nickname)
      throw new BadRequestException('DOES_NOT_EXIST_USER_UPDATE_DATA');

    this.id = userData.id;

    if (userData.email) {
      this.email = new Email(userData.email).value;
    }

    if (userData.nickname) {
      this.nickname = new Nickname(userData.nickname).value;
    }

    if (userData.password) {
      this.password = new HashedPassword(userData.password).value;
    }
  }
}
