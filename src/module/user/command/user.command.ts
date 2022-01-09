import { BadRequestException } from '@nestjs/common';
import { Email, Nickname, Password } from '../domain/user.domain';
import { UpdateUserInfoRequestDto } from '../dto/user.request.dto';

export class UserUpadateCommand {
  readonly id: number;
  readonly email: string;
  readonly nickname: string;
  readonly password: string;

  constructor(data) {
    if (!data.id) throw new BadRequestException('DOES_NOT_EXIST_USER_ID');
    if (!data.email && !data.nickname && !data.password) {
      throw new BadRequestException('DOES_NOT_EXIST_UPDATE_DATA');
    }

    this.id = data.id;
    if (data.email) this.email = new Email(data.email).value;
    if (data.nickname) this.nickname = new Nickname(data.nickname).value;
    if (data.password) this.password = new Password(data.password).value;
  }
}
