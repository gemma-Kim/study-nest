import { NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class Email {
  readonly value: string;

  constructor(value: string) {
    const emailRegex = /^[a-zA-Z0-9._-]{8,20}@[a-zA-Z]+\.[a-zA-Z]+$/g;

    if (!emailRegex.test(value)) {
      throw new NotAcceptableException('INVALID_EMAIL');
    }

    this.value = value;
  }
}

export class Nickname {
  readonly value: string;

  constructor(value: string) {
    if (!value || (value && value.length < 2)) {
      throw new NotAcceptableException('nickname should be longer than 2');
    }

    this.value = value;
  }
}

export class Password {
  readonly value: string;

  constructor(value: string) {
    if (!value || (value && value.length < 9 && value.length > 21)) {
      throw new NotAcceptableException(
        'password should be longer than 8 and shorter than 21',
      );
    }

    this.value = value;
  }
}

export class HashedPassword {
  readonly value: string;

  constructor(value: string) {
    if (!value || (value && value.length > 101)) {
      throw new NotAcceptableException('INVALID_PASSWORD');
    }

    this.value = value;
  }
}

// TODO: User entity 화 시키기
// export class User {
//   readonly id: number;
//   protected readonly email: string;
//   protected readonly nickname: string;
//   protected readonly password: string;

//   constructor(
//     id: number,
//     email: Email,
//     password: Password,
//     nickname: Nickname,
//   ) {
//     if (!id) throw new NotAcceptableException('INVALID_USER_ID');
//     if (!email) throw new NotAcceptableException('INVALID_EMAIL');
//     if (!password) throw new NotAcceptableException('INVALID_PASSWORD');
//     if (!nickname) throw new NotAcceptableException('INVALID_NICKNAME');

//     this.id = id;
//     this.email = email.value;
//     this.password = password.value;
//     this.nickname = nickname.value;
//   }
// }

export class SignupUser {
  email: string;
  password: string;
  nickname: string;

  constructor(email: Email, password: Password, nickname: Nickname) {
    if (!email) throw new NotAcceptableException('INVALID_EMAIL');
    if (!password) throw new NotAcceptableException('INVALID_PASSWORD');
    if (!nickname) throw new NotAcceptableException('INVALID_NICKNAME');

    this.email = email.value;
    this.password = password.value;
    this.nickname = nickname.value;
  }

  async hashPassword(password: Password): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const pwValue = password.value;
    return new HashedPassword(await bcrypt.hash(pwValue, salt)).value;
  }
}

export class LoginUser {
  email: string;
  password: string;

  constructor(email: Email, password: Password) {
    if (!email) throw new NotAcceptableException('INVALID_EMAIL');
    if (!password) throw new NotAcceptableException('INVALID_PASSWORD');

    this.email = email.value;
    this.password = password.value;
  }
}
