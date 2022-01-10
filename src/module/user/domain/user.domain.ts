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

export class SignupUser {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly nickname: string,
  ) {}
}

export class LoginUser {
  constructor(readonly email: string, readonly password: string) {}
}
