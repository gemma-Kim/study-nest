import { NotAcceptableException } from '@nestjs/common';

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
      throw new NotAcceptableException('INVALID_EMAIL');
    }

    this.value = value;
  }
}

export class Password {
  readonly value: string;

  constructor(value: string) {
    if (!value || (value && value.length < 9)) {
      throw new NotAcceptableException('INVALID_EMAIL');
    }

    this.value = value;
  }
}

export class User {
  id: number;
  email: string;
  nickname: string;
  password: string;

  constructor(email: Email, password: Password, nickname: Nickname) {
    if (!email) throw new NotAcceptableException('INVALID_EMAIL');
    if (!password) throw new NotAcceptableException('INVALID_EMAIL');
    if (!nickname) throw new NotAcceptableException('INVALID_EMAIL');

    this.email = email.value;
    this.password = password.value;
    this.nickname = nickname.value;
  }
}
