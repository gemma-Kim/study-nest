import { NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';

export class Email {
  constructor(readonly value: string) {
    const emailRegex = /^[a-zA-Z0-9._-]{8,20}@[a-zA-Z]+\.[a-zA-Z]+$/g;

    if (!emailRegex.test(value)) {
      throw new NotAcceptableException('INVALID_EMAIL');
    }
  }
}

export class Nickname {
  constructor(readonly value: string) {
    if (!value || (value && value.length < 2)) {
      throw new NotAcceptableException('nickname should be longer than 2');
    }
  }
}

export class Password {
  value: string;
  constructor(value: string) {
    if (!value || (value && value.length < 9 && value.length > 21)) {
      throw new NotAcceptableException(
        'password should be longer than 8 and shorter than 21',
      );
    }
  }

  async hashPassword() {
    const saltRounds: number = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    this.value = await bcrypt.hash(this.value, salt);
  }
}

export class HashedPassword {
  constructor(readonly value: string) {
    if (!value || (value && value.length > 101)) {
      throw new NotAcceptableException('INVALID_PASSWORD');
    }
  }
}

export class SignupUser extends User {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly nickname: string,
  ) {
    super();
  }
}

export class LoginUser extends User {
  constructor(readonly email: string, readonly password: string) {
    super();
  }
}
